<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\HomeController;
// use App\Http\Controllers\ReviewController; // Commented out as reviews functionality is removed
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\PromotionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

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

// Акции (Promotions)
Route::get('/promotions', [PromotionController::class, 'index']);
Route::get('/promotions/{slug}', [PromotionController::class, 'show']);

// Маршрут для проверки аутентификации
Route::get('/auth/check', function () {
    return response()->json([
        'authenticated' => Auth::check(),
        'user' => Auth::check() ? Auth::user() : null
    ], 200);
});

// Cart routes - no auth required, the controller handles both authenticated and guest users
Route::middleware(['web'])->group(function () {
    Route::get('/cart', [CartController::class, 'index'])->withoutMiddleware(['auth:sanctum']);
    Route::post('/cart/add', [CartController::class, 'addItem'])->withoutMiddleware(['auth:sanctum']);
    Route::post('/cart/update', [CartController::class, 'updateCartItem'])->withoutMiddleware(['auth:sanctum']);
    Route::post('/cart/remove', [CartController::class, 'removeItem'])->withoutMiddleware(['auth:sanctum']);
    Route::post('/cart/clear', [CartController::class, 'clearCart'])->withoutMiddleware(['auth:sanctum']);
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
});

// Удалена группа маршрутов для админ-панели, так как функционал не будет реализован
