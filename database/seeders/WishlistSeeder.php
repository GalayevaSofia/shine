<?php

namespace Database\Seeders;

use App\Models\Wishlist;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WishlistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Очистим данные перед заполнением
        Wishlist::truncate();
        
        // Создаем списки желаний
        $wishlists = [
            [
                'user_id' => 2,
                'product_id' => 1,
                'created_at' => '2025-03-23 15:53:37',
                'updated_at' => '2025-03-23 15:53:37',
            ],
            [
                'user_id' => 2,
                'product_id' => 4,
                'created_at' => '2025-03-23 15:53:37',
                'updated_at' => '2025-03-23 15:53:37',
            ],
            [
                'user_id' => 4,
                'product_id' => 2,
                'created_at' => '2025-03-27 02:17:24',
                'updated_at' => '2025-03-27 02:17:24',
            ],
            [
                'user_id' => 3,
                'product_id' => 2,
                'created_at' => '2025-03-27 03:09:50',
                'updated_at' => '2025-03-27 03:09:50',
            ],
            [
                'user_id' => 3,
                'product_id' => 1,
                'created_at' => '2025-03-27 03:09:51',
                'updated_at' => '2025-03-27 03:09:51',
            ],
            [
                'user_id' => 3,
                'product_id' => 3,
                'created_at' => '2025-03-27 03:09:52',
                'updated_at' => '2025-03-27 03:09:52',
            ],
        ];

        foreach ($wishlists as $wishlist) {
            DB::table('wishlists')->insert($wishlist);
        }
    }
}
