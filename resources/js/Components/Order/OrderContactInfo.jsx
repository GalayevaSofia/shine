import React from 'react';

/**
 * Компонент для отображения контактной информации заказа
 * 
 * @param {string} customerName - Имя клиента
 * @param {string} customerEmail - Email клиента
 * @param {string} customerPhone - Телефон клиента
 * @param {string} comment - Комментарий к заказу (опционально)
 */
export default function OrderContactInfo({ customerName, customerEmail, customerPhone, comment }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="p-6">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                    Контактная информация
                </h2>
                <dl className="space-y-3">
                    <div>
                        <dt className="text-sm text-gray-500">
                            ФИО
                        </dt>
                        <dd className="mt-1 text-gray-900">
                            {customerName}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-sm text-gray-500">
                            Email
                        </dt>
                        <dd className="mt-1 text-gray-900">
                            {customerEmail}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-sm text-gray-500">
                            Телефон
                        </dt>
                        <dd className="mt-1 text-gray-900">
                            {customerPhone}
                        </dd>
                    </div>
                    {comment && (
                        <div>
                            <dt className="text-sm text-gray-500">
                                Комментарий к заказу
                            </dt>
                            <dd className="mt-1 text-gray-900">
                                {comment}
                            </dd>
                        </div>
                    )}
                </dl>
            </div>
        </div>
    );
} 