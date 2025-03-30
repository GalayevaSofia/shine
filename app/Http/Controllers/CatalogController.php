<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CatalogController extends Controller
{
    /**
     * Get all products for catalog
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Product::where('status', 'active')
                ->select('id', 'name', 'slug', 'price', 'image', 'category_id', 
                        'rating', 'stock', 'featured', 'created_at');

            // Применяем фильтры
            $this->applyFilters($query, $request);
            
            // Применяем сортировку
            $this->applySorting($query, $request);

            // Добавляем связи
            $query->with('category');
            $query->with($this->getActivePromotionsRelation());

            // Пагинация результатов
            $products = $query->paginate(12);

            // Получаем категории для фильтра
            $categories = Category::whereNull('parent_id')
                ->with(['children' => function($query) {
                    $query->select('id', 'name', 'slug', 'parent_id')
                        ->orderBy('name');
                }])
                ->select('id', 'name', 'slug')
                ->orderBy('name')
                ->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'products' => $products,
                    'categories' => $categories
                ]
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse($e, 'при загрузке каталога');
        }
    }

    /**
     * Get featured products for homepage
     */
    public function featured(): JsonResponse
    {
        try {
            $products = Product::where('status', 'active')
                ->where('featured', true)
                ->with('category')
                ->with($this->getActivePromotionsRelation())
                ->select('id', 'name', 'slug', 'price', 'image', 'category_id', 
                        'rating', 'stock')
                ->take(4)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $products
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse($e, 'при загрузке избранных товаров');
        }
    }
    
    /**
     * Apply filters to the query
     */
    private function applyFilters($query, Request $request): void
    {
        // Фильтр по категории
        if ($request->filled('category')) {
            $categoryId = (int)$request->category;
            $category = Category::find($categoryId);

            if ($category) {
                if ($category->parent_id === null) {
                    // Если это родительская категория, включаем все подкатегории
                    $subcategories = Category::where('parent_id', $categoryId)->pluck('id')->toArray();
                    $allCategories = array_merge([$categoryId], $subcategories);
                    $query->whereIn('category_id', $allCategories);
                } else {
                    // Если это подкатегория, фильтруем только по ней
                    $query->where('category_id', $categoryId);
                }
            }
        }

        // Фильтр по диапазону цен
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Фильтр по производителям
        if ($request->filled('manufacturers')) {
            $manufacturers = explode(',', $request->manufacturers);
            if (!empty($manufacturers)) {
                $query->whereIn('manufacturer', $manufacturers);
            }
        }
    }
    
    /**
     * Apply sorting to the query
     */
    private function applySorting($query, Request $request): void
    {
        if ($request->filled('sort')) {
            switch ($request->sort) {
                case 'price-asc':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price-desc':
                    $query->orderBy('price', 'desc');
                    break;
                case 'name-asc':
                    $query->orderBy('name', 'asc');
                    break;
                case 'new':
                    $query->orderBy('created_at', 'desc');
                    break;
                default:
                    $query->orderBy('featured', 'desc')->orderBy('created_at', 'desc');
            }
        } else {
            // Default sorting - featured first, then newest
            $query->orderBy('featured', 'desc')->orderBy('created_at', 'desc');
        }
    }
    
    /**
     * Get active promotions relation
     */
    private function getActivePromotionsRelation(): array
    {
        return ['promotions' => function($query) {
            $query->where('is_active', true)
                ->where('start_date', '<=', now())
                ->where('end_date', '>=', now());
        }];
    }
    
    /**
     * Format error response
     */
    private function errorResponse(\Exception $e, string $context): JsonResponse
    {
        Log::error("Ошибка {$context}: " . $e->getMessage());
        
        return response()->json([
            'success' => false,
            'message' => "Ошибка {$context}"
        ], 500);
    }
}
