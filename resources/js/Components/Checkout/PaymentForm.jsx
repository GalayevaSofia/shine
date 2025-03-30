import React from 'react';
import CheckoutStyles from './CheckoutStyles';

/**
 * Компонент для выбора способа оплаты
 * 
 * @param {Object} data - Данные формы
 * @param {Function} handleInputChange - Обработчик изменения полей
 */
export default function PaymentForm({ data, handleInputChange }) {
    return (
        <>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Способ оплаты</h2>
            <div className="space-y-3">
                <div>
                    <label className="flex cursor-pointer items-center rounded-lg border border-gray-200 p-3 hover:border-[#8072DB]/20">
                        <input
                            type="radio"
                            name="payment_method"
                            value="card"
                            checked={data.payment_method === 'card'}
                            onChange={handleInputChange}
                            className="text-[#8072DB] focus:ring-[#8072DB]/30"
                        />
                        <span className="ml-2 text-sm text-gray-900">Банковская карта онлайн</span>
                    </label>
                </div>
                <div>
                    <label className="flex cursor-pointer items-center rounded-lg border border-gray-200 p-3 hover:border-[#8072DB]/20">
                        <input
                            type="radio"
                            name="payment_method"
                            value="cash"
                            checked={data.payment_method === 'cash'}
                            onChange={handleInputChange}
                            className="text-[#8072DB] focus:ring-[#8072DB]/30"
                        />
                        <span className="ml-2 text-sm text-gray-900">Наличными при получении</span>
                    </label>
                </div>
            </div>
        </>
    );
} 