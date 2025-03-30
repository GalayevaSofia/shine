import React from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

/**
 * Компонент для выбора количества товаров.
 * 
 * @param {number} quantity - Текущее количество
 * @param {function} onChange - Функция, вызываемая при изменении количества
 * @param {number} min - Минимальное значение (по умолчанию 1)
 * @param {number} max - Максимальное значение (по умолчанию 100)
 * @param {boolean} loading - Флаг загрузки
 * @param {string} className - Дополнительные классы CSS
 * @param {string} size - Размер компонента ('small', 'medium', 'large')
 */
export default function QuantitySelector({
    quantity,
    onChange,
    min = 1,
    max = 100,
    loading = false,
    className = '',
    size = 'medium',
}) {
    // Определяем размеры на основе параметра size
    let buttonSize, iconSize, counterSize;
    switch (size) {
        case 'small':
            buttonSize = 'p-1';
            iconSize = 'h-3 w-3';
            counterSize = 'min-w-[32px] text-sm';
            break;
        case 'medium':
            buttonSize = 'p-1.5';
            iconSize = 'h-4 w-4';
            counterSize = 'min-w-[40px] text-base';
            break;
        case 'large':
            buttonSize = 'p-2';
            iconSize = 'h-5 w-5';
            counterSize = 'min-w-[48px] text-lg';
            break;
        default:
            buttonSize = 'p-1.5';
            iconSize = 'h-4 w-4';
            counterSize = 'min-w-[40px] text-base';
    }

    const handleDecrement = () => {
        if (quantity > min) {
            onChange(quantity - 1);
        }
    };

    const handleIncrement = () => {
        if (quantity < max) {
            onChange(quantity + 1);
        }
    };

    return (
        <div className={`flex items-center ${className}`}>
            <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= min || loading}
                className={`${buttonSize} rounded-full border border-gray-300 hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50`}
            >
                <MinusIcon className={`${iconSize} text-gray-500`} />
            </button>

            <span className={`${counterSize} text-center font-medium text-gray-800 mx-1`}>
                {loading ? (
                    <span className="inline-block h-4 w-4 animate-pulse rounded-full bg-gray-200"></span>
                ) : (
                    quantity
                )}
            </span>

            <button
                type="button"
                onClick={handleIncrement}
                disabled={quantity >= max || loading}
                className={`${buttonSize} rounded-full border border-gray-300 hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50`}
            >
                <PlusIcon className={`${iconSize} text-gray-500`} />
            </button>
        </div>
    );
} 