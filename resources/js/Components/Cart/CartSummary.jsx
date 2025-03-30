import React from 'react';
import { Link } from '@inertiajs/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import CartStyles from './CartStyles';

/**
 * Компонент сводки заказа в корзине
 * 
 * @param {Function} formatPrice - Функция форматирования цены
 * @param {Function} getCartTotal - Функция получения общей стоимости корзины
 * @param {Function} getCartDiscount - Функция получения скидки в корзине
 * @param {number} cartItemCount - Количество товаров в корзине
 * @param {Function} onClearCart - Функция открытия модального окна очистки корзины
 */
export default function CartSummary({
    formatPrice,
    getCartTotal,
    getCartDiscount,
    cartItemCount,
    onClearCart
}) {
    const { GRADIENT_BUTTON } = CartStyles();
    
    return (
        <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">
                Сводка заказа
            </h2>

            <div className="mb-6 space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-600">
                        Товары ({cartItemCount})
                    </span>
                    <span className="font-medium">
                        {formatPrice(getCartTotal())}
                    </span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                    <span>Доставка</span>
                    <span>Бесплатно</span>
                </div>
                
                {/* Отображение экономии, если есть скидки */}
                {getCartDiscount() > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Экономия</span>
                        <span className="font-medium">
                            {formatPrice(getCartDiscount())}
                        </span>
                    </div>
                )}
                
                <div className="border-t border-gray-100 pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                        <span>Итого</span>
                        <span className="text-primary">
                            {formatPrice(getCartTotal())}
                        </span>
                    </div>
                </div>
            </div>

            <Link
                href={route('checkout')}
                className={GRADIENT_BUTTON}
            >
                Оформить заказ
            </Link>
            
            <div className="mt-3">
                <button
                    onClick={onClearCart}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-red-300 px-8 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                    <TrashIcon className="h-4 w-4" />
                    Очистить корзину
                </button>
            </div>

            <div className="mt-6">
                <Link
                    href={route('catalog')}
                    className="flex justify-center text-sm text-primary hover:underline"
                >
                    Продолжить покупки
                </Link>
            </div>
        </div>
    );
} 