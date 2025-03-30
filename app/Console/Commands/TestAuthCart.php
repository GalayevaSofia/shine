<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;

class TestAuthCart extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:auth-cart {email?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test auth and cart creation with user_id';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Get the first user or the specified one
        $email = $this->argument('email');
        $user = $email 
            ? User::where('email', $email)->first() 
            : User::first();
            
        if (!$user) {
            $this->error('No users found in the database.');
            return 1;
        }
        
        $this->info("Testing with User: ID={$user->id}, Name={$user->name}, Email={$user->email}");
        
        // Check if there's already a cart for this user
        $existingCart = Cart::where('user_id', $user->id)->first();
        if ($existingCart) {
            $this->info("User already has a cart: ID={$existingCart->id}, session_id={$existingCart->session_id}");
            $this->info("Items in cart: " . $existingCart->items()->count());
        } else {
            $this->info("No existing cart found for user {$user->id}");
        }
        
        // Manually authenticate the user
        Auth::login($user);
        
        $this->info("Auth::check(): " . (Auth::check() ? 'true' : 'false'));
        $this->info("Auth::id(): " . Auth::id());
        
        // Create a cart directly with user_id
        $cart = new Cart();
        $cart->user_id = $user->id;
        $cart->session_id = 'test-session-' . time();
        $cart->total = 0;
        $cart->save();
        
        $this->info("Created/Found cart: ID={$cart->id}, user_id={$cart->user_id}, session_id={$cart->session_id}");
        
        // Verify cart was created with user_id
        $userCart = Cart::where('user_id', $user->id)->orderBy('id', 'desc')->first();
        
        if ($userCart) {
            $this->info("Found user cart: ID={$userCart->id}, user_id={$userCart->user_id}, session_id={$userCart->session_id}");
            
            // Count items in cart
            $this->info("Cart has " . $userCart->items()->count() . " items");
        } else {
            $this->error("No cart found for user ID {$user->id}");
        }
        
        // Count all carts with user_id
        $userCarts = Cart::whereNotNull('user_id')->get();
        $this->info("Total carts with user_id: " . $userCarts->count());
        
        // List all user carts
        $this->info("All user carts:");
        foreach ($userCarts as $idx => $userCart) {
            $this->info(sprintf("%d. ID=%d, user_id=%d, session_id=%s", 
                $idx + 1, 
                $userCart->id, 
                $userCart->user_id, 
                $userCart->session_id
            ));
        }
        
        return 0;
    }
}
