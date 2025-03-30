import React from 'react';
import CheckoutStyles from './CheckoutStyles';

/**
 * Компонент для выбора способа доставки
 * 
 * @param {Object} data - Данные формы
 * @param {Object} errors - Ошибки валидации
 * @param {Function} handleInputChange - Обработчик изменения полей
 * @param {number} deliveryPrice - Стоимость доставки
 * @param {Function} formatPrice - Функция форматирования цены 
 */
export default function DeliveryForm({ data, errors, handleInputChange, deliveryPrice = 300, formatPrice }) {
    const { INPUT_STYLE } = CheckoutStyles();
    
    return (
        <>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Способ доставки</h2>
            <div className="space-y-3">
                <div>
                    <label className="flex cursor-pointer items-center rounded-lg border border-gray-200 p-3 hover:border-[#8072DB]/20">
                        <input
                            type="radio"
                            name="delivery_method"
                            value="pickup"
                            checked={data.delivery_method === 'pickup'}
                            onChange={handleInputChange}
                            className="text-[#8072DB] focus:ring-[#8072DB]/30"
                        />
                        <span className="ml-2 text-sm text-gray-900">Самовывоз (бесплатно)</span>
                    </label>
                </div>
                <div>
                    <label className="flex cursor-pointer items-center rounded-lg border border-gray-200 p-3 hover:border-[#8072DB]/20">
                        <input
                            type="radio"
                            name="delivery_method"
                            value="courier"
                            checked={data.delivery_method === 'courier'}
                            onChange={handleInputChange}
                            className="text-[#8072DB] focus:ring-[#8072DB]/30"
                        />
                        <span className="ml-2 text-sm text-gray-900">Доставка курьером — {formatPrice(deliveryPrice)}</span>
                    </label>
                </div>
            </div>

            {data.delivery_method === 'courier' && (
                <div className="mt-4">
                    <label htmlFor="delivery_address" className="mb-1 block text-sm font-medium text-gray-700">
                        Адрес доставки
                    </label>
                    <textarea
                        id="delivery_address"
                        name="delivery_address"
                        value={data.delivery_address}
                        onChange={handleInputChange}
                        rows={2}
                        className={INPUT_STYLE}
                        required={data.delivery_method === 'courier'}
                    />
                    {errors.delivery_address && (
                        <p className="mt-1 text-xs text-red-500">{errors.delivery_address}</p>
                    )}
                </div>
            )}
        </>
    );
} 