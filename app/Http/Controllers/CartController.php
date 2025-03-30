<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;

class CartController extends Controller
{
    /**
     * Get the current user's cart or create one.
     */
    private function getCart()
    {
        try {
            $sessionId = session('cart_id');

            if (Auth::check()) {
                // Logged in user - get or create their cart
                $userId = Auth::id();
                $cart = Cart::where('user_id', $userId)->first();

                if (!$cart) {
                    // Create a new cart
                    $cart = new Cart();
                    $cart->user_id = $userId;
                    $cart->session_id = Str::uuid();
                    $cart->total = 0;
                    $cart->save();
                }

                // If they had a session cart, merge it
                if ($sessionId) {
                    $sessionCart = Cart::where('session_id', $sessionId)->first();
                    if ($sessionCart) {
                        foreach ($sessionCart->items as $item) {
                            // Check if product already exists in user cart
                            $existingItem = $cart->items()->where('product_id', $item->product_id)->first();

                            if ($existingItem) {
                                // Update quantity if product already in cart
                                $existingItem->quantity += $item->quantity;
                                $existingItem->save();
                            } else {
                                // Move item to user cart
                                $item->cart_id = $cart->id;
                                $item->save();
                            }
                        }

                        // Delete the session cart
                        $sessionCart->delete();
                        session()->forget('cart_id');
                    }
                }
            } else {
                // Guest user - use session ID to track cart
                if (!$sessionId) {
                    $sessionId = Str::uuid();
                    session(['cart_id' => $sessionId]);
                }

                // Get or create cart with session ID
                $cart = Cart::where('session_id', $sessionId)->first();

                if (!$cart) {
                    $cart = new Cart();
                    $cart->session_id = $sessionId;
                    $cart->total = 0;
                    $cart->save();
                }
            }

            // Загружаем корзину с элементами и товарами, включая активные промоакции
            return $cart->load(['items.product.promotions' => function($query) {
                $query->where('is_active', true)
                    ->where('start_date', '<=', now())
                    ->where('end_date', '>=', now());
            }]);
        } catch (\Exception $e) {
            Log::error("Ошибка при получении корзины: " . $e->getMessage());
            
            // Создаем временную корзину в случае ошибки
            $tempCart = new Cart();
            $tempCart->session_id = Str::uuid();
            $tempCart->total = 0;
            $tempCart->save();
            
            return $tempCart;
        }
    }

    /**
     * Calculate total for cart and update product prices.
     */
    private function calculateTotal(Cart $cart)
    {
        try {
            $total = 0;

            foreach ($cart->items as $item) {
                $product = $item->product;

                if (!$product) {
                    continue;
                }

                // Определяем лучшую цену
                $price = $product->price;
                $originalPrice = $price;
                $discountPercentage = 0;
                $promotionName = '';
                
                // Проверяем наличие акционной цены в pivot таблице
                if ($product->promotions && $product->promotions->isNotEmpty()) {
                    foreach ($product->promotions as $promotion) {
                        if (isset($promotion->pivot->promotional_price) && $promotion->pivot->promotional_price > 0) {
                            $promotionalPrice = $promotion->pivot->promotional_price;
                            $promotionName = $promotion->title ?? '';
                            $discountPercentage = round(($price - $promotionalPrice) / $price * 100);
                            $price = $promotionalPrice;
                            break;
                        }
                    }
                }
                
                // Сохраняем информацию о скидке
                $hasDiscount = ($discountPercentage > 0);
                $product->best_price = round($price, 2);
                $product->original_price = $hasDiscount ? round($originalPrice, 2) : null;
                $product->discount_percentage = $discountPercentage;
                $product->promotion_name = $promotionName;
                
                // Добавляем к общей сумме
                $total += $price * $item->quantity;
            }

            $cart->total = $total;
            $cart->save();
            
            return $cart;
        } catch (\Exception $e) {
            Log::error("Ошибка при расчете стоимости корзины: " . $e->getMessage());
            return $cart;
        }
    }

    /**
     * Display the user's cart.
     */
    public function index(): JsonResponse
    {
        $cart = $this->getCart();
        $cart = $this->calculateTotal($cart);

        return response()->json([
            'success' => true,
            'cart' => $cart,
            'items' => $cart->items,
        ]);
    }

    /**
     * Add a product to the cart.
     */
    public function addItem(Request $request): JsonResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1|max:100',
        ]);

        try {
            $cart = $this->getCart();
            $product = Product::with(['promotions' => function($query) {
                $query->where('is_active', true)
                    ->where('start_date', '<=', now())
                    ->where('end_date', '>=', now());
            }])->findOrFail($request->product_id);

            // Check if product already in cart
            $cartItem = $cart->items()->where('product_id', $request->product_id)->first();

            if ($cartItem) {
                // Update quantity if product already in cart
                $cartItem->quantity += $request->quantity;
                $cartItem->save();
            } else {
                // Create new cart item
                $cartItem = CartItem::create([
                    'cart_id' => $cart->id,
                    'product_id' => $request->product_id,
                    'quantity' => $request->quantity,
                ]);
            }

            // Обновляем общую стоимость
            $cart = $this->calculateTotal($cart);

            return response()->json([
                'success' => true,
                'message' => 'Товар добавлен в корзину',
                'cart' => $cart,
            ]);
        } catch (\Exception $e) {
            Log::error("Ошибка при добавлении товара в корзину: " . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Ошибка при добавлении товара в корзину',
            ], 500);
        }
    }

    /**
     * Update the quantity of a cart item.
     */
    public function updateCartItem(Request $request, $id = null): JsonResponse
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
            'cart_id' => 'required_without:id',
            'product_id' => 'required_without:id',
        ]);

        try {
            // Проверяем, используется ли гостевой режим
            $isGuestMode = $request->header('X-Guest-Cart') === 'true';
            
            // Получаем корзину текущего пользователя
            $cart = $this->getCart();

            // Находим элемент корзины по id или по cart_id/product_id
            $cartItem = null;
            
            if ($id) {
                $cartItem = $cart->items()->find($id);
            } else if ($request->cart_id && $request->product_id) {
                $cartItem = $cart->items()
                    ->where('cart_id', $request->cart_id)
                    ->where('product_id', $request->product_id)
                    ->first();
            }

            if (!$cartItem) {
                return response()->json([
                    'success' => false,
                    'message' => 'Товар не найден в корзине',
                ], 404);
            }

            // Обновляем количество
            $cartItem->quantity = $request->quantity;
            $cartItem->save();

            // Обновляем общую стоимость
            $cart = $this->calculateTotal($cart);

            $cart->load('items.product');

            return response()->json([
                'success' => true,
                'message' => 'Количество товара обновлено',
                'cart' => $cart,
                'items' => $cart->items,
                'guest_mode' => $isGuestMode,
                'session_id' => session('cart_id'),
            ]);
        } catch (\Exception $e) {
            Log::error("Ошибка при обновлении количества товара: " . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при обновлении количества товара',
            ], 500);
        }
    }

    /**
     * Remove an item from the cart.
     */
    public function removeItem(Request $request, $id = null): JsonResponse
    {
        $request->validate([
            'cart_id' => 'required_without:id',
            'product_id' => 'required_without:id',
        ]);

        try {
            // Проверяем, используется ли гостевой режим
            $isGuestMode = $request->header('X-Guest-Cart') === 'true';
            
            // Получаем корзину текущего пользователя
            $cart = $this->getCart();

            // Находим элемент корзины по id или по cart_id/product_id
            $cartItem = null;
            
            if ($id) {
                $cartItem = $cart->items()->find($id);
            } else if ($request->cart_id && $request->product_id) {
                $cartItem = $cart->items()
                    ->where('cart_id', $request->cart_id)
                    ->where('product_id', $request->product_id)
                    ->first();
            }

            if (!$cartItem) {
                return response()->json([
                    'success' => false,
                    'message' => 'Товар не найден в корзине',
                ], 404);
            }

            // Удаляем элемент из корзины
            $cartItem->delete();

            // Обновляем общую стоимость
            $cart = $this->calculateTotal($cart);
            
            return response()->json([
                'success' => true,
                'message' => 'Товар удален из корзины',
                'cart' => $cart,
                'items' => $cart->items->count() ? $cart->items : [],
                'guest_mode' => $isGuestMode,
                'session_id' => session('cart_id')
            ]);
        } catch (\Exception $e) {
            Log::error("Ошибка при удалении товара из корзины: " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при удалении товара из корзины: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Clear the cart.
     */
    public function clearCart(Request $request): JsonResponse
    {
        try {
            // Проверяем, используется ли гостевой режим
            $isGuestMode = $request->header('X-Guest-Cart') === 'true';
            
            // Получаем корзину текущего пользователя
            $cart = $this->getCart();

            // Удаляем все элементы из корзины
            $cart->items()->delete();
            $cart->total = 0;
            $cart->save();
            
            // Перезагружаем корзину
            $cart = $cart->fresh();

            return response()->json([
                'success' => true,
                'message' => 'Корзина очищена',
                'cart' => $cart,
                'items' => [],
                'guest_mode' => $isGuestMode,
                'session_id' => session('cart_id')
            ]);
        } catch (\Exception $e) {
            Log::error('Ошибка при очистке корзины: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при очистке корзины: ' . $e->getMessage(),
            ], 500);
        }
    }
}
