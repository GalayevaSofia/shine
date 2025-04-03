import React from 'react';
import { Link } from '@inertiajs/react';
import LoadingIndicator from '@/Components/UI/LoadingIndicator';

export default function WishlistItems({ 
    wishlistItems, 
    isLoading, 
    authStatus, 
    auth,
    calculateDiscount,
    handleAddToCart,
    removeFromWishlist,
    formatPrice,
    getImageUrl
}) {
    const GRADIENT_TEXT = "bg-size-200 animate-gradient bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent";

    if (isLoading) {
        return (
            <div className="relative z-10 py-6 sm:py-10 text-center">
                <LoadingIndicator size="medium" />
                <p className="mt-4 text-sm sm:text-base text-gray-600">
                    Загрузка...
                </p>
            </div>
        );
    }

    if (!authStatus.authenticated && !auth.user) {
        return (
            <div className="relative z-10 py-6 sm:py-10 text-center">
                <p className="mb-4 text-sm sm:text-base text-gray-600">
                    Для доступа к избранному необходимо
                    авторизоваться
                </p>
                <Link
                    href={route('login')}
                    className="bg-size-200 inline-block animate-gradient rounded-full bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] px-4 sm:px-6 py-2 text-xs sm:text-sm text-white shadow-md transition-all hover:opacity-95"
                >
                    Войти
                </Link>
            </div>
        );
    }

    if (wishlistItems.length === 0) {
        return (
            <div className="relative z-10 py-6 sm:py-10 text-center">
                <p className="text-sm sm:text-base text-gray-600">
                    В избранном пока нет товаров
                </p>
                <Link
                    href={route('catalog')}
                    className="bg-size-200 mt-4 inline-block animate-gradient rounded-full bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] px-4 sm:px-6 py-2 text-xs sm:text-sm text-white shadow-md transition-all hover:opacity-95"
                >
                    Перейти в каталог
                </Link>
            </div>
        );
    }

    // Log the first item structure to debug
    console.log('First wishlist item structure:', wishlistItems[0]);

    return (
        <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-lg">
                <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#B86FBF]/10 via-[#8072DB]/10 to-[#5A8BEA]/10 opacity-70 blur-xl"></div>
                <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#B86FBF]/10 via-[#8072DB]/10 to-[#5A8BEA]/10 opacity-70 blur-xl"></div>

                <h2 className="relative z-10 mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-gray-900">
                    Избранные{' '}
                    <span className={GRADIENT_TEXT}>товары</span>
                </h2>

                <div className="relative z-10 grid grid-cols-1 gap-3 sm:gap-4 md:gap-6 sm:grid-cols-2">
                    {wishlistItems.map((item, index) => {
                        // Fix the way we access the product data
                        const product = item.product || {}; // Ensure product exists
                        const productId = item.product_id || product.id || 0;
                        
                        return (
                        <div
                            key={`wishlist-item-${productId}`}
                            className="flex flex-col sm:flex-row overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-[#8072DB]/20 hover:shadow-md"
                            style={{
                                transitionDelay: `${index * 100}ms`,
                            }}
                        >
                            <div className="w-full sm:w-32 h-32 sm:h-32 flex-shrink-0 overflow-hidden">
                                <Link href={`/products/${product.id}`}>
                                    <img
                                        src={getImageUrl(product.image)}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/no-image.svg';
                                        }}
                                    />
                                </Link>
                            </div>
                            <div className="flex-grow p-3 sm:p-4">
                                <div className="flex flex-col sm:flex-row sm:justify-between">
                                    <h3 className="font-medium text-gray-900 transition-all hover:bg-gradient-to-r hover:from-[#B86FBF] hover:via-[#8072DB] hover:to-[#5A8BEA] hover:bg-clip-text hover:text-transparent line-clamp-1">
                                        <Link href={`/products/${product.id}`}>
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 sm:mt-0 font-bold text-[#8072DB]">
                                        {(() => {
                                            const discount = calculateDiscount(product);
                                            if (discount) {
                                                return (
                                                    <>
                                                        <span className="font-bold text-[#8072DB]">
                                                            {formatPrice(discount.discountPrice)}
                                                        </span>
                                                        <span className="ml-2 text-sm text-gray-500 line-through">
                                                            {formatPrice(product.price)}
                                                        </span>
                                                    </>
                                                );
                                            } else {
                                                return formatPrice(product.price);
                                            }
                                        })()}
                                    </p>
                                </div>
                                <p className="mt-1 line-clamp-1 text-xs sm:text-sm text-gray-600">
                                    {product.description}
                                </p>
                                <div className="mt-2 sm:mt-3 flex flex-wrap gap-2 sm:gap-0 sm:flex-nowrap justify-between">
                                    <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:space-x-3">
                                        <Link
                                            href={`/products/${product.id}`}
                                            className="rounded-lg border border-[#8072DB]/30 px-2 sm:px-3 py-1 text-xs sm:text-sm text-[#8072DB] transition-all hover:bg-[#8072DB] hover:text-white"
                                        >
                                            Подробнее
                                        </Link>
                                        <button
                                            onClick={() => handleAddToCart(product.id, product.name)}
                                            className="rounded-lg bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] px-2 sm:px-3 py-1 text-xs sm:text-sm text-white shadow-sm transition-all hover:opacity-90"
                                        >
                                            В корзину
                                        </button>
                                    </div>
                                    <div className="flex items-center w-full sm:w-auto justify-between sm:justify-normal mt-2 sm:mt-0">
                                        {(() => {
                                            const discount = calculateDiscount(product);
                                            if (discount) {
                                                return (
                                                    <span className="mr-2 bg-red-100 text-red-800 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                                                        -{discount.discountPercent}%
                                                    </span>
                                                );
                                            }
                                            return null;
                                        })()}
                                        <button
                                            onClick={() => removeFromWishlist(productId)}
                                            className="text-xs sm:text-sm text-red-500 transition-colors hover:text-red-600"
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </div>
    );
} 