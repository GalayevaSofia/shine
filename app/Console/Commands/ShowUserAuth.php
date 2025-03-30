<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Cart;

class ShowUserAuth extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'show:user-auth {email?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check user authentication and cart data';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info("Auth::check(): " . (Auth::check() ? 'true' : 'false'));
        $this->info("Auth::id(): " . (Auth::id() ?: 'null'));
        
        // Check if we have any users
        $userCount = User::count();
        $this->info("Total users in database: " . $userCount);
        
        if ($userCount > 0) {
            $email = $this->argument('email');
            
            if ($email) {
                $user = User::where('email', $email)->first();
            } else {
                $user = User::first();
            }
            
            if ($user) {
                $this->info("Sample user: ID={$user->id}, Name={$user->name}, Email={$user->email}");
                
                // Check carts for this user
                $carts = Cart::where('user_id', $user->id)->get();
                $this->info("Carts for user {$user->id}: " . $carts->count());
                
                foreach ($carts as $cart) {
                    $this->info("Cart ID: {$cart->id}, Session ID: {$cart->session_id}, Total: {$cart->total}");
                    $this->info("Items: " . $cart->items()->count());
                }
            } else {
                $this->error("User not found");
            }
        }
        
        // Check session carts
        $sessionCarts = Cart::whereNull('user_id')->get();
        $this->info("Session carts (no user_id): " . $sessionCarts->count());
        
        foreach ($sessionCarts as $cart) {
            $this->info("Cart ID: {$cart->id}, Session ID: {$cart->session_id}, Total: {$cart->total}");
            $this->info("Items: " . $cart->items()->count());
        }
        
        return 0;
    }
}
