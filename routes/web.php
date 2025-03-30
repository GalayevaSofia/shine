<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PromotionController;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('/catalog', function () {
    // Get initial products
    $controller = new \App\Http\Controllers\ProductController();
    $response = $controller->catalog(request());
    $data = json_decode($response->getContent(), true);

    return Inertia::render('Catalog', [
        'initialProducts' => $data['data']['products'],
        'filters' => request()->only([
            'category', 'min_price', 'max_price', 'manufacturer',
            'in_stock', 'new_products', 'rating',
            'sort_by', 'sort_dir', 'search'
        ])
    ]);
})->name('catalog');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/contacts', function () {
    return Inertia::render('Contacts');
})->name('contacts');

Route::get('/delivery', function () {
    return Inertia::render('Delivery');
})->name('delivery');

Route::get('/payment', function () {
    return Inertia::render('Payment');
})->name('payment');

Route::get('/privacy', function () {
    return Inertia::render('Privacy');
})->name('privacy');

Route::get('/terms', function () {
    return Inertia::render('Terms');
})->name('terms');

Route::get('/cart', function () {
    return Inertia::render('Cart');
})->name('cart');

Route::get('/checkout', function () {
    return Inertia::render('Checkout');
})->middleware(['auth'])->name('checkout');

Route::get('/products/{idOrSlug}', function ($idOrSlug) {
    try {
        // Get product directly from the controller
        $controller = new \App\Http\Controllers\ProductController();
        $response = $controller->details($idOrSlug);

        // Convert response to array properly
        $responseData = json_decode($response->getContent(), true);

        // Check if the response was successful
        if (!$responseData['success']) {
            return Inertia::render('ProductDetail', [
                'product' => null,
                'error' => $responseData['message']
            ]);
        }

        $product = $responseData['product'] ?? null;
        $relatedProducts = $responseData['relatedProducts'] ?? [];

        if (!$product) {
            return Inertia::render('ProductDetail', [
                'product' => null,
                'error' => 'Товар не найден'
            ]);
        }

        return Inertia::render('ProductDetail', [
            'product' => $product,
            'relatedProducts' => $relatedProducts
        ]);
    } catch (\Exception $e) {
        \Illuminate\Support\Facades\Log::error('Ошибка при рендеринге страницы товара: ' . $e->getMessage());
        return Inertia::render('ProductDetail', [
            'product' => null,
            'error' => 'Произошла ошибка при загрузке товара'
        ]);
    }
})->name('product.detail');

Route::middleware('auth')->group(function () {
    Route::get('/profile', function () {
        return Inertia::render('Profile', [
            'initialTab' => request('initialTab', 'profile')
        ]);
    })->name('profile');

    Route::get('/wishlist', function () {
        return Inertia::render('Profile', [
            'initialTab' => 'wishlist'
        ]);
    })->name('wishlist');

    Route::get('/dashboard', function () {
        return Inertia::render('Profile');
    })->name('dashboard');

    // Профиль
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Заказы
    Route::get('/api/orders', [App\Http\Controllers\OrderController::class, 'index'])
        ->name('account.orders.index');

    Route::post('/account/orders', [App\Http\Controllers\CheckoutController::class, 'store'])
        ->name('account.orders.store');
});

// Админка
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::get('/products', function () {
        return Inertia::render('Admin/Products');
    })->name('products');

    Route::get('/orders', function () {
        return Inertia::render('Admin/Orders');
    })->name('orders');

    Route::get('/users', function () {
        return Inertia::render('Admin/Users');
    })->name('users');
});

Route::get('/promotions', function () {
    // Get initial promotions
    $controller = new \App\Http\Controllers\PromotionController();
    $response = $controller->index();
    $data = json_decode($response->getContent(), true);

    return Inertia::render('Promotions', [
        'initialPromotions' => $data['data']['promotions'] ?? []
    ]);
})->name('promotions');

Route::get('/promotions/{slug}', function ($slug) {
    try {
        // Get promotion directly from the controller
        $controller = new \App\Http\Controllers\PromotionController();
        $response = $controller->show($slug);
        
        // Convert response to array
        $responseData = json_decode($response->getContent(), true);
        
        // Check if the response was successful
        if (!$responseData['success']) {
            return Inertia::render('PromotionDetail', [
                'promotion' => null,
                'error' => $responseData['message']
            ]);
        }
        
        $promotion = $responseData['data']['promotion'] ?? null;
        
        if (!$promotion) {
            return Inertia::render('PromotionDetail', [
                'promotion' => null,
                'error' => 'Акция не найдена'
            ]);
        }
        
        return Inertia::render('PromotionDetail', [
            'promotion' => $promotion
        ]);
    } catch (\Exception $e) {
        \Illuminate\Support\Facades\Log::error('Ошибка при рендеринге страницы акции: ' . $e->getMessage());
        return Inertia::render('PromotionDetail', [
            'promotion' => null,
            'error' => 'Произошла ошибка при загрузке акции'
        ]);
    }
})->name('promotion.detail');

Route::prefix('api')->group(function () {
    Route::get('/catalog', [ProductController::class, 'catalog']);
    Route::get('/categories/featured', [CategoryController::class, 'featured']);
    Route::get('/promotions', [PromotionController::class, 'index']);
    Route::get('/promotions/{slug}', [PromotionController::class, 'show']);
});

require __DIR__.'/auth.php';
