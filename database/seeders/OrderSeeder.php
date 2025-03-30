<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Очистим данные перед заполнением
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('order_items')->truncate();
        DB::table('orders')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        
        // Создаем заказы (для примера добавляем только первые несколько)
        $orders = [
            [
                'id' => 1,
                'user_id' => 2,
                'order_number' => 'SH250323001',
                'status' => 'delivered',
                'subtotal' => 4880.00,
                'delivery_fee' => 300.00,
                'total' => 5180.00,
                'delivery_method' => 'courier',
                'payment_method' => 'card',
                'customer_name' => 'Тестовый Пользователь',
                'customer_email' => 'user@shine.ru',
                'customer_phone' => '79111111111',
                'delivery_address' => 'ул. Тестовая, д. 1, кв. 1',
                'comment' => null,
                'created_at' => '2025-03-18 15:53:37',
                'updated_at' => null,
            ],
            [
                'id' => 2,
                'user_id' => 2,
                'order_number' => 'SH250323002',
                'status' => 'processing',
                'subtotal' => 5990.00,
                'delivery_fee' => 0.00,
                'total' => 5990.00,
                'delivery_method' => 'pickup',
                'payment_method' => 'cash',
                'customer_name' => 'Тестовый Пользователь',
                'customer_email' => 'user@shine.ru',
                'customer_phone' => '79111111111',
                'delivery_address' => null,
                'comment' => null,
                'created_at' => '2025-03-21 15:53:37',
                'updated_at' => null,
            ],
            [
                'id' => 3,
                'user_id' => 3,
                'order_number' => 'SH2503242287',
                'status' => 'pending',
                'subtotal' => 19106.40,
                'delivery_fee' => 0.00,
                'total' => 19106.40,
                'delivery_method' => 'pickup',
                'payment_method' => 'card',
                'customer_name' => 'Софья',
                'customer_email' => 'galayeva.04@bk.ru',
                'customer_phone' => '+76786474774',
                'delivery_address' => null,
                'comment' => null,
                'created_at' => '2025-03-23 22:21:10',
                'updated_at' => '2025-03-23 22:21:10',
            ],
        ];

        foreach ($orders as $order) {
            DB::table('orders')->insert($order);
        }
        
        // Создаем элементы заказов
        $orderItems = [
            [
                'id' => 1,
                'order_id' => 1,
                'product_id' => 1,
                'product_name' => 'Увлажняющий крем для лица',
                'price' => 2990.00,
                'quantity' => 1,
                'subtotal' => 2990.00,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 2,
                'order_id' => 1,
                'product_id' => 2,
                'product_name' => 'Матовая помада',
                'price' => 1890.00,
                'quantity' => 1,
                'subtotal' => 1890.00,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 3,
                'order_id' => 2,
                'product_id' => 4,
                'product_name' => 'Парфюмерная вода',
                'price' => 5990.00,
                'quantity' => 1,
                'subtotal' => 5990.00,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 4,
                'order_id' => 3,
                'product_id' => 1,
                'product_name' => 'Увлажняющий лосьон для тела',
                'price' => 0.00,
                'quantity' => 8,
                'subtotal' => 0.00,
                'created_at' => '2025-03-23 22:21:10',
                'updated_at' => '2025-03-23 22:21:10',
            ],
            [
                'id' => 5,
                'order_id' => 3,
                'product_id' => 2,
                'product_name' => 'Скраб для тела',
                'price' => 0.00,
                'quantity' => 9,
                'subtotal' => 0.00,
                'created_at' => '2025-03-23 22:21:10',
                'updated_at' => '2025-03-23 22:21:10',
            ],
        ];

        foreach ($orderItems as $item) {
            DB::table('order_items')->insert($item);
        }
    }
}
