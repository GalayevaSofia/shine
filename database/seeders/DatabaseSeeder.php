<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Отключаем проверку внешних ключей
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        // Запускаем сидеры
        $this->call([
            UserSeeder::class,
            CategorySeeder::class,
            ProductSeeder::class,
            PromotionSeeder::class,
            CartSeeder::class,
            OrderSeeder::class,
            WishlistSeeder::class,
        ]);
        
        // Включаем проверку внешних ключей
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
