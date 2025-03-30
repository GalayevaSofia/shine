import React from 'react';

/**
 * Компонент для отображения индикатора загрузки.
 * 
 * @param {string} size - Размер индикатора ('small', 'medium', 'large')
 * @param {string} color - Цвет индикатора (по умолчанию используется основной цвет темы)
 * @param {string} message - Текст сообщения под индикатором
 * @param {string} className - Дополнительные классы CSS
 */
export default function LoadingIndicator({
    size = 'medium',
    color = '#8072DB',
    message = 'Загрузка данных...',
    className = '',
}) {
    // Определяем размеры в зависимости от параметра size
    let sizeClasses = '';
    switch (size) {
        case 'small':
            sizeClasses = 'w-6 h-6';
            break;
        case 'medium':
            sizeClasses = 'w-10 h-10';
            break;
        case 'large':
            sizeClasses = 'w-16 h-16';
            break;
        default:
            sizeClasses = 'w-10 h-10';
    }

    return (
        <div className={`flex flex-col items-center justify-center py-6 ${className}`}>
            <div 
                className={`${sizeClasses} rounded-full border-4 border-t-transparent animate-spin`}
                style={{ 
                    borderColor: `${color}20`, // 20 - альфа-канал для прозрачности (12.5%)
                    borderTopColor: color 
                }}
            ></div>
            {message && (
                <p className="mt-4 text-gray-600 text-sm sm:text-base">
                    {message}
                </p>
            )}
        </div>
    );
} 