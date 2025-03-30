import React from 'react';

/**
 * Компонент для отображения списка товаров в заказе
 * 
 * @param {Array} items - Массив товаров в заказе
 */
export default function OrderItemsList({ items }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="p-6">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                    Товары в заказе
                </h2>
                <div className="space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-4 border-t border-gray-100 py-4 first:border-0"
                        >
                            <div className="flex-grow">
                                <h3 className="font-medium text-gray-900">
                                    {item.product_name}
                                </h3>
                                <div className="mt-1 text-sm text-gray-500">
                                    {item.quantity} ×{' '}
                                    {(
                                        item.subtotal /
                                        item.quantity
                                    ).toLocaleString(
                                        'ru-RU',
                                    )}{' '}
                                    ₽
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-medium text-gray-900">
                                    {item.subtotal.toLocaleString(
                                        'ru-RU',
                                    )}{' '}
                                    ₽
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 