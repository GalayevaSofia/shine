<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    /**
     * Get products for the catalog page.
     */
    public function catalog(Request $request)
    {
        try {
            $query = $this->getBaseQuery();
            $this->applyFilters($query, $request);
            $this->applySorting($query, $request);

            // Пагинация
            $perPage = $request->input('per_page', 12);
            $products = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => [
                    'products' => $products
                ]
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse($e, 'при получении списка товаров');
        }
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        return Inertia::render('Admin/Products/Create', [
            'categories' => Category::all(),
        ]);
    }

    /**
     * Store a newly created product.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|max:2048',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'featured' => 'boolean',
            'status' => 'required|in:active,inactive,out_of_stock',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        Product::create($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified product for admin.
     */
    public function show(Product $product)
    {
        return Inertia::render('Admin/Products/Show', [
            'product' => $product->load('category'),
        ]);
    }

    /**
     * Display the product details for public view.
     */
    public function details($idOrSlug)
    {
        try {
            // Базовый запрос продукта
            $query = Product::with(['category'])
                ->with($this->getActivePromotionsRelation())
                ->select('id', 'name', 'slug', 'description', 'price', 'image', 'stock', 
                         'category_id', 'featured', 'status', 'ingredients', 'weight', 
                         'volume', 'manufacturer', 'usage_instructions', 'created_at', 
                         'rating', 'reviews_count')
                ->where('status', 'active');
            
            // Поиск по ID или slug
            $product = is_numeric($idOrSlug) 
                ? $query->find($idOrSlug) 
                : $query->where('slug', $idOrSlug)->first();
            
            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Товар не найден'
                ], 404);
            }

            // Добавление временного изображения
            if (empty($product->image)) {
                $product->image = "https://placehold.co/600x600/png?text=" . urlencode($product->name);
            }

            // Похожие товары
            $relatedProducts = $this->getRelatedProducts($product);

            return response()->json([
                'success' => true,
                'product' => $product,
                'relatedProducts' => $relatedProducts
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse($e, 'при получении данных о товаре');
        }
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => Category::all(),
        ]);
    }

    /**
     * Update the specified product.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|max:2048',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'featured' => 'boolean',
            'status' => 'required|in:active,inactive,out_of_stock',
        ]);

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified product.
     */
    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('success', 'Product deleted successfully.');
    }

    /**
     * Get featured products.
     */
    public function featured()
    {
        try {
            $featuredProducts = Product::where('featured', true)
                ->where('status', 'active')
                ->with('category')
                ->with($this->getActivePromotionsRelation())
                ->select('id', 'name', 'slug', 'price', 'image', 'category_id', 
                         'rating', 'reviews_count', 'stock')
                ->limit(8)
                ->get();

            return response()->json([
                'success' => true,
                'products' => $featuredProducts,
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse($e, 'при получении избранных товаров');
        }
    }

    /**
     * Get products by category.
     */
    public function byCategory($categorySlug, Request $request)
    {
        try {
            $category = Category::where('slug', $categorySlug)->firstOrFail();

            // Получаем ID всех категорий (текущая + дочерние)
            $categoryIds = [$category->id];
            $childCategories = Category::where('parent_id', $category->id)->pluck('id');
            if ($childCategories->count() > 0) {
                $categoryIds = array_merge($categoryIds, $childCategories->toArray());
            }

            // Базовый запрос
            $query = Product::whereIn('category_id', $categoryIds)
                ->where('status', 'active')
                ->with('category')
                ->with($this->getActivePromotionsRelation())
                ->select('id', 'name', 'slug', 'price', 'image', 'category_id', 
                         'rating', 'reviews_count', 'stock');

            // Применяем фильтры
            $this->applyFilters($query, $request);
            $this->applySorting($query, $request);

            $products = $query->paginate(12);

            return response()->json([
                'success' => true,
                'category' => $category,
                'products' => $products,
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse($e, 'при получении товаров категории');
        }
    }
    
    /**
     * Get base query with common selects and joins
     */
    private function getBaseQuery()
    {
        return Product::with(['category'])
            ->with($this->getActivePromotionsRelation())
            ->select('id', 'name', 'slug', 'price', 'image', 'category_id', 
                     'rating', 'reviews_count', 'stock')
            ->where('status', 'active');
    }
    
    /**
     * Apply filters to product query
     */
    private function applyFilters($query, Request $request)
    {
        // Фильтр по категории
        if ($request->filled('category')) {
            $categoryInput = $request->category;
            $category = is_numeric($categoryInput) 
                ? Category::find((int)$categoryInput)
                : Category::where('slug', $categoryInput)->first();

            if ($category) {
                $categoryId = $category->id;
                
                // Если родительская категория, включаем подкатегории
                if ($category->parent_id === null) {
                    $subcategories = Category::where('parent_id', $categoryId)->pluck('id')->toArray();
                    $allCategories = array_merge([$categoryId], $subcategories);
                    $query->whereIn('products.category_id', $allCategories);
                } else {
                    $query->where('products.category_id', $categoryId);
                }
            }
        }

        // Фильтр по цене
        if ($request->filled('min_price')) {
            $query->where('products.price', '>=', $request->min_price);
        }
        if ($request->filled('max_price')) {
            $query->where('products.price', '<=', $request->max_price);
        }

        // Фильтр по производителю
        if ($request->filled('manufacturer')) {
            $manufacturer = $request->manufacturer;
            
            if (strpos($manufacturer, ',') !== false) {
                $manufacturers = array_map('trim', explode(',', $manufacturer));
                
                $query->where(function($q) use ($manufacturers) {
                    foreach ($manufacturers as $brand) {
                        if (empty($brand)) continue;
                        $q->orWhere('products.manufacturer', 'like', "%{$brand}%");
                    }
                });
            } else {
                $query->where('products.manufacturer', 'like', "%{$manufacturer}%");
            }
        }

        // Фильтр по наличию
        if ($request->boolean('in_stock')) {
            $query->where('products.stock', '>', 0);
        }

        // Фильтр по новинкам
        if ($request->boolean('new_products')) {
            $query->where('products.created_at', '>=', now()->subDays(30));
        }

        // Фильтр по скидкам
        if ($request->boolean('sale')) {
            $query->where('products.promotional_price', '>', 0);
        }

        // Фильтр по рейтингу
        if ($request->filled('rating')) {
            $query->where('products.rating', '>=', $request->rating);
        }

        // Фильтр по поиску
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('products.name', 'like', "%{$search}%")
                    ->orWhere('products.description', 'like', "%{$search}%")
                    ->orWhere('products.manufacturer', 'like', "%{$search}%");
            });
        }
    }
    
    /**
     * Apply sorting to product query
     */
    private function applySorting($query, Request $request)
    {
        if ($request->has('sort_by')) {
            $sortDirection = $request->input('sort_dir', 'asc');
            if (!in_array($sortDirection, ['asc', 'desc'])) {
                $sortDirection = 'asc';
            }

            // Поддерживаемые варианты сортировки
            $allowedSorts = [
                'price' => 'products.price',
                'name' => 'products.name',
                'rating' => 'products.rating',
                'popularity' => 'products.popularity'
            ];

            $sortColumn = $allowedSorts[$request->sort_by] ?? 'products.popularity';
            $query->orderBy($sortColumn, $sortDirection);
        } else {
            $query->orderBy('products.popularity', 'desc');
        }
    }
    
    /**
     * Get related products for a given product
     */
    private function getRelatedProducts(Product $product)
    {
        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('status', 'active')
            ->select('id', 'name', 'slug', 'price', 'image', 'category_id', 
                     'rating', 'reviews_count', 'stock')
            ->with($this->getActivePromotionsRelation())
            ->limit(4)
            ->get();

        // Добавляем временные изображения для товаров без изображений
        return $relatedProducts->transform(function($product) {
            if (empty($product->image)) {
                $product->image = "https://placehold.co/600x600/png?text=" . urlencode($product->name);
            }
            return $product;
        });
    }
    
    /**
     * Format error response
     */
    private function errorResponse(\Exception $e, string $context): \Illuminate\Http\JsonResponse
    {
        Log::error("Ошибка {$context}: " . $e->getMessage());
        
        return response()->json([
            'success' => false,
            'message' => "Ошибка {$context}"
        ], 500);
    }
    
    /**
     * Get active promotions relation
     */
    private function getActivePromotionsRelation()
    {
        return ['promotions' => function($query) {
            $query->where('is_active', true)
                ->where('start_date', '<=', now())
                ->where('end_date', '>=', now());
        }];
    }
}
