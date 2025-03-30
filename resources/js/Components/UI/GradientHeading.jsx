import React from 'react';

export default function GradientHeading({
    children,
    level = 2,
    className = '',
    centered = false
}) {
    const baseClasses = `font-bold ${centered ? 'text-center' : ''} ${className}`;
    const gradientClasses = "bg-size-200 animate-gradient bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent";

    // Определяем размер в зависимости от уровня заголовка
    let sizeClasses = '';
    switch (level) {
        case 1:
            sizeClasses = 'text-4xl';
            break;
        case 2:
            sizeClasses = 'text-2xl';
            break;
        case 3:
            sizeClasses = 'text-xl';
            break;
        case 4:
            sizeClasses = 'text-lg';
            break;
        default:
            sizeClasses = 'text-2xl';
    }

    // Выбираем правильный HTML-тег в зависимости от уровня заголовка
    const Component = `h${level}`;

    return (
        <Component className={`${baseClasses} ${sizeClasses}`}>
            <span className={gradientClasses}>{children}</span>
        </Component>
    );
}
