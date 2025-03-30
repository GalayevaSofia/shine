import React from 'react';

/**
 * Компонент для отображения состояния ошибки.
 * 
 * @param {string} title - Заголовок сообщения об ошибке
 * @param {string} message - Текст сообщения об ошибке
 * @param {function} onRetry - Функция для повторной попытки
 * @param {string} retryText - Текст кнопки повторной попытки
 * @param {string} className - Дополнительные классы CSS
 */
export default function ErrorState({
    title = 'Произошла ошибка',
    message = 'Не удалось загрузить данные. Пожалуйста, попробуйте позже.',
    onRetry = null,
    retryText = 'Попробовать снова',
    className = '',
}) {
    return (
        <div className={`flex justify-center py-10 ${className}`}>
            <div className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white py-10 px-6 sm:py-16 sm:px-8 text-center shadow-sm">
                <div className="mb-6 text-red-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="mx-auto h-12 w-12 sm:h-16 sm:w-16"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9.344-5.25a57.159 57.159 0 0 0-2.58-1.408A2.25 2.25 0 0 0 16.5 4.5h-9a2.25 2.25 0 0 0-2.264 1.092 57.355 57.355 0 0 0-2.58 1.408 2.25 2.25 0 0 0-1.15 1.966v7.5a2.25 2.25 0 0 0 1.15 1.966 57.503 57.503 0 0 0 2.58 1.408 2.25 2.25 0 0 0 2.264 1.092h9a2.25 2.25 0 0 0 2.264-1.092 57.503 57.503 0 0 0 2.58-1.408 2.25 2.25 0 0 0 1.15-1.966v-7.5a2.25 2.25 0 0 0-1.15-1.966ZM12 15.75h.007v.008H12v-.008Z"
                        />
                    </svg>
                </div>
                <h2 className="mb-3 text-xl sm:text-2xl font-semibold text-gray-900">
                    {title}
                </h2>
                <p className="mx-auto mb-8 max-w-md text-gray-600">
                    {message}
                </p>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="bg-size-200 inline-block transform animate-gradient rounded-full bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] px-6 sm:px-8 py-2 sm:py-3 font-semibold text-white shadow-md transition-all hover:scale-105 hover:opacity-95 active:scale-95"
                    >
                        {retryText}
                    </button>
                )}
            </div>
        </div>
    );
} 