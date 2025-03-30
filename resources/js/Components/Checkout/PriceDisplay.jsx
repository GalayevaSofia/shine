import React from 'react';

/**
 * Компонент для отображения цены с учетом скидки
 * 
 * @param {number} regularPrice - Обычная цена товара
 * @param {number|null} salePrice - Цена со скидкой (если есть)
 * @param {number} quantity - Количество единиц товара
 * @param {function} formatPrice - Функция форматирования цены
 */
export default function PriceDisplay({ regularPrice, salePrice, quantity, formatPrice }) {
    const isOnSale = salePrice && salePrice < regularPrice;
    const displayPrice = isOnSale ? salePrice : regularPrice;
    
    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <span className={`text-sm ${isOnSale ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                    {formatPrice(displayPrice)}
                </span>
                {isOnSale && (
                    <span className="ml-1 text-xs line-through text-gray-400">
                        {formatPrice(regularPrice)}
                    </span>
                )}
            </div>
            {quantity > 1 && (
                <span className="text-xs text-gray-500">{quantity} шт. × {formatPrice(displayPrice)}</span>
            )}
        </div>
    );
} 