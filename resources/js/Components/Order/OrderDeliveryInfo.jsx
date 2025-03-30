import React from 'react';

/**
 * Компонент для отображения информации о доставке заказа
 * 
 * @param {string} deliveryMethod - Метод доставки (pickup, courier)
 * @param {string} deliveryAddress - Адрес доставки (для курьерской доставки)
 * @param {string} paymentMethod - Метод оплаты (card, cash)
 */
export default function OrderDeliveryInfo({ deliveryMethod, deliveryAddress, paymentMethod }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="p-6">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                    Информация о доставке
                </h2>
                <dl className="space-y-3">
                    <div>
                        <dt className="text-sm text-gray-500">
                            Способ доставки
                        </dt>
                        <dd className="mt-1 text-gray-900">
                            {deliveryMethod === 'pickup' ? 'Самовывоз' : 'Курьером'}
                        </dd>
                    </div>
                    
                    {deliveryMethod === 'courier' && (
                        <div>
                            <dt className="text-sm text-gray-500">
                                Адрес доставки
                            </dt>
                            <dd className="mt-1 text-gray-900">
                                {deliveryAddress}
                            </dd>
                        </div>
                    )}
                    
                    <div>
                        <dt className="text-sm text-gray-500">
                            Способ оплаты
                        </dt>
                        <dd className="mt-1 text-gray-900">
                            {paymentMethod === 'card' ? 'Банковской картой' : 'Наличными'}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
} 