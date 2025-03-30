import React, { memo, useMemo } from 'react';
import { usePage } from '@inertiajs/react';
import { useWishlist } from '@/hooks/useWishlist';

/**
 * Кнопка добавления/удаления товара из избранного
 */
const WishlistButton = memo(({ productId, className = '' }) => {
    // Безопасная обработка входных параметров
    const safeProductId = productId || 0;
    
    // Если ID товара не указан или некорректный, не рендерим кнопку
    if (!safeProductId || safeProductId <= 0) {
        return null;
    }
    
    const { auth = {} } = usePage().props || {};
    const isAuthenticated = auth.user !== null;

    // Если пользователь не авторизован, не отображаем кнопку
    if (!isAuthenticated) {
        return null;
    }
    
    // Генерируем уникальный ID для градиента SVG, чтобы избежать конфликтов
    const gradientId = useMemo(() => `heartFillGradient_${safeProductId}`, [safeProductId]);
    
    // Используем кастомный хук для работы с избранным
    const { isInWishlist, isLoading, toggleWishlist } = useWishlist(safeProductId);

    return (
        <button
            onClick={toggleWishlist}
            disabled={isLoading}
            className={`transition-colors ${className}`}
            title={isInWishlist ? "Удалить из избранного" : "Добавить в избранное"}
            aria-label={isInWishlist ? "Удалить из избранного" : "Добавить в избранное"}
        >
            {isInWishlist ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                    <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(45)">
                            <stop offset="0%" stopColor="#B86FBF" />
                            <stop offset="50%" stopColor="#8072DB" />
                            <stop offset="100%" stopColor="#5A8BEA" />
                        </linearGradient>
                    </defs>
                    <path 
                        d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" 
                        fill={`url(#${gradientId})`} 
                        className="animate-pulse" 
                    />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} className="w-6 h-6 transition-all duration-300 ease-in-out hover:scale-110">
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
                        stroke="#B86FBF"
                        className="hover:stroke-[#5A8BEA] transition-colors duration-300" 
                    />
                </svg>
            )}
        </button>
    );
});

export default WishlistButton;