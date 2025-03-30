<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;

class AddTestCartItem extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cart:add-test-item {product_id?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add a test item to the cart';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Get first product if no product ID is provided
        $productId = $this->argument('product_id') ?? Product::first()->id;
        
        if (!$productId) {
            $this->error('No products found in the database.');
            return 1;
        }
        
        $product = Product::find($productId);
        
        if (!$product) {
            $this->error("Product with ID {$productId} not found.");
            return 1;
        }
        
        $this->info("Adding product: {$product->name} (ID: {$product->id})");
        
        // Create a test cart with session ID
        $sessionId = 'test-session-' . now()->timestamp;
        
        $cart = Cart::firstOrCreate(
            ['session_id' => $sessionId],
            ['total' => 0]
        );
        
        $this->info("Using cart ID: {$cart->id}");
        
        // Add item to cart
        $price = $product->sale_price && $product->sale_price < $product->price 
            ? $product->sale_price 
            : $product->price;
            
        $cartItem = CartItem::create([
            'cart_id' => $cart->id,
            'product_id' => $product->id,
            'quantity' => 1,
            'price' => $price
        ]);
        
        // Update cart total
        $cart->total = $price;
        $cart->save();
        
        $this->info("Added {$product->name} to cart with price {$price}");
        $this->info("Cart session ID for testing: {$sessionId}");
        
        return 0;
    }
}
