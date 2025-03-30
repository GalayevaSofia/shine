<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    /**
     * Process the checkout and create an order.
     */
    public function store(Request $request)
    {
        try {
            Log::info('Начало оформления заказа', [
                'user_id' => Auth::id(),
                'request_data' => $request->except(['_token'])
            ]);

            $request->validate([
                'customer_name' => 'required|string|max:255',
                'customer_email' => 'required|email|max:255',
                'customer_phone' => 'required|string|max:255',
                'delivery_method' => 'required|string|in:pickup,courier',
                'delivery_address' => 'required_if:delivery_method,courier|nullable|string',
                'payment_method' => 'required|string|in:card,cash',
                'comment' => 'nullable|string',
                'subtotal' => 'required|numeric|min:0',
                'delivery_fee' => 'required|numeric|min:0',
                'total' => 'required|numeric|min:0',
            ]);
            
            // Get the user's cart
            $cart = Cart::where('user_id', Auth::id())
                ->with('items.product.promotions')
                ->first();
            
            if (!$cart || $cart->items->isEmpty()) {
                Log::warning('Попытка оформить заказ с пустой корзиной', [
                    'user_id' => Auth::id(),
                    'cart' => $cart
                ]);
                
                return Redirect::back()->with('error', 'Ваша корзина пуста');
            }
            
            // Check stock for all items
            foreach ($cart->items as $item) {
                if (!$item->product || $item->product->stock < $item->quantity) {
                    Log::warning('Недостаточно товара при оформлении заказа', [
                        'user_id' => Auth::id(),
                        'product_id' => $item->product_id,
                        'requested_quantity' => $item->quantity,
                        'available_stock' => $item->product ? $item->product->stock : 0
                    ]);
                    
                    return Redirect::back()->with('error', "Недостаточно товара в наличии: {$item->product->name}");
                }
            }
            
            // Используем значения из фронтенда вместо пересчета
            $subtotal = (float)$request->input('subtotal');
            $deliveryFee = (float)$request->input('delivery_fee');
            $total = (float)$request->input('total');
            
            Log::info('Получены суммы заказа с фронтенда', [
                'subtotal' => $subtotal,
                'delivery_fee' => $deliveryFee,
                'total' => $total,
                'subtotal_type' => gettype($subtotal),
                'total_type' => gettype($total)
            ]);
            
            // Create order
            $order = new Order([
                'user_id' => Auth::id(),
                'order_number' => Order::generateOrderNumber(),
                'status' => 'pending',
                'subtotal' => (float)$subtotal,
                'delivery_fee' => (float)$deliveryFee,
                'total' => (float)$total,
                'delivery_method' => $request->delivery_method,
                'payment_method' => $request->payment_method,
                'customer_name' => $request->customer_name,
                'customer_email' => $request->customer_email,
                'customer_phone' => $request->customer_phone,
                'delivery_address' => $request->delivery_address,
                'comment' => $request->comment,
            ]);
            
            $order->save();
            
            // Проверим, что сохраненные данные правильные
            $freshOrder = Order::find($order->id);
            Log::info('Заказ создан', [
                'user_id' => Auth::id(),
                'order_id' => $order->id,
                'order_number' => $order->order_number,
                'subtotal' => $freshOrder->subtotal,
                'delivery_fee' => $freshOrder->delivery_fee,
                'total' => $freshOrder->total,
                'saved_values' => [
                    'subtotal_type' => gettype($freshOrder->subtotal),
                    'total_type' => gettype($freshOrder->total)
                ]
            ]);
            
            // Create order items and update stock
            foreach ($cart->items as $item) {
                // Получаем цену товара
                $product = $item->product;
                $itemPrice = ($product->best_price !== null) ? (float)$product->best_price : (float)$product->price;
                $itemQuantity = (int)$item->quantity;
                $itemSubtotal = $itemPrice * $itemQuantity;
                
                Log::info('Создание элемента заказа', [
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'product_name' => $item->product->name,
                    'price' => $itemPrice,
                    'quantity' => $itemQuantity,
                    'subtotal' => $itemSubtotal
                ]);
                
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'product_name' => $item->product->name,
                    'price' => $itemPrice,
                    'quantity' => $itemQuantity,
                    'subtotal' => $itemSubtotal
                ]);
                
                // Update product stock
                $item->product->decrement('stock', $itemQuantity);
            }
            
            // Clear the cart
            $cart->items()->delete();
            $cart->total = 0;
            $cart->save();
            
            Log::info('Заказ успешно оформлен, корзина очищена', [
                'user_id' => Auth::id(),
                'order_id' => $order->id
            ]);
            
            // Возвращаем правильный Inertia-ответ вместо простого JSON
            return Redirect::route('profile', ['initialTab' => 'orders'])
                ->with('success', 'Заказ успешно оформлен')
                ->with('order', [
                    'id' => $order->id,
                    'order_number' => $order->order_number
                ]);
                
        } catch (\Exception $e) {
            Log::error('Ошибка при оформлении заказа', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return Redirect::back()
                ->with('error', 'Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте снова.');
        }
    }
}
