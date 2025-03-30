import React from 'react';
import CheckoutStyles from './CheckoutStyles';

/**
 * Компонент формы с данными покупателя
 * 
 * @param {Object} data - Данные формы
 * @param {Object} errors - Ошибки валидации
 * @param {Function} handleInputChange - Обработчик изменения полей
 */
export default function CustomerForm({ data, errors, handleInputChange }) {
    const { INPUT_STYLE } = CheckoutStyles();
    
    return (
        <>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Данные покупателя</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="customer_name" className="mb-1 block text-sm font-medium text-gray-700">
                        Имя
                    </label>
                    <input
                        type="text"
                        id="customer_name"
                        name="customer_name"
                        value={data.customer_name}
                        onChange={handleInputChange}
                        className={INPUT_STYLE}
                        required
                    />
                    {errors.customer_name && (
                        <p className="mt-1 text-xs text-red-500">{errors.customer_name}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="customer_email" className="mb-1 block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="customer_email"
                        name="customer_email"
                        value={data.customer_email}
                        onChange={handleInputChange}
                        className={INPUT_STYLE}
                        required
                    />
                    {errors.customer_email && (
                        <p className="mt-1 text-xs text-red-500">{errors.customer_email}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="customer_phone" className="mb-1 block text-sm font-medium text-gray-700">
                        Телефон
                    </label>
                    <input
                        type="tel"
                        id="customer_phone"
                        name="customer_phone"
                        value={data.customer_phone}
                        onChange={handleInputChange}
                        className={INPUT_STYLE}
                        required
                    />
                    {errors.customer_phone && (
                        <p className="mt-1 text-xs text-red-500">{errors.customer_phone}</p>
                    )}
                </div>
            </div>
        </>
    );
} 