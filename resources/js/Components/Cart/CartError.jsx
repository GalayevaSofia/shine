import React from 'react';
import { Link } from '@inertiajs/react';

/**
 * Компонент для отображения ошибки загрузки корзины
 * 
 * @param {string} error - Текст ошибки
 * @param {Function} refreshCart - Функция обновления корзины
 */
export default function CartError({ error, refreshCart }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Корзина</h1>
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Ошибка!</strong>
                <span className="block sm:inline"> {error}</span>
                <button 
                    onClick={refreshCart}
                    className="mt-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Обновить
                </button>
            </div>
            <div className="mt-8 text-center">
                <Link
                    href="/catalog"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Перейти в каталог
                </Link>
            </div>
        </div>
    );
} 