<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Уход за телом',
                'slug' => 'body-care',
                'description' => 'Средства для ухода за кожей тела',
                'image' => 'https://plus.unsplash.com/premium_photo-1679046948998-802085f0a8a7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'featured' => true,
            ],
            [
                'name' => 'Уход за лицом',
                'slug' => 'face-care',
                'description' => 'Средства для ухода за кожей лица',
                'image' => 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'featured' => true,
            ],
            [
                'name' => 'Макияж',
                'slug' => 'makeup',
                'description' => 'Средства для макияжа',
                'image' => 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'featured' => true,
            ],
            [
                'name' => 'Уход за волосами',
                'slug' => 'hair-care',
                'description' => 'Средства для ухода за волосами',
                'image' => 'https://images.unsplash.com/photo-1595456982104-14cc660c4d22?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'featured' => true,
            ],
        ];

        foreach ($categories as $category) {
            // Check if the category already exists
            if (!Category::where('slug', $category['slug'])->exists()) {
                Category::create($category);
            }
        }

        // Get main categories
        $bodyCare = Category::where('slug', 'body-care')->first();
        $faceCare = Category::where('slug', 'face-care')->first();
        $makeup = Category::where('slug', 'makeup')->first();
        $hairCare = Category::where('slug', 'hair-care')->first();

        // Create subcategories for body care
        $this->createSubcategory([
            'name' => 'Гели для душа',
            'slug' => 'shower-gels',
            'description' => 'Гели для душа и очищения кожи',
            'image' => 'images/categories/shower-gels.jpg',
            'parent_id' => $bodyCare->id,
        ]);

        $this->createSubcategory([
            'name' => 'Скрабы для тела',
            'slug' => 'body-scrubs',
            'description' => 'Скрабы для тела и пилинги',
            'image' => 'images/categories/body-scrubs.jpg',
            'parent_id' => $bodyCare->id,
        ]);

        // Create subcategories for face care
        $this->createSubcategory([
            'name' => 'Кремы для лица',
            'slug' => 'face-creams',
            'description' => 'Увлажняющие и питательные кремы для лица',
            'image' => 'images/categories/face-creams.jpg',
            'parent_id' => $faceCare->id,
        ]);

        $this->createSubcategory([
            'name' => 'Сыворотки',
            'slug' => 'serums',
            'description' => 'Сыворотки и концентраты для лица',
            'image' => 'images/categories/serums.jpg',
            'parent_id' => $faceCare->id,
        ]);

        // Create subcategories for makeup
        $this->createSubcategory([
            'name' => 'Тональные средства',
            'slug' => 'foundations',
            'description' => 'Тональные кремы и основы под макияж',
            'image' => 'images/categories/foundations.jpg',
            'parent_id' => $makeup->id,
        ]);

        $this->createSubcategory([
            'name' => 'Помады',
            'slug' => 'lipsticks',
            'description' => 'Помады и блески для губ',
            'image' => 'images/categories/lipsticks.jpg',
            'parent_id' => $makeup->id,
        ]);

        // Create subcategories for hair care
        $this->createSubcategory([
            'name' => 'Шампуни',
            'slug' => 'shampoos',
            'description' => 'Шампуни для всех типов волос',
            'image' => 'images/categories/shampoos.jpg',
            'parent_id' => $hairCare->id,
        ]);

        $this->createSubcategory([
            'name' => 'Кондиционеры',
            'slug' => 'conditioners',
            'description' => 'Кондиционеры и маски для волос',
            'image' => 'images/categories/conditioners.jpg',
            'parent_id' => $hairCare->id,
        ]);
    }

    private function createSubcategory($data)
    {
        // Check if the subcategory already exists
        if (!Category::where('slug', $data['slug'])->exists()) {
            Category::create($data);
        }
    }
} 