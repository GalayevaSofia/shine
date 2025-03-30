import React from 'react';

// Стили
const GRADIENT_TEXT = "bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent animate-gradient bg-size-200";

/**
 * Компонент заголовка страницы
 * 
 * @param {string} title - Заголовок
 * @param {string} highlightedText - Выделенный текст
 * @param {string} subtitle - Подзаголовок
 */
export default function PageHeader({ title, highlightedText, subtitle }) {
    return (
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
                {title} <span className={GRADIENT_TEXT}>{highlightedText}</span>
            </h1>
            {subtitle && (
                <p className="mt-2 text-base text-gray-600 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
} 