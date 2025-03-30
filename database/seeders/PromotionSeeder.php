<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Promotion;
use App\Models\Product;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PromotionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Очистим существующие связи и акции
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('promotion_products')->truncate();
        DB::table('promotions')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Создаем акцию "Весенняя распродажа"
        $springSale = Promotion::create([
            'title' => 'Весенняя распродажа',
            'slug' => 'spring-sale',
            'description' => 'Специальные цены на популярные товары',
            'image' => 'https://images.unsplash.com/photo-1664276353762-94750e3317e9?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'discount_percentage' => 20,
            'start_date' => Carbon::parse('2025-03-23 20:28:51'),
            'end_date' => Carbon::parse('2025-04-22 20:28:51'),
            'is_active' => true,
        ]);

        // Добавляем товары в акцию со специальными ценами из SQL-дампа
        $promotionProducts = [
            ['product_slug' => 'moisturizing-body-lotion', 'promotional_price' => 1039.20],
            ['product_slug' => 'body-scrub', 'promotional_price' => 1199.20],
            ['product_slug' => 'moisturizing-face-cream', 'promotional_price' => 1599.20],
            ['product_slug' => 'vitamin-c-serum', 'promotional_price' => 1999.20],
            ['product_slug' => 'foundation', 'promotional_price' => 2399.20],
            ['product_slug' => 'eye-shadow-palette', 'promotional_price' => 1599.20],
            ['product_slug' => 'hair-shampoo', 'promotional_price' => 1199.20],
            ['product_slug' => 'hair-conditioner', 'promotional_price' => 1039.20],
        ];

        foreach ($promotionProducts as $item) {
            $product = Product::where('slug', $item['product_slug'])->first();
            if ($product) {
                $springSale->products()->attach($product->id, [
                    'promotional_price' => $item['promotional_price'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // Создаем акцию "Новинки"
        $newArrivals = Promotion::create([
            'title' => 'Новинки',
            'slug' => 'new-arrivals',
            'description' => 'Специальные цены на новые товары',
            'image' => 'https://images.unsplash.com/photo-1511929825537-516974a253df?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'discount_percentage' => 15,
            'start_date' => Carbon::parse('2025-03-23 20:28:51'),
            'end_date' => Carbon::parse('2025-04-07 20:28:51'),
            'is_active' => true,
        ]);

        // Добавляем новые товары в акцию со специальными ценами из SQL-дампа
        $newProductsPromos = [
            ['product_slug' => 'shower-gel', 'promotional_price' => 764.15],
            ['product_slug' => 'face-toner', 'promotional_price' => 1104.15],
            ['product_slug' => 'matte-lipsticks', 'promotional_price' => 2124.15],
            ['product_slug' => 'hair-mask', 'promotional_price' => 1699.15],
        ];

        foreach ($newProductsPromos as $item) {
            $product = Product::where('slug', $item['product_slug'])->first();
            if ($product) {
                $newArrivals->products()->attach($product->id, [
                    'promotional_price' => $item['promotional_price'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
} 