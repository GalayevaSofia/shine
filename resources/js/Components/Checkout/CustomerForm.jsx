import React from 'react';
import CheckoutStyles from './CheckoutStyles';

/**
 * Компонент формы с данными покупателя
 * 
 * @param {Object} data - Данные формы
 * @param {Object} errors - Ошибки валидации
 * @param {Function} handleInputChange - Обработчик изменения полей
 * @param {Function} formatPhoneNumber - Функция форматирования телефонного номера
 */
export default function CustomerForm({ data, errors, handleInputChange, formatPhoneNumber }) {
    const { INPUT_STYLE } = CheckoutStyles();
    
    // Обработчик изменения телефона с использованием функции форматирования из хука
    const handlePhoneChange = (e) => {
        const value = e.target.value;
        
        // Форматируем номер телефона с помощью функции из хука
        const formattedPhone = formatPhoneNumber(value);
        
        // Обновляем поле с форматированным значением
        const updatedEvent = {
            ...e,
            target: {
                ...e.target,
                name: 'customer_phone',
                value: formattedPhone
            }
        };
        
        handleInputChange(updatedEvent);
    };
    
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
                        onChange={handlePhoneChange}
                        className={INPUT_STYLE}
                        placeholder="+7 (___) ___-__-__"
                        maxLength={18} // +7 (123) 456-78-90
                        pattern="\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}"
                        title="Формат: +7 (XXX) XXX-XX-XX"
                        required
                    />
                    <p className="mt-1 text-xs text-gray-500">Формат: +7 (XXX) XXX-XX-XX</p>
                    {errors.customer_phone && (
                        <p className="mt-1 text-xs text-red-500">{errors.customer_phone}</p>
                    )}
                </div>
            </div>
        </>
    );
} 