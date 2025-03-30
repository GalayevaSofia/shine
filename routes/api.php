<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\HomeController;
// use App\Http\Controllers\ReviewController; // Commented out as reviews functionality is removed
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\CheckoutController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public routes
Route::get('/home', [HomeController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'all']);
Route::get('/categories/featured', [CategoryController::class, 'featured']);
Route::get('/products', [ProductController::class, 'catalog']);
Route::get('/products/featured', [ProductController::class, 'featured']);
Route::get('/products/{id}', [ProductController::class, 'details']);
Route::get('/products/{id}/related', [ProductController::class, 'related']);
Route::get('/categories/{slug}/products', [ProductController::class, 'byCategory']);
// Route::get('/products/{productId}/reviews', [ReviewController::class, 'index']); // Commented out as reviews functionality is removed
Route::get('/search', [SearchController::class, 'search']);

// Акции (Promotions)
Route::get('/promotions', [PromotionController::class, 'index']);
Route::get('/promotions/{slug}', [PromotionController::class, 'show']);

// Маршрут для проверки аутентификации
Route::get('/auth/check', function () {
    return response()->json([
        'authenticated' => auth()->check(),
        'user' => auth()->check() ? auth()->user() : null
    ], 200);
});

// Cart routes - no auth required, the controller handles both authenticated and guest users
Route::middleware(['web'])->group(function () {
    Route::get('/cart', [CartController::class, 'index'])->withoutMiddleware(['auth:sanctum']);
    Route::post('/cart/add', [CartController::class, 'addItem'])->withoutMiddleware(['auth:sanctum']);
    Route::post('/cart/update', [CartController::class, 'updateCartItem'])->withoutMiddleware(['auth:sanctum']);
    Route::post('/cart/remove', [CartController::class, 'removeItem'])->withoutMiddleware(['auth:sanctum']);
    Route::post('/cart/clear', [CartController::class, 'clearCart'])->withoutMiddleware(['auth:sanctum']);

    // Add debug route for testing cart
    Route::get('/cart/debug', function() {
        $controller = new \App\Http\Controllers\CartController();
        $cart = $controller->index();
        return $cart;
    });

    // Тестовые маршруты для отладки
    Route::post('/test/set-discount', [CartController::class, 'testSetDiscount']);
    
    // Тестовый маршрут для вывода всех переменных корзины
    Route::get('/cart/debug-full', function() {
        $controller = new \App\Http\Controllers\CartController();
        $result = $controller->index();
        
        // Преобразуем ответ в массив
        $responseData = json_decode($result->getContent(), true);
        
        // Получаем корзину и товары
        $cart = $responseData['cart'] ?? [];
        $items = $responseData['items'] ?? [];
        
        // Добавляем дополнительную отладочную информацию
        foreach ($items as &$item) {
            if (isset($item['product'])) {
                // Выводим все поля продукта
                \Illuminate\Support\Facades\Log::info('Товар в отладке:', [
                    'ID' => $item['product']['id'] ?? 'нет',
                    'Название' => $item['product']['name'] ?? 'нет',
                    'Цена' => $item['product']['price'] ?? 'нет',
                    'Лучшая цена' => $item['product']['best_price'] ?? 'нет',
                    'Оригинальная цена' => $item['product']['original_price'] ?? 'нет',
                    'Скидка' => $item['product']['discount_percentage'] ?? 'нет',
                    'Промоакция' => $item['product']['promotion_name'] ?? 'нет'
                ]);
            }
        }
        
        return response()->json([
            'cart' => $cart,
            'items' => $items,
            'server_time' => now(),
            'php_version' => phpversion(),
            'session_id' => session()->getId()
        ]);
    });
});

// Catalog routes
Route::get('/catalog', [CatalogController::class, 'index']);
Route::get('/catalog/featured', [CatalogController::class, 'featured']);

// Protected routes
Route::middleware(['auth:sanctum', 'web'])->group(function () {
    // User orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders/{id}/cancel', [OrderController::class, 'cancel']);

    // Reviews - commented out as reviews functionality is removed
    // Route::post('/products/{productId}/reviews', [ReviewController::class, 'store']);
    // Route::put('/products/{productId}/reviews/{reviewId}', [ReviewController::class, 'update']);
    // Route::delete('/products/{productId}/reviews/{reviewId}', [ReviewController::class, 'destroy']);

    // Wishlist routes
    Route::get('/wishlist', [WishlistController::class, 'index']);
    Route::post('/wishlist/{productId}', [WishlistController::class, 'store']);
    Route::delete('/wishlist/{productId}', [WishlistController::class, 'destroy']);
    Route::get('/wishlist/check/{productId}', [WishlistController::class, 'check']);
    Route::get('/wishlist/check-batch', [WishlistController::class, 'checkBatch']);

    Route::get('/auth/check', function () {
        return response()->json(['authenticated' => true]);
    });
});

// Admin routes
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Categories
    Route::apiResource('categories', CategoryController::class);

    // Products
    Route::apiResource('products', ProductController::class);

    // Orders
    Route::get('/orders', [OrderController::class, 'adminIndex']);
    Route::get('/orders/{id}', [OrderController::class, 'adminShow']);
    Route::put('/orders/{id}', [OrderController::class, 'adminUpdate']);

    // Reviews - commented out as reviews functionality is removed
    // Route::get('/reviews', [ReviewController::class, 'adminIndex']);
    // Route::put('/reviews/{reviewId}/status', [ReviewController::class, 'adminUpdateStatus']);
});

// Add a debug route for product listing
Route::get('/products/debug', function() {
    return \App\Models\Product::with('category')->limit(5)->get();
});
