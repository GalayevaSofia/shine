import React, { useState } from 'react';

/**
 * Компонент для отображения изображений с обработкой ошибок и запасным изображением.
 * Поддерживает удаление фона и оптимизированную загрузку.
 * 
 * @param {string} src - URL изображения
 * @param {string} alt - Альтернативный текст изображения
 * @param {string} fallbackSrc - URL запасного изображения в случае ошибки
 * @param {string} className - Дополнительные классы CSS
 * @param {string} loadingType - Тип загрузки изображения (lazy, eager)
 * @param {object} props - Дополнительные свойства для тега img
 */
export default function ImageWithFallback({ 
    src, 
    alt = '', 
    fallbackSrc = '/images/no-image.svg',
    className = '',
    loadingType = 'lazy',
    ...props 
}) {
    const [error, setError] = useState(false);
    
    // Обработка URL изображения
    const processImageUrl = (url) => {
        if (!url) return fallbackSrc;
        
        // Если URL начинается с http или https, то это полный URL
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        
        // Если URL начинается с /storage, то это уже относительный путь
        if (url.startsWith('/storage')) {
            return url;
        }
        
        // В противном случае добавляем префикс /storage/
        return `/storage/${url}`;
    };
    
    // Итоговый URL для отображения
    const displaySrc = error ? fallbackSrc : processImageUrl(src);
    
    // Специальная обработка ошибок загрузки изображений
    const handleImageError = (e) => {
        console.log('Image load error:', src);
        setError(true);
        e.target.onerror = null; // Предотвращаем бесконечную рекурсию
    };
    
    return (
        <img 
            src={displaySrc}
            alt={alt}
            className={className}
            onError={handleImageError}
            loading={loadingType}
            decoding="async"
            {...props}
        />
    );
} 