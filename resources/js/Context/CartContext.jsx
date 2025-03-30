import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
// Импортируем функцию форматирования цены из модуля форматтеров
import { formatPrice } from '@/utils';

// Создаем контекст корзины
const CartContext = createContext();

// Хук для использования контекста корзины
export function useCart() {
    return useContext(CartContext);
}

// Провайдер контекста корзины для обертывания приложения
export function CartProvider({ children }) {
    const [cart, setCart] = useState({ items: [] });
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Обновляем расчет общей стоимости корзины
    const calculateTotal = (items) => {
        return items.reduce((total, item) => {
            const product = item.product;
            if (!product) return total;
            
            // Проверяем наличие акционной цены через связь с промоакциями
            let promotionalPrice = null;
            
            // Проверяем связь с промоакциями
            if (product.promotions && Array.isArray(product.promotions) && product.promotions.length > 0) {
                // Берем первую активную акцию
                const activePromotion = product.promotions.find(
                    promo => promo.is_active && promo.pivot && promo.pivot.promotional_price
                );
                
                if (activePromotion && activePromotion.pivot.promotional_price) {
                    promotionalPrice = activePromotion.pivot.promotional_price;
                }
            }
            
            // Если не нашли цену через связь, проверяем поля best_price и original_price
            let finalPrice;
            if (promotionalPrice !== null) {
                finalPrice = promotionalPrice;
            } else if (product.best_price !== undefined && product.best_price !== null) {
                finalPrice = parseFloat(product.best_price);
            } else {
                finalPrice = parseFloat(product.price || 0);
            }
            
            // Если цена не определена или NaN, используем 0
            const safePrice = (!finalPrice || isNaN(finalPrice)) ? 0 : finalPrice;
            const safeQuantity = (!item.quantity || isNaN(item.quantity)) ? 0 : item.quantity;
            
            return total + (safePrice * safeQuantity);
        }, 0);
    };

    // Функция для обновления счетчиков без перерендеривания всей корзины
    const updateCounters = useCallback((cartData) => {
        if (!cartData || !cartData.items) return;

        // Используем нашу функцию calculateTotal для последовательного расчета цены
        const price = calculateTotal(cartData.items);
        setTotalPrice(price);
    }, []);

    // Загружаем данные корзины при монтировании компонента
    useEffect(() => {
        fetchCart();
    }, []);

    // Получение корзины с API
    const fetchCart = async () => {
        try {
            setLoading(true);

            try {
                // Получаем CSRF-токен для поддержания сессии
                await axios.get('/sanctum/csrf-cookie');

                try {
                    // Проверяем статус авторизации
                    await axios.get('/api/auth/check');
                } catch (authError) {
                    // Продолжаем выполнение, так как корзина должна работать и для гостей
                }

                // Устанавливаем параметры запроса
                const config = {
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-Guest-Cart': 'true'
                    }
                };

                // Выполняем запрос к API корзины
                const response = await axios.get('/api/cart', config);

                if (response.data && response.data.success) {
                    // Обработка данных корзины перед сохранением
                    const items = response.data.items || [];
                    
                    // Просто используем данные с сервера без дополнительной обработки
                    const cartData = {
                        ...response.data.cart,
                        items: items,
                    };
                    
                    // Устанавливаем корзину
                    setCart(cartData);
                } else {
                    // Инициализируем пустую корзину в этом случае
                    setCart({ items: [] });
                }
                setError(null);
            } catch (err) {
                console.error('Ошибка загрузки корзины:', err);
                
                setError(`Не удалось загрузить корзину: ${err.message}`);
                
                // Инициализируем пустую корзину при ошибке
                setCart({ items: [] });
            } finally {
                setLoading(false);
            }
        } catch (err) {
            console.error('Неожиданная ошибка:', err);
            setError('Произошла непредвиденная ошибка');
            setLoading(false);
            
            // Инициализируем пустую корзину
            setCart({ items: [] });
        }
    };

    // Добавление товара в корзину
    const addToCart = async (productId, quantity = 1) => {
        try {
            // Получаем CSRF-токен для поддержания сессии
            await axios.get('/sanctum/csrf-cookie');
            
            // Устанавливаем параметры запроса
            const config = {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-Guest-Cart': 'true'
                }
            };
            
            const response = await axios.post(
                '/api/cart/add',
                {
                    product_id: productId,
                    quantity: quantity,
                },
                config
            );

            if (response.data && response.data.success) {
                // Получаем элементы корзины непосредственно из ответа
                const items = response.data.cart?.items || [];
                
                // Только теперь обновляем корзину
                setCart({
                    ...response.data.cart,
                    items: items,
                });

                toast.success('Товар добавлен в корзину');
                return { success: true, message: 'Товар добавлен в корзину' };
            } else {
                console.error(
                    'Не удалось добавить товар в корзину:',
                    response.data,
                );
                toast.error(
                    response.data?.message || 'Ошибка добавления в корзину',
                );
                return (
                    response.data || {
                        success: false,
                        message: 'Ошибка добавления в корзину',
                    }
                );
            }
        } catch (err) {
            console.error('Ошибка при добавлении в корзину:', err);
            
            toast.error(`Ошибка при добавлении товара: ${err.message}`);
            return { success: false, message: 'Ошибка добавления в корзину' };
        }
    };

    // Установка корзины
    const setCartWithCount = (cartData) => {
        setCart(cartData);
        // Обновляем счетчик общей стоимости
        if (cartData && cartData.items) {
            updateCounters(cartData);
        }
    };

    // Обновление количества товара в корзине
    const updateCartItem = async (itemId, quantity) => {
        try {
            // Get cart_id and product_id from composite key
            const [cartId, productId] = itemId.split('-').map(Number);

            // Получаем CSRF-токен для поддержания сессии
            await axios.get('/sanctum/csrf-cookie');

            // Устанавливаем параметры запроса
            const config = {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-Guest-Cart': 'true'
                }
            };

            const response = await axios.post(
                '/api/cart/update',
                {
                    cart_id: cartId,
                    product_id: productId,
                    quantity: quantity,
                },
                config
            );

            if (response.data && response.data.success) {
                // Проверяем наличие данных о товарах и их промоакциях
                const items = response.data.items || [];
                
                // Если данные о промоакциях не вернулись с сервера, сохраняем существующие данные
                const updatedItems = items.map(newItem => {
                    // Ищем соответствующий товар в текущей корзине
                    const existingItem = cart.items.find(
                        item => item.product_id === newItem.product_id && item.cart_id === newItem.cart_id
                    );
                    
                    // Если промоакции не вернулись с сервера, но были до этого - сохраняем их
                    if (
                        existingItem && 
                        existingItem.product && 
                        existingItem.product.promotions && 
                        (!newItem.product.promotions || newItem.product.promotions.length === 0)
                    ) {
                        return {
                            ...newItem,
                            product: {
                                ...newItem.product,
                                promotions: existingItem.product.promotions,
                                best_price: existingItem.product.best_price,
                                original_price: existingItem.product.original_price
                            }
                        };
                    }
                    
                    return newItem;
                });

                // Затем обновляем корзину с сохраненными промоакциями
                setCart({
                    ...response.data.cart,
                    items: updatedItems,
                });

                toast.success('Корзина обновлена');
                return {
                    success: true,
                    message: 'Корзина успешно обновлена',
                };
            } else {
                toast.error(
                    response.data?.message || 'Ошибка обновления корзины',
                );
                return (
                    response.data || {
                        success: false,
                        message: 'Ошибка обновления корзины',
                    }
                );
            }
        } catch (err) {
            console.error('Ошибка при обновлении корзины:', err);
            
            toast.error(`Ошибка при обновлении корзины: ${err.message}`);
            return { success: false, message: 'Ошибка обновления корзины' };
        }
    };

    // Удаление товара из корзины
    const removeFromCart = async (itemId) => {
        try {
            // Get cart_id and product_id from composite key
            const [cartId, productId] = itemId.split('-').map(Number);

            // Получаем CSRF-токен для поддержания сессии
            await axios.get('/sanctum/csrf-cookie');

            // Устанавливаем параметры запроса
            const config = {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-Guest-Cart': 'true'
                }
            };

            const response = await axios.post(
                '/api/cart/remove',
                {
                    cart_id: cartId,
                    product_id: productId,
                },
                config
            );

            if (response.data && response.data.success) {
                // Получаем новые элементы корзины
                const items = response.data.items || [];
                
                // Если данные о промоакциях не вернулись с сервера, сохраняем существующие данные
                const updatedItems = items.map(newItem => {
                    // Ищем соответствующий товар в текущей корзине
                    const existingItem = cart.items.find(
                        item => item.product_id === newItem.product_id && item.cart_id === newItem.cart_id
                    );
                    
                    // Если промоакции не вернулись с сервера, но были до этого - сохраняем их
                    if (
                        existingItem && 
                        existingItem.product && 
                        existingItem.product.promotions && 
                        (!newItem.product.promotions || newItem.product.promotions.length === 0)
                    ) {
                        return {
                            ...newItem,
                            product: {
                                ...newItem.product,
                                promotions: existingItem.product.promotions,
                                best_price: existingItem.product.best_price,
                                original_price: existingItem.product.original_price
                            }
                        };
                    }
                    
                    return newItem;
                });
                
                // Обновляем корзину с сохраненными промоакциями
                setCart({
                    ...response.data.cart,
                    items: updatedItems
                });

                toast.success('Товар удален из корзины');
                return {
                    success: true,
                    message: 'Товар успешно удален из корзины',
                    items: updatedItems
                };
            } else {
                console.error(
                    'Не удалось удалить товар из корзины:',
                    response.data,
                );
                toast.error(
                    response.data?.message ||
                        'Не удалось удалить товар из корзины',
                );
                return (
                    response.data || {
                        success: false,
                        message: 'Не удалось удалить товар из корзины',
                    }
                );
            }
        } catch (err) {
            console.error('Ошибка при удалении из корзины:', err);
            
            toast.error('Произошла ошибка при удалении товара из корзины');
            return {
                success: false,
                message: 'Произошла ошибка при удалении товара из корзины',
                error: err.message,
            };
        }
    };

    // Очистка корзины
    const clearCart = async () => {
        try {
            setLoading(true);

            // Получаем CSRF-токен для поддержания сессии
            await axios.get('/sanctum/csrf-cookie');

            // Устанавливаем параметры запроса
            const config = {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-Guest-Cart': 'true'
                }
            };

            const response = await axios.post('/api/cart/clear', {}, config);

            if (response.data && response.data.success) {
                // Обновляем корзину
                setCart(response.data.cart || { items: [] });
                
                toast.success('Корзина очищена');
            } else {
                setError('Не удалось очистить корзину');
                toast.error('Не удалось очистить корзину');
            }
        } catch (error) {
            console.error('Ошибка при очистке корзины:', error);
            
            setError(`Ошибка при очистке корзины: ${error.message}`);
            toast.error(`Ошибка при очистке корзины: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Обновление корзины
    const refreshCart = async () => {
        try {
            setLoading(true);
            
            try {
                // Получаем CSRF-токен для поддержания сессии
                await axios.get('/sanctum/csrf-cookie');
                
                // Устанавливаем параметры запроса
                const config = {
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-Guest-Cart': 'true'
                    }
                };
                
                // Получаем содержимое корзины
                const response = await axios.get('/api/cart', config);
                
                // Проверка, что данные корзины были получены
                if (response.data && response.data.cart) {
                    // Обновляем стейт с корзиной
                    const cartData = response.data.cart;
                    const newItems = Array.isArray(cartData.items) ? cartData.items : [];
                    
                    // Если у нас уже есть данные о промоакциях, сохраняем их при обновлении
                    let updatedItems = newItems;
                    
                    // Если в текущей корзине уже есть товары с промоакциями
                    if (cart.items && cart.items.length > 0) {
                        updatedItems = newItems.map(newItem => {
                            // Ищем соответствующий товар в текущей корзине
                            const existingItem = cart.items.find(
                                item => item.product_id === newItem.product_id && item.cart_id === newItem.cart_id
                            );
                            
                            // Если промоакции не вернулись с сервера, но были до этого - сохраняем их
                            if (
                                existingItem && 
                                existingItem.product && 
                                existingItem.product.promotions && 
                                existingItem.product.promotions.length > 0 && 
                                (!newItem.product.promotions || newItem.product.promotions.length === 0)
                            ) {
                                return {
                                    ...newItem,
                                    product: {
                                        ...newItem.product,
                                        promotions: existingItem.product.promotions,
                                        best_price: existingItem.product.best_price,
                                        original_price: existingItem.product.original_price
                                    }
                                };
                            }
                            
                            return newItem;
                        });
                    }
                    
                    // Преобразуем cart в нужный формат для нашего состояния
                    setCart({
                        ...cartData,
                        items: updatedItems
                    });
                } else {
                    console.error(
                        'Запрос к API корзины не удался или вернул неожиданный формат:',
                        response.data,
                    );
                    
                    // Инициализируем пустую корзину в этом случае
                    setCart({ items: [] });
                }
                setError(null);
            } catch (err) {
                console.error('Ошибка загрузки корзины:', err);
                
                setError(`Не удалось загрузить корзину: ${err.message}`);
                
                // Инициализируем пустую корзину при ошибке
                setCart({ items: [] });
            } finally {
                setLoading(false);
            }
        } catch (err) {
            console.error('Неожиданная ошибка:', err);
            setError('Произошла непредвиденная ошибка');
            setLoading(false);
            
            // Инициализируем пустую корзину
            setCart({ items: [] });
        }
    };

    // Получение общей стоимости корзины
    const getCartTotal = () => {
        if (!cart || !cart.items || cart.items.length === 0) {
            return 0;
        }
        
        return cart.items.reduce((total, item) => {
            const product = item.product;
            
            if (!product) {
                return total;
            }
            
            // Проверяем наличие акционной цены через связь с промоакциями
            let promotionalPrice = null;
            let promotionName = '';
            
            // Проверяем связь с промоакциями
            if (product.promotions && Array.isArray(product.promotions) && product.promotions.length > 0) {
                // Берем первую активную акцию
                const activePromotion = product.promotions.find(
                    promo => promo.is_active && promo.pivot && promo.pivot.promotional_price
                );
                
                if (activePromotion && activePromotion.pivot.promotional_price) {
                    promotionalPrice = activePromotion.pivot.promotional_price;
                    promotionName = activePromotion.title || '';
                }
            }
            
            // Если не нашли цену через связь, проверяем поля best_price и original_price
            let finalPrice;
            if (promotionalPrice !== null) {
                finalPrice = promotionalPrice;
            } else if (product.best_price !== undefined && product.best_price !== null) {
                finalPrice = parseFloat(product.best_price);
            } else {
                finalPrice = parseFloat(product.price || 0);
            }
            
            // Если цена не определена или NaN, используем 0
            const safePrice = (!finalPrice || isNaN(finalPrice)) ? 0 : finalPrice;
            const safeQuantity = (!item.quantity || isNaN(item.quantity)) ? 0 : item.quantity;
            
            return total + (safePrice * safeQuantity);
        }, 0);
    };

    // Получение общей суммы скидки в корзине
    const getCartDiscount = () => {
        if (!cart || !cart.items || cart.items.length === 0) {
            return 0;
        }
        
        return cart.items.reduce((totalDiscount, item) => {
            const product = item.product;
            
            if (!product) {
                return totalDiscount;
            }
            
            // Получаем обычную цену без скидки
            const regularPrice = parseFloat(product.price || 0);
            
            // Проверяем наличие акционной цены через связь с промоакциями
            let discountedPrice = regularPrice; // По умолчанию равна обычной цене
            
            // Проверяем связь с промоакциями
            if (product.promotions && Array.isArray(product.promotions) && product.promotions.length > 0) {
                // Берем первую активную акцию
                const activePromotion = product.promotions.find(
                    promo => promo.is_active && promo.pivot && promo.pivot.promotional_price
                );
                
                if (activePromotion && activePromotion.pivot.promotional_price) {
                    discountedPrice = parseFloat(activePromotion.pivot.promotional_price);
                }
            } else if (product.best_price !== undefined && product.best_price !== null) {
                // Если нет промоакций, но есть best_price
                discountedPrice = parseFloat(product.best_price);
            }
            
            // Рассчитываем скидку
            const discount = regularPrice - discountedPrice;
            
            // Если скидка отрицательная или NaN, считаем её нулевой
            const safeDiscount = discount > 0 && !isNaN(discount) ? discount : 0;
            const safeQuantity = (!item.quantity || isNaN(item.quantity)) ? 0 : item.quantity;
            
            return totalDiscount + (safeDiscount * safeQuantity);
        }, 0);
    };

    // Предоставляем значения контекста через провайдер
    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                setCartWithCount,
                loading,
                error,
                addToCart,
                updateCartItem,
                removeFromCart,
                clearCart,
                refreshCart,
                getCartTotal,
                totalPrice,
                getCartDiscount,
                formatPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
