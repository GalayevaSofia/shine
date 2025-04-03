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
                ->where('stock', '>', 0)
                ->with('category')
                ->with($this->getActivePromotionsRelation())
                ->select('id', 'name', 'slug', 'price', 'image', 'category_id', 
                        'rating', 'stock')
                ->take(5)
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
        // Добавляем логи для всех параметров запроса
        Log::info('CatalogController: Применяемые фильтры', [
            'все_параметры' => $request->all(),
            'manufacturer' => $request->input('manufacturer', 'не указан'),
            'search' => $request->input('search', 'не указан'),
            'in_stock' => $request->boolean('in_stock') ? 'да' : 'нет',
            'new_products' => $request->boolean('new_products') ? 'да' : 'нет'
        ]);

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
        if ($request->filled('manufacturer')) {
            $manufacturer = $request->manufacturer;
            Log::info('Применение фильтра по производителю', [
                'значение' => $manufacturer,
                'тип' => gettype($manufacturer)
            ]);

            if (strpos($manufacturer, ',') !== false) {
                // Если несколько производителей через запятую
                $manufacturers = array_map('trim', explode(',', $manufacturer));
                Log::info('Найдены производители', ['список' => $manufacturers]);
                
                $query->where(function($q) use ($manufacturers) {
                    foreach ($manufacturers as $brand) {
                        if (empty($brand)) continue;
                        Log::info('Добавляем условие для производителя', ['бренд' => $brand]);
                        $q->orWhere('manufacturer', 'like', "%{$brand}%");
                    }
                });
            } else {
                // Один производитель
                Log::info('Один производитель', ['бренд' => $manufacturer]);
                $query->where('manufacturer', 'like', "%{$manufacturer}%");
            }
            
            // Выводим SQL-запрос для отладки
            Log::info('SQL запрос после фильтра по производителю', [
                'sql' => $query->toSql(),
                'bindings' => $query->getBindings()
            ]);
        }

        // Фильтр по поиску
        if ($request->filled('search')) {
            $search = $request->search;
            Log::info('Применение фильтра по поиску', [
                'значение' => $search,
                'тип' => gettype($search)
            ]);
            
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('manufacturer', 'like', "%{$search}%");
            });
            
            // Выводим SQL-запрос для отладки
            Log::info('SQL запрос после фильтра по поиску', [
                'sql' => $query->toSql(),
                'bindings' => $query->getBindings()
            ]);
        }

        // Фильтр по наличию товара
        if ($request->boolean('in_stock')) {
            Log::info('Применение фильтра по наличию (in_stock)');
            $query->where('stock', '>', 0);
        }

        // Фильтр по новинкам
        if ($request->boolean('new_products')) {
            Log::info('Применение фильтра по новинкам (new_products)');
            $query->where('created_at', '>=', now()->subDays(30));
        }
    }
    
    /**
     * Apply sorting to the query
     */
    private function applySorting($query, Request $request): void
    {
        Log::info('CatalogController: Применяемая сортировка', [
            'sort_by' => $request->input('sort_by', 'не указан'),
            'sort_dir' => $request->input('sort_dir', 'не указан'),
            'все_параметры' => $request->all()
        ]);

        if ($request->filled('sort_by')) {
            $sortDirection = $request->input('sort_dir', 'asc');
            if (!in_array($sortDirection, ['asc', 'desc'])) {
                $sortDirection = 'asc';
            }

            // Поддерживаемые варианты сортировки
            $allowedSorts = [
                'price' => 'price',
                'name' => 'name',
                'rating' => 'rating',
                'popularity' => 'featured', // Популярность соответствует featured
                'created_at' => 'created_at' // Добавляем сортировку по дате создания
            ];

            $sortColumn = $allowedSorts[$request->sort_by] ?? 'created_at';
            Log::info('Сортировка по колонке', [
                'колонка' => $sortColumn,
                'направление' => $sortDirection
            ]);
            
            $query->orderBy($sortColumn, $sortDirection);
            
            // Если сортировка не по featured, добавляем вторичную сортировку по featured
            if ($sortColumn !== 'featured') {
                $query->orderBy('featured', 'desc');
            }
        } else if ($request->filled('sort')) {
            // Обратная совместимость со старым параметром sort
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
        
        // Выводим SQL-запрос для отладки сортировки
        Log::info('SQL запрос после применения сортировки', [
            'sql' => $query->toSql(),
            'bindings' => $query->getBindings()
        ]);
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
