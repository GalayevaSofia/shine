import React from 'react';
import clsx from 'clsx';
import { formatPrice } from '@/utils';

/**
 * Компонент ProductPrice отвечает за отображение цены товара.
 * Может показывать обычную цену и акционную цену (если есть).
 * 
 * @param {number|string} price - Обычная цена товара
 * @param {number|string|null} promotionalPrice - Акционная цена товара (если есть)
 * @param {string} size - Размер отображения цены ('sm', 'md', 'lg')
 * @param {string} className - Дополнительные CSS классы
 * @param {string} promotionName - Название акции (если есть)
 * @param {boolean} showOldPrice - Показывать ли старую цену при наличии акционной
 */
export default function ProductPrice({
    price,
    promotionalPrice = null,
    size = 'md',
    className = '',
    promotionName = '',
    showOldPrice = true
}) {
    // Приводим цены к числовому виду, если они переданы как строки
    const normalizedPrice = typeof price === 'string' ? parseFloat(price) : price;
    const normalizedPromotionalPrice = typeof promotionalPrice === 'string' 
        ? parseFloat(promotionalPrice) 
        : promotionalPrice;

    // Проверяем, есть ли акционная цена и меньше ли она обычной
    const hasPromotion = promotionalPrice !== null 
        && !isNaN(normalizedPromotionalPrice) 
        && normalizedPromotionalPrice < normalizedPrice;

    // Определяем размеры на основе параметра size
    let sizeClasses = '';
    let discountSizeClasses = '';

    switch (size) {
        case 'lg':
            sizeClasses = 'text-2xl';
            discountSizeClasses = 'text-lg';
            break;
        case 'sm':
            sizeClasses = 'text-sm';
            discountSizeClasses = 'text-xs';
            break;
        case 'md':
        default:
            sizeClasses = 'text-lg';
            discountSizeClasses = 'text-sm';
    }

    // Проверка на корректность значений
    const validPrice = !isNaN(normalizedPrice) && normalizedPrice > 0;
    const validPromotionalPrice = hasPromotion && !isNaN(normalizedPromotionalPrice) && normalizedPromotionalPrice > 0;

    // Вычисляем скидку в процентах
    const discountPercentage = validPromotionalPrice
        ? Math.round((1 - normalizedPromotionalPrice / normalizedPrice) * 100)
        : 0;

    return (
        <div className={clsx('flex flex-col', className)}>
            {/* Основная цена */}
            <div className="flex items-center gap-2">
                {/* Если есть акционная цена, показываем её как основную */}
                <span className={clsx('font-bold', sizeClasses, {
                    'text-red-600': validPromotionalPrice,
                    'text-gray-900': !validPromotionalPrice
                })}>
                    {validPromotionalPrice
                        ? formatPrice(normalizedPromotionalPrice)
                        : formatPrice(normalizedPrice)
                    }
                </span>

                {/* Показываем оригинальную цену зачёркнутой, если есть акционная и включен showOldPrice */}
                {validPromotionalPrice && showOldPrice && (
                    <span className={clsx('text-gray-500 line-through', discountSizeClasses)}>
                        {formatPrice(normalizedPrice)}
                    </span>
                )}

                {/* Показываем процент скидки, если есть акционная цена */}
                {validPromotionalPrice && discountPercentage > 0 && (
                    <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">
                        -{discountPercentage}%
                    </span>
                )}
            </div>

            {/* Показываем название акции, если оно есть */}
            {promotionName && validPromotionalPrice && (
                <span className="mt-1 text-xs text-red-600">{promotionName}</span>
            )}
        </div>
    );
}
