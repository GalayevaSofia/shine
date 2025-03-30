import React from 'react';
import { Link } from '@inertiajs/react';

/**
 * Компонент для отображения пустого состояния.
 * 
 * @param {string} title - Заголовок пустого состояния
 * @param {string} message - Сообщение пустого состояния
 * @param {string} icon - Компонент иконки для отображения
 * @param {string} buttonText - Текст кнопки
 * @param {string} buttonLink - Ссылка для кнопки
 * @param {string} buttonClassName - Дополнительные классы для кнопки
 * @param {string} iconClassName - Дополнительные классы для контейнера иконки
 * @param {string} className - Дополнительные классы для всего компонента
 */
export default function EmptyState({
    title = 'Данные отсутствуют',
    message = 'По вашему запросу ничего не найдено',
    icon = null,
    buttonText = '',
    buttonLink = '',
    buttonClassName = '',
    iconClassName = '',
    className = '',
}) {
    // Стандартная иконка, если не предоставлена пользовательская
    const defaultIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-12 w-12 text-gray-400"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25-2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
        </svg>
    );

    // Стандартные классы для кнопки
    const defaultButtonClasses = "flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] px-6 py-2 text-sm font-medium text-white transition-colors hover:opacity-90";
    
    return (
        <div className={`flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-8 sm:p-12 text-center shadow-lg ${className}`}>
            <div className={`mb-6 rounded-full bg-gray-100 p-6 ${iconClassName}`}>
                {icon || defaultIcon}
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
                {title}
            </h2>
            <p className="mb-6 text-gray-600 max-w-md">
                {message}
            </p>
            {buttonText && buttonLink && (
                <Link
                    href={buttonLink}
                    className={buttonClassName || defaultButtonClasses}
                >
                    {buttonText}
                </Link>
            )}
        </div>
    );
} 