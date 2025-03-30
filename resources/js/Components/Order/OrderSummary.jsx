import React from 'react';

/**
 * Компонент для отображения итоговой информации о заказе
 * 
 * @param {number} subtotal - Сумма заказа без доставки
 * @param {number} deliveryFee - Стоимость доставки
 * @param {number} total - Итоговая сумма заказа
 */
export default function OrderSummary({ subtotal, deliveryFee, total }) {
    return (
        <div className="relative sticky top-24 overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
            {/* Декоративный градиентный элемент */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#B86FBF]/10 via-[#8072DB]/10 to-[#5A8BEA]/10 opacity-70 blur-xl"></div>

            <h2 className="relative z-10 mb-6 text-xl font-semibold text-gray-900">
                Итого
            </h2>
            <div className="relative z-10 space-y-4">
                <div className="flex justify-between text-gray-600">
                    <span>Товары</span>
                    <span>
                        {subtotal.toLocaleString('ru-RU')} ₽
                    </span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Доставка</span>
                    <span>
                        {deliveryFee.toLocaleString('ru-RU')} ₽
                    </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4 font-bold text-gray-900">
                    <span>К оплате</span>
                    <span className="bg-size-200 animate-gradient bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-lg text-transparent">
                        {total.toLocaleString('ru-RU')} ₽
                    </span>
                </div>
            </div>
        </div>
    );
} 