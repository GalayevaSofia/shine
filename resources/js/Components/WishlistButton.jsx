import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useForm, usePage } from '@inertiajs/react';
import debounce from 'lodash/debounce';

// Global wishlist status cache
const wishlistCache = new Map();
let csrfTokenInitialized = false;
let checkingCsrfToken = false;
let pendingStatusChecks = new Map();

export default function WishlistButton({ productId, className = '' }) {
    // Безопасная обработка входных параметров
    const safeProductId = productId || 0;
    
    // Если ID товара не указан или некорректный, не рендерим кнопку
    if (!safeProductId || safeProductId <= 0) {
        return null;
    }
    
    const { auth = {} } = usePage().props || {};
    const [isInWishlist, setIsInWishlist] = useState(wishlistCache.has(safeProductId) ? wishlistCache.get(safeProductId) : false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(auth.user !== null);
    const { post } = useForm();

    // Если пользователь не авторизован, не отображаем кнопку
    if (!isAuthenticated) {
        return null;
    }

    // Инициализация CSRF токена один раз для всех компонентов
    const initializeCsrfToken = useCallback(async () => {
        if (csrfTokenInitialized || checkingCsrfToken) return Promise.resolve();
        
        checkingCsrfToken = true;
        try {
            await axios.get('/sanctum/csrf-cookie');
            csrfTokenInitialized = true;
            return Promise.resolve();
        } catch (error) {
            console.error('Error getting CSRF token:', error);
            return Promise.reject(error);
        } finally {
            checkingCsrfToken = false;
        }
    }, []);

    // Ленивая проверка статуса wishlist с debounce
    const debouncedCheckWishlistStatus = useCallback(
        debounce(async (productIds) => {
            if (!isAuthenticated || productIds.length === 0) return;
            
            try {
                // Для одиночного ID используем обычный запрос
                if (productIds.length === 1) {
                    const pid = productIds[0];
                    const response = await axios.get(`/api/wishlist/check/${pid}`);
                    if (response.data.success) {
                        wishlistCache.set(pid, response.data.inWishlist);
                        if (pid === safeProductId) {
                            setIsInWishlist(response.data.inWishlist);
                        }
                    }
                    pendingStatusChecks.delete(pid);
                } 
                // Для множественных ID используем batch-запрос
                else if (productIds.length > 1) {
                    try {
                        const response = await axios.get('/api/wishlist/check-batch', {
                            params: { ids: productIds.join(',') }
                        });
                        
                        if (response.data.success && response.data.items) {
                            // Обновляем кэш и состояние компонента если нужно
                            Object.entries(response.data.items).forEach(([pid, status]) => {
                                const numericPid = Number(pid);
                                wishlistCache.set(numericPid, status);
                                if (numericPid === safeProductId) {
                                    setIsInWishlist(status);
                                }
                                pendingStatusChecks.delete(numericPid);
                            });
                        }
                    } catch (batchError) {
                        console.warn('Batch wishlist check failed, falling back to individual check:', batchError);
                        
                        // If batch check fails but we need the status for our product ID,
                        // fall back to individual check just for this component's product
                        if (productIds.includes(safeProductId)) {
                            try {
                                const response = await axios.get(`/api/wishlist/check/${safeProductId}`);
                                if (response.data.success) {
                                    wishlistCache.set(safeProductId, response.data.inWishlist);
                                    setIsInWishlist(response.data.inWishlist);
                                }
                            } catch (singleCheckError) {
                                console.error('Single wishlist check also failed:', singleCheckError);
                            }
                        }
                        
                        // Clear all pending checks to avoid hanging states
                        productIds.forEach(pid => pendingStatusChecks.delete(pid));
                    }
                }
            } catch (error) {
                console.error('Error checking wishlist status:', error);
                productIds.forEach(pid => pendingStatusChecks.delete(pid));
            }
        }, 300),
        [isAuthenticated, safeProductId]
    );

    // Запуск проверки статуса
    const checkWishlistStatus = useCallback(async () => {
        if (!isAuthenticated || safeProductId <= 0) return;
        
        // Проверяем кэш сначала
        if (wishlistCache.has(safeProductId)) {
            setIsInWishlist(wishlistCache.get(safeProductId));
            return;
        }
        
        // Если проверка уже в процессе, не дублируем запрос
        if (pendingStatusChecks.has(safeProductId)) return;
        
        // Помечаем как "в процессе проверки"
        pendingStatusChecks.set(safeProductId, true);
        
        // Собираем ID товаров, которые нужно проверить
        const idsToCheck = [...pendingStatusChecks.keys()];
        
        // Запускаем отложенную проверку
        debouncedCheckWishlistStatus(idsToCheck);
    }, [isAuthenticated, safeProductId, debouncedCheckWishlistStatus]);

    // Загрузка начального состояния
    useEffect(() => {
        let isMounted = true;
        
        const loadInitialState = async () => {
            try {
                // Проверяем кэш сначала
                if (wishlistCache.has(safeProductId)) {
                    if (isMounted) {
                        setIsInWishlist(wishlistCache.get(safeProductId));
                    }
                    return;
                }
                
                // Если пользователь авторизован, проверяем статус wishlist
                if (isAuthenticated) {
                    // Проверяем статус wishlist вне критического пути загрузки с таймаутом
                    setTimeout(() => {
                        if (isMounted) {
                            checkWishlistStatus();
                        }
                    }, 200);
                }
            } catch (error) {
                console.error('Error loading wishlist state:', error);
            }
        };
        
        loadInitialState();
        
        // Cleanup function
        return () => {
            isMounted = false;
            // Отменяем debounced проверку, если компонент размонтирован
            debouncedCheckWishlistStatus.cancel();
        };
    }, [isAuthenticated, safeProductId, checkWishlistStatus, debouncedCheckWishlistStatus]);

    const toggleWishlist = async () => {
        if (!isAuthenticated) {
            // Redirect to login page
            post(route('login'));
            return;
        }

        setIsLoading(true);
        try {
            // Инициализируем CSRF токен если нужно
            await initializeCsrfToken();
            
            if (isInWishlist) {
                const response = await axios.delete(`/api/wishlist/${safeProductId}`);
                if (response.data.success) {
                    setIsInWishlist(false);
                    wishlistCache.set(safeProductId, false);
                }
            } else {
                try {
                    const response = await axios.post(`/api/wishlist/${safeProductId}`);
                    if (response.data.success) {
                        setIsInWishlist(true);
                        wishlistCache.set(safeProductId, true);
                    }
                } catch (addError) {
                    // Check if this is a "already in wishlist" error (400)
                    if (addError.response && addError.response.status === 400) {
                        // If the item is already in wishlist, update our state to match
                        setIsInWishlist(true);
                        wishlistCache.set(safeProductId, true);
                        // This is not really an error, so we don't need to report it
                        console.debug('Item already in wishlist, updated state');
                    } else {
                        // For other errors, re-throw to be caught by the outer catch
                        throw addError;
                    }
                }
            }
        } catch (error) {
            console.error('Error updating wishlist:', error);
            // Проверяем, связана ли ошибка с аутентификацией
            if (error.response && error.response.status === 401) {
                post(route('login'));
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={toggleWishlist}
            disabled={isLoading}
            className={`transition-colors ${className}`}
            title={isInWishlist ? "Удалить из избранного" : "Добавить в избранное"}
        >
            {isInWishlist ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                    <defs>
                        <linearGradient id="heartFillGradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(45)">
                            <stop offset="0%" stopColor="#B86FBF" />
                            <stop offset="50%" stopColor="#8072DB" />
                            <stop offset="100%" stopColor="#5A8BEA" />
                        </linearGradient>
                    </defs>
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" 
                          fill="url(#heartFillGradient)" 
                          className="animate-pulse" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} className="w-6 h-6 transition-all duration-300 ease-in-out hover:scale-110">
                    <path strokeLinecap="round" strokeLinejoin="round" 
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
                          stroke="#B86FBF"
                          className="hover:stroke-[#5A8BEA] transition-colors duration-300" />
                </svg>
            )}
        </button>
    );
}