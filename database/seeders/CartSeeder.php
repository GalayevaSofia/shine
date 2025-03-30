<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Очистим данные перед заполнением
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('cart_items')->truncate();
        DB::table('carts')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Создаем корзины
        $carts = [
            [
                'id' => 2,
                'user_id' => 3,
                'session_id' => 'ff2bc2fa-c3e6-4267-ba85-f2bae8e549c2',
                'total' => 0.00,
                'created_at' => '2025-03-23 15:55:56',
                'updated_at' => '2025-03-27 03:28:43',
            ],
            [
                'id' => 3,
                'user_id' => null,
                'session_id' => 'a7710008-2dbe-497a-b5de-ebf21ec1557e',
                'total' => 0.00,
                'created_at' => '2025-03-23 21:41:09',
                'updated_at' => '2025-03-23 21:41:09',
            ],
            [
                'id' => 7,
                'user_id' => 4,
                'session_id' => '54e69437-c412-44fe-8590-b99b9dff12e6',
                'total' => 0.00,
                'created_at' => '2025-03-27 02:17:11',
                'updated_at' => '2025-03-27 02:17:21',
            ],
        ];

        foreach ($carts as $cart) {
            DB::table('carts')->insert($cart);
        }

        // Создаем элементы корзины
        $cartItems = [
            [
                // No 'id' field - we're using composite primary key (cart_id, product_id)
                'cart_id' => 7,
                'product_id' => 2,
                'quantity' => 1,
                'created_at' => '2025-03-27 02:17:21',
                'updated_at' => '2025-03-27 02:17:21',
            ],
        ];

        foreach ($cartItems as $cartItem) {
            DB::table('cart_items')->insert($cartItem);
        }
    }
} 