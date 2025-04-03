import React from 'react';

/**
 * Компонент-контейнер для секций главной страницы
 * Обеспечивает правильные отступы и максимальную ширину контента
 * 
 * @param {Object} props - свойства компонента
 * @param {React.ReactNode} props.children - дочерние элементы
 * @param {boolean} props.fullWidth - флаг, указывающий нужна ли полная ширина
 * @param {string} props.className - дополнительные классы для контейнера
 */
export default function HomeContainer({ children, fullWidth = false, className = '' }) {
    const containerClasses = `
        ${fullWidth ? 'w-full' : 'max-w-[1440px] mx-auto'} 
        px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 
        ${className}
    `;
    
    return (
        <div className={containerClasses.trim()}>
            {children}
        </div>
    );
} 