import React from 'react';
import CartEmptyState from './CartEmptyState';
import CartItemRow from './CartItemRow';
import CartSummary from './CartSummary';

/**
 * Компонент содержимого корзины
 * 
 * @param {Object} cart - Объект корзины
 * @param {boolean} isEmptyCart - Флаг пустой корзины
 * @param {number} cartItemCount - Количество товаров в корзине
 * @param {Object} localQuantities - Локальное состояние количества товаров
 * @param {Object} removingItems - Товары, отмеченные для удаления
 * @param {Object} loadingItems - Товары в состоянии загрузки
 * @param {Function} handleQuantityChange - Обработчик изменения количества
 * @param {Function} handleRemoveItem - Обработчик удаления товара
 * @param {Function} formatPrice - Функция форматирования цены
 * @param {Function} getCartTotal - Функция получения общей стоимости корзины
 * @param {Function} getCartDiscount - Функция получения скидки в корзине
 * @param {Function} onClearCart - Функция открытия модального окна очистки корзины
 */
export default function CartContent({
    cart,
    isEmptyCart,
    cartItemCount,
    localQuantities,
    removingItems,
    loadingItems,
    handleQuantityChange,
    handleRemoveItem,
    formatPrice,
    getCartTotal,
    getCartDiscount,
    onClearCart
}) {
    // Если корзина пуста
    if (isEmptyCart) {
        return <CartEmptyState />;
    }

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Список товаров */}
            <div className="lg:col-span-2">
                <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-200 p-6">
                        <h2 className="flex items-center text-xl font-semibold text-gray-900">
                            Корзина
                            <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-sm text-gray-700">
                                {cartItemCount}{' '}
                                {cartItemCount === 1
                                    ? 'товар'
                                    : cartItemCount >= 2 &&
                                        cartItemCount <= 4
                                      ? 'товара'
                                      : 'товаров'}
                            </span>
                        </h2>
                    </div>

                    <div className="divide-y divide-gray-200 p-6">
                        {Array.isArray(cart.items) && cart.items.map(item => 
                            item ? (
                                <CartItemRow 
                                    key={`${item.cart_id}-${item.product_id}`} 
                                    item={item} 
                                    localQuantities={localQuantities}
                                    removingItems={removingItems}
                                    loadingItems={loadingItems}
                                    handleQuantityChange={handleQuantityChange}
                                    handleRemoveItem={handleRemoveItem}
                                />
                            ) : null
                        )}
                    </div>
                </div>
            </div>

            {/* Сводка заказа */}
            <div className="lg:col-span-1">
                <CartSummary
                    formatPrice={formatPrice}
                    getCartTotal={getCartTotal}
                    getCartDiscount={getCartDiscount}
                    cartItemCount={cartItemCount}
                    onClearCart={onClearCart}
                />
            </div>
        </div>
    );
} 