<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Получаем категории
        $bodyCare = Category::where('slug', 'body-care')->first();
        $faceCare = Category::where('slug', 'face-care')->first();
        $makeup = Category::where('slug', 'makeup')->first();
        $hairCare = Category::where('slug', 'hair-care')->first();

        // Создаем продукты для ухода за телом
        $this->createBodyCareProducts($bodyCare->id);

        // Создаем продукты для ухода за лицом
        $this->createFaceCareProducts($faceCare->id);

        // Создаем продукты для макияжа
        $this->createMakeupProducts($makeup->id);

        // Создаем продукты для ухода за волосами
        $this->createHairCareProducts($hairCare->id);
        
        // Добавляем различные бренды для демонстрации поиска по производителям
        $this->addDiverseManufacturers();
    }
    
    private function createBodyCareProducts($categoryId): void
    {
        $products = [
            [
                'name' => 'Увлажняющий лосьон для тела',
                'slug' => 'moisturizing-body-lotion',
                'description' => 'Интенсивно увлажняющий лосьон для тела с экстрактом алоэ вера',
                'ingredients' => 'Aqua, Glycerin, Aloe Barbadensis Leaf Juice, Butyrospermum Parkii Butter',
                'price' => 1299.00,
                'image' => 'https://pcdn.goldapple.ru/p/p/19000324290/web/696d674d61696e5f66613861306464343735306434653732393436306334366262363235313965378dce14645af772efullhd.webp',
                'stock' => 36,
                'category_id' => $categoryId,
                'featured' => true,
                'manufacturer' => 'Shine Beauty',
                'rating' => 4.8,
                'reviews_count' => 120,
                'popularity' => 150,
                'weight' => '250 мл',
                'volume' => '250 мл',
                'usage_instructions' => 'Нанесите на влажную кожу после душа. Легкими массажными движениями распределите по телу.',
            ],
            [
                'name' => 'Скраб для тела',
                'slug' => 'body-scrub',
                'description' => 'Очищающий скраб для тела с морской солью и маслом кокоса',
                'ingredients' => 'Sodium Chloride, Cocos Nucifera Oil, Prunus Amygdalus Dulcis Oil',
                'price' => 1499.00,
                'image' => 'https://pcdn.goldapple.ru/p/p/19000025206/web/696d674d61696e5f37373434333966333937333334666334393433386332373166656462643739358dd12a346e7ec1dfullhd.webp',
                'stock' => 18,
                'category_id' => $categoryId,
                'featured' => true,
                'manufacturer' => 'Shine Beauty',
                'rating' => 4.6,
                'reviews_count' => 85,
                'popularity' => 120,
                'weight' => '300 г',
                'volume' => '300 мл',
                'usage_instructions' => 'Нанесите на влажную кожу. Круговыми движениями массируйте 2-3 минуты. Смойте теплой водой.',
            ],
            [
                'name' => 'Гель для душа',
                'slug' => 'shower-gel',
                'description' => 'Нежный гель для душа с экстрактом ромашки',
                'ingredients' => 'Aqua, Sodium Laureth Sulfate, Chamomilla Recutita Extract',
                'price' => 899.00,
                'image' => 'https://pcdn.goldapple.ru/p/p/19000186496/web/696d674d61696e8dc8413ec57c2abfullhd.webp',
                'stock' => 59,
                'category_id' => $categoryId,
                'featured' => true,
                'manufacturer' => 'Shine Beauty',
                'rating' => 3.0,
                'reviews_count' => 200,
                'popularity' => 250,
                'weight' => '400 мл',
                'volume' => '400 мл',
                'usage_instructions' => 'Нанесите на влажную кожу. Вспеньте и смойте теплой водой.',
            ],
        ];

        foreach ($products as $product) {
            // Check if product already exists
            if (!Product::where('slug', $product['slug'])->exists()) {
                Product::create($product);
            }
        }
    }
    
    private function createFaceCareProducts($categoryId): void
    {
        $products = [
            [
                'name' => 'Увлажняющий крем для лица',
                'slug' => 'moisturizing-face-cream',
                'description' => 'Легкий увлажняющий крем для всех типов кожи',
                'ingredients' => 'Aqua, Glycerin, Hyaluronic Acid, Niacinamide',
                'price' => 1999.00,
                'image' => 'https://pcdn.goldapple.ru/p/p/19000001675/web/696d674d61696e8dc83ca2a1a171afullhd.webp',
                'stock' => 21,
                'category_id' => $categoryId,
                'featured' => true,
                'manufacturer' => 'Shine Beauty',
                'rating' => 4.9,
                'reviews_count' => 150,
                'popularity' => 180,
                'weight' => '50 мл',
                'volume' => '50 мл',
                'usage_instructions' => 'Нанесите на очищенную кожу лица утром и вечером. Легкими движениями распределите по массажным линиям.',
            ],
            [
                'name' => 'Сыворотка с витамином С',
                'slug' => 'vitamin-c-serum',
                'description' => 'Осветляющая сыворотка с витамином С',
                'ingredients' => 'Aqua, Ascorbic Acid, Ferulic Acid, Vitamin E',
                'price' => 2499.00,
                'image' => 'https://pcdn.goldapple.ru/p/p/19000305677/web/696d674d61696e5f37626336396635333965373834663063383133656132633964323864373336658dcdd697d14f50afullhd.webp',
                'stock' => 25,
                'category_id' => $categoryId,
                'featured' => true,
                'manufacturer' => 'Shine Beauty',
                'rating' => 4.8,
                'reviews_count' => 90,
                'popularity' => 110,
                'weight' => '30 мл',
                'volume' => '30 мл',
                'usage_instructions' => 'Нанесите 2-3 капли на очищенную кожу лица утром. Используйте под солнцезащитный крем.',
            ],
            [
                'name' => 'Тоник для лица',
                'slug' => 'face-toner',
                'description' => 'Очищающий тоник с экстрактом зеленого чая',
                'ingredients' => 'Aqua, Camellia Sinensis Leaf Extract, Glycerin',
                'price' => 1299.00,
                'image' => 'https://pcdn.goldapple.ru/p/p/19000222299/web/696d674d61696e5f65656237373433656463643234626230613634666233313563663436653538368dd093759615ea6fullhd.webp',
                'stock' => 59,
                'category_id' => $categoryId,
                'featured' => true,
                'manufacturer' => 'Shine Beauty',
                'rating' => 4.7,
                'reviews_count' => 75,
                'popularity' => 95,
                'weight' => '200 мл',
                'volume' => '200 мл',
                'usage_instructions' => 'Нанесите на ватный диск и протрите очищенную кожу лица утром и вечером.',
            ],
        ];

        foreach ($products as $product) {
            // Check if product already exists
            if (!Product::where('slug', $product['slug'])->exists()) {
                Product::create($product);
            }
        }
    }
    
    private function createMakeupProducts($categoryId): void
    {
        $products = [
            [
                'name' => 'Тональный крем',
                'slug' => 'foundation',
                'description' => 'Матовый тональный крем с длительным эффектом',
                'ingredients' => 'Aqua, Dimethicone, Titanium Dioxide, Iron Oxides',
                'price' => 2999.00,
                'image' => 'https://pcdn.goldapple.ru/p/p/19000163534/web/696d674d61696e8dc8406e07d2bf3fullhd.webp',
                'stock' => 0,
                'category_id' => $categoryId,
                'featured' => true,
                'manufacturer' => 'Shine Beauty',
                'rating' => 4.8,
                'reviews_count' => 180,
                'popularity' => 220,
                'weight' => '30 мл',
                'volume' => '30 мл',
                'usage_instructions' => 'Нанесите на очищенную и увлажненную кожу лица. Распределите спонжем или кистью.',
            ],
            [
                'name' => 'Палетка теней для век',
                'slug' => 'eye-shadow-palette',
                'description' => 'Палетка из 12 оттенков теней для век',
                'ingredients' => 'Talc, Mica, Iron Oxides, Ultramarines',
                'price' => 1999.00,
                'image' => 'https://pcdn.goldapple.ru/p/p/19000159343/web/696d67416464315f33356136666230353438386634613036393232616265623131313366383063638dca0b40f68b44bfullhd.webp',
                'stock' => 42,
                'category_id' => $categoryId,
                'featured' => true,
                'manufacturer' => 'Shine Beauty',
                'rating' => 4.9,
                'reviews_count' => 120,
                'popularity' => 150,
                'weight' => '15 г',
                'volume' => null,
                'usage_instructions' => 'Нанесите на веки с помощью аппликатора или кисти. Смешивайте оттенки для создания различных образов.',
            ],
            [
                'name' => 'Матовые помады',
                'slug' => 'matte-lipsticks',
                'description' => 'Набор из 3 матовых помад',
                'ingredients' => 'Ricinus Communis Seed Oil, Cera Alba, Iron Oxides',
                'price' => 2499.00,
                'image' => 'https://pcdn.goldapple.ru/p/p/19000117979/web/696d674d61696e5f39306131623638356233613634333032386335616666633864326662303663308dc9a53a77e196dfullhd.webp',
                'stock' => 30,
                'category_id' => $categoryId,
                'featured' => true,
                'manufacturer' => 'Shine Beauty',
                'rating' => 4.7,
                'reviews_count' => 95,
                'popularity' => 120,
                'weight' => '3.5 г',
                'volume' => null,
                'usage_instructions' => 'Нанесите на губы. Для более стойкого эффекта используйте карандаш для губ перед нанесением помады.',
            ],
        ];

        foreach ($products as $product) {
            // Check if product already exists
            if (!Product::where('slug', $product['slug'])->exists()) {
                Product::create($product);
            }
        }
    }
    
    private function createHairCareProducts($categoryId): void
    {
        $products = [
            [
                'name' => 'Шампунь для волос',
                'slug' => 'hair-shampoo',
                'description' => 'Увлажняющий шампунь с кератином',
                'ingredients' => 'Aqua, Sodium Laureth Sulfate, Keratin, Panthenol',
                'price' => 1499.00,
                'image' => 'https://pcdn.goldapple.ru/p/p/19000141206/web/696d674d61696e8dc83fc7ef44744fullhd.webp',
                'stock' => 47,
                'category_id' => $categoryId,
                'featured' => true,
                'manufacturer' => 'Shine Beauty',
                'rating' => 4.8,
                'reviews_count' => 160,
                'popularity' => 200,
                'weight' => '300 мл',
                'volume' => '300 мл',
                'usage_instructions' => 'Нанесите на влажные волосы. Вспеньте и смойте теплой водой. При необходимости повторите.',
            ],
            [
                'name' => 'Бальзам-ополаскиватель',
                'slug' => 'hair-conditioner',
                'description' => 'Питательный бальзам-ополаскиватель',
                'ingredients' => 'Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Argan Oil',
                'price' => 1299.00,
                'image' => 'https://pcdn.goldapple.ru/p/p/19000232368/web/696d674d61696e5f33633764613566323761663734616461626338346630613037326232313535348dcf8d6ccf7b7dbfullhd.webp',
                'stock' => 36,
                'category_id' => $categoryId,
                'featured' => true,
                'manufacturer' => 'Shine Beauty',
                'rating' => 4.7,
                'reviews_count' => 140,
                'popularity' => 170,
                'weight' => '300 мл',
                'volume' => '300 мл',
                'usage_instructions' => 'После шампуня нанесите на влажные волосы. Оставьте на 2-3 минуты. Тщательно смойте теплой водой.',
            ],
            [
                'name' => 'Маска для волос',
                'slug' => 'hair-mask',
                'description' => 'Восстанавливающая маска для волос',
                'ingredients' => 'Aqua, Cetearyl Alcohol, Argania Spinosa Kernel Oil, Keratin',
                'price' => 1999.00,
                'image' => 'https://pcdn.goldapple.ru/p/p/99000000756/web/696d674d61696e5f34656633306134393763623934366433616537636337653630636563313463648dcef77dbe0b764fullhd.webp',
                'stock' => 25,
                'category_id' => $categoryId,
                'featured' => true,
                'manufacturer' => 'Shine Beauty',
                'rating' => 4.9,
                'reviews_count' => 90,
                'popularity' => 110,
                'weight' => '200 мл',
                'volume' => '200 мл',
                'usage_instructions' => 'Нанесите на влажные волосы после шампуня. Оставьте на 5-10 минут. Тщательно смойте теплой водой.',
            ],
        ];

        foreach ($products as $product) {
            // Check if product already exists
            if (!Product::where('slug', $product['slug'])->exists()) {
                Product::create($product);
            }
        }
    }
    
    /**
     * Добавляет разнообразные бренды для демонстрации гибкого поиска
     */
    private function addDiverseManufacturers(): void
    {
        // Массив различных производителей для разных категорий товаров
        $manufacturers = [
            'Shine Beauty', 'L\'Oreal Paris', 'Maybelline', 'The Ordinary',
            'CeraVe', 'La Roche-Posay', 'Bioderma', 'Vichy', 'Avene',
            'MAC Cosmetics', 'Estée Lauder', 'Clinique', 'Fenty Beauty',
            'NYX', 'Garnier', 'Nivea', 'Dove', 'Neutrogena', 'Oriflame'
        ];
        
        // Обновляем некоторые существующие товары с разными производителями
        $products = Product::take(20)->get();
        
        foreach ($products as $index => $product) {
            $product->manufacturer = $manufacturers[$index % count($manufacturers)];
            $product->save();
        }
    }
} 