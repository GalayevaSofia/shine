<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display the user's orders.
     */
    public function index()
    {
        $orders = Order::where('user_id', Auth::id())
            ->with(['items'])
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json([
            'success' => true,
            'orders' => $this->formatOrdersCollection($orders),
        ]);
    }

    /**
     * Show the order details.
     */
    public function show($orderNumber)
    {
        $order = Order::with(['items'])
            ->where('order_number', $orderNumber)
            ->where('user_id', Auth::id())
            ->first();
        
        if (!$order) {
            return Inertia::render('Account/OrderDetail', [
                'order' => null
            ]);
        }
        
        return Inertia::render('Account/OrderDetail', [
            'order' => $this->formatOrder($order)
        ]);
    }

    /**
     * Process the checkout and create an order.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'customer_name' => 'required|string|max:255',
                'customer_email' => 'required|email|max:255',
                'customer_phone' => 'required|string|max:255',
                'delivery_method' => 'required|string|in:pickup,courier',
                'delivery_address' => 'required_if:delivery_method,courier|nullable|string',
                'payment_method' => 'required|string|in:card,cash',
                'comment' => 'nullable|string',
            ]);
            
            Log::info('Оформление заказа - начало', [
                'user_id' => Auth::id(),
                'data' => $validated
            ]);

            // Get the user's cart
            $cart = Cart::where('user_id', Auth::id())
                ->with('items.product.promotions')
                ->first();
            
            if (!$cart) {
                Log::error('Оформление заказа - корзина не найдена', [
                    'user_id' => Auth::id()
                ]);
                return back()->with('error', 'Ваша корзина пуста');
            }
            
            if ($cart->items->isEmpty()) {
                Log::error('Оформление заказа - корзина пуста', [
                    'user_id' => Auth::id(), 
                    'cart_id' => $cart->id
                ]);
                return back()->with('error', 'Ваша корзина пуста');
            }
            
            Log::info('Оформление заказа - корзина найдена', [
                'cart_id' => $cart->id,
                'items_count' => $cart->items->count(),
                'items' => $cart->items->map(function($item) {
                    return [
                        'id' => $item->id,
                        'product_id' => $item->product_id,
                        'product_name' => $item->product->name,
                        'quantity' => $item->quantity,
                        'product_price' => $item->product->price,
                        'product_best_price' => $item->product->best_price,
                    ];
                })
            ]);
            
            // Check stock for all items
            foreach ($cart->items as $item) {
                if (!$item->product || $item->product->stock < $item->quantity) {
                    Log::error('Оформление заказа - недостаточно товара', [
                        'product_id' => $item->product_id,
                        'product_name' => $item->product->name,
                        'stock' => $item->product->stock,
                        'quantity' => $item->quantity
                    ]);
                    return back()->with('error', "Недостаточно товара в наличии: {$item->product->name}");
                }
            }
            
            // Calculate totals
            $subtotal = $cart->items->sum(function ($item) {
                // Получаем best_price из продукта, если она доступна
                if ($item->product && $item->product->best_price !== null) {
                    $price = $item->product->best_price;
                } else {
                    $price = $item->product->price;
                }
                return $price * $item->quantity;
            });
            
            $deliveryFee = $request->delivery_method === 'courier' ? 300 : 0;
            $total = $subtotal + $deliveryFee;
            
            Log::info('Оформление заказа - расчет стоимости', [
                'subtotal' => $subtotal,
                'delivery_fee' => $deliveryFee,
                'total' => $total
            ]);
            
            // Оборачиваем всю операцию в транзакцию
            return DB::transaction(function() use ($request, $cart, $validated, $subtotal, $deliveryFee, $total) {
                // Create order
                $order = new Order([
                    'user_id' => Auth::id(),
                    'order_number' => Order::generateOrderNumber(),
                    'status' => 'pending',
                    'subtotal' => $subtotal,
                    'delivery_fee' => $deliveryFee,
                    'total' => $total,
                    'delivery_method' => $request->delivery_method,
                    'payment_method' => $request->payment_method,
                    'customer_name' => $request->customer_name,
                    'customer_email' => $request->customer_email,
                    'customer_phone' => $request->customer_phone,
                    'delivery_address' => $request->delivery_address,
                    'comment' => $request->comment,
                ]);
                
                $order->save();
                
                Log::info('Оформление заказа - заказ создан', [
                    'order_id' => $order->id,
                    'order_number' => $order->order_number
                ]);
                
                // Create order items and update stock
                $orderItems = [];
                
                foreach ($cart->items as $item) {
                    // Определяем лучшую цену для товара
                    if ($item->product->best_price !== null) {
                        $price = $item->product->best_price;
                    } else {
                        $price = $item->product->price;
                    }
                    
                    $orderItem = OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item->product_id,
                        'product_name' => $item->product->name,
                        'price' => $price,
                        'quantity' => $item->quantity,
                        'subtotal' => $price * $item->quantity
                    ]);
                    
                    $orderItems[] = [
                        'id' => $orderItem->id,
                        'product_id' => $orderItem->product_id,
                        'product_name' => $orderItem->product_name,
                        'quantity' => $orderItem->quantity,
                        'price' => $orderItem->price,
                        'subtotal' => $orderItem->subtotal
                    ];
                    
                    // Update product stock
                    $item->product->decrement('stock', $item->quantity);
                }
                
                Log::info('Оформление заказа - добавлены товары', [
                    'order_id' => $order->id,
                    'items' => $orderItems
                ]);
                
                Log::info('Оформление заказа - перед очисткой корзины', [
                    'cart_id' => $cart->id,
                    'items_count' => $cart->items->count()
                ]);
                
                // Явно получаем список идентификаторов элементов корзины перед удалением
                $cartItemIds = $cart->items->pluck('id')->toArray();
                Log::info('Оформление заказа - IDs элементов корзины для удаления', [
                    'cart_id' => $cart->id,
                    'item_ids' => $cartItemIds
                ]);
                
                // Clear the cart - используем прямой запрос DELETE
                $deleteResult = DB::table('cart_items')
                    ->whereIn('id', $cartItemIds)
                    ->delete();
                
                Log::info('Оформление заказа - корзина очищена прямым запросом', [
                    'cart_id' => $cart->id,
                    'delete_result' => $deleteResult,
                    'deleted_items' => $cartItemIds
                ]);
                
                $cart->total = 0;
                $cart->save();
                
                // Перезагружаем cart, чтобы проверить действительно ли очистились элементы
                $refreshedCart = Cart::where('id', $cart->id)->with('items')->first();
                Log::info('Оформление заказа - проверка корзины после очистки', [
                    'cart_id' => $refreshedCart->id,
                    'items_count' => $refreshedCart->items->count()
                ]);
                
                Log::info('Оформление заказа - завершено успешно', [
                    'order_id' => $order->id,
                    'order_number' => $order->order_number
                ]);
                
                return redirect()->route('profile', ['initialTab' => 'orders'])
                    ->with('success', 'Заказ успешно оформлен');
            });
            
        } catch (\Exception $e) {
            Log::error('Ошибка при оформлении заказа', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return back()->with('error', 'Произошла ошибка при оформлении заказа: ' . $e->getMessage());
        }
    }

    /**
     * Cancel an order.
     */
    public function cancel($id)
    {
        $order = Order::findOrFail($id);
        
        // Check if the order belongs to the authenticated user
        if ($order->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }
        
        // Only pending orders can be canceled
        if ($order->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Отменить можно только заказы в статусе "ожидание"'
            ], 422);
        }
        
        // Update order status
        $order->status = 'canceled';
        $order->save();
        
        // Return stock to inventory
        foreach ($order->items as $item) {
            $product = Product::find($item->product_id);
            if ($product) {
                $product->stock += $item->quantity;
                
                // Update status if needed
                if ($product->status === 'out_of_stock' && $product->stock > 0) {
                    $product->status = 'active';
                }
                
                $product->save();
            }
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Заказ успешно отменён',
            'order' => $order->fresh(),
        ]);
    }

    /**
     * Admin: Display all orders.
     */
    public function adminIndex()
    {
        $orders = Order::with('user')->latest()->paginate(10);
        
        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Admin: Show order details.
     */
    public function adminShow($id)
    {
        $order = Order::with(['user', 'items.product'])->findOrFail($id);
        
        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
        ]);
    }

    /**
     * Admin: Update order status.
     */
    public function adminUpdate(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processing,completed,canceled',
            'payment_status' => 'required|in:pending,paid,failed',
        ]);
        
        $order = Order::findOrFail($id);
        $order->update($validated);
        
        return redirect()->route('admin.orders.show', $order->id)
            ->with('success', 'Заказ успешно обновлён');
    }
    
    /**
     * Format a single order for response
     */
    private function formatOrder($order)
    {
        $itemCount = $order->items->sum('quantity');
        
        Log::info('Форматирование заказа', [
            'order_id' => $order->id,
            'order_number' => $order->order_number,
            'items_count' => $order->items->count(),
            'total_quantity' => $itemCount,
            'items' => $order->items->map(function ($item) {
                return [
                    'id' => $item->id,
                    'quantity' => $item->quantity
                ];
            })
        ]);
        
        return [
            'id' => $order->id,
            'order_number' => $order->order_number,
            'status' => $order->status,
            'status_text' => $order->status_text,
            'subtotal' => (float)$order->subtotal,
            'delivery_fee' => (float)$order->delivery_fee,
            'total' => (float)$order->total,
            'delivery_method' => $order->delivery_method,
            'payment_method' => $order->payment_method,
            'customer_name' => $order->customer_name,
            'customer_email' => $order->customer_email,
            'customer_phone' => $order->customer_phone,
            'delivery_address' => $order->delivery_address,
            'comment' => $order->comment,
            'created_at' => $order->created_at->format('d.m.Y H:i'),
            'items' => $order->items->map(function ($item) {
                return [
                    'id' => $item->id,
                    'product_name' => $item->product_name,
                    'price' => (float)$item->price,
                    'quantity' => (int)$item->quantity,
                    'subtotal' => (float)$item->subtotal,
                ];
            }),
            'item_count' => $itemCount
        ];
    }
    
    /**
     * Format a collection of orders for response
     */
    private function formatOrdersCollection($orders)
    {
        return $orders->map(function ($order) {
            return $this->formatOrder($order);
        });
    }
} 