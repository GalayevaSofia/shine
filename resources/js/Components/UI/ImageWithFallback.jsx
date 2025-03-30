import React, { useState } from 'react';

/**
 * Компонент для отображения изображений с обработкой ошибок и запасным изображением.
 * 
 * @param {string} src - URL изображения
 * @param {string} alt - Альтернативный текст изображения
 * @param {string} fallbackSrc - URL запасного изображения в случае ошибки
 * @param {string} className - Дополнительные классы CSS
 * @param {object} props - Дополнительные свойства для тега img
 */
export default function ImageWithFallback({ 
    src, 
    alt = '', 
    fallbackSrc = '/images/no-image.svg',
    className = '',
    ...props 
}) {
    const [error, setError] = useState(false);
    
    // Обработка URL изображения
    const processImageUrl = (url) => {
        // Если URL начинается с http или https, то это полный URL
        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            return url;
        }
        
        // Если URL начинается с /storage, то это уже относительный путь
        if (url && url.startsWith('/storage')) {
            return url;
        }
        
        // В противном случае добавляем префикс /storage/
        if (url) {
            return `/storage/${url}`;
        }
        
        // Если URL отсутствует, возвращаем запасное изображение
        return fallbackSrc;
    };
    
    // Итоговый URL для отображения
    const displaySrc = error ? fallbackSrc : processImageUrl(src);
    
    return (
        <img 
            src={displaySrc}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            {...props}
        />
    );
} 