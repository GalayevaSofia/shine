import React from 'react';
import { Link } from '@inertiajs/react';

/**
 * Компонент для отображения состояния, когда заказ не найден
 */
export default function OrderNotFound() {
    return (
        <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
                Заказ не найден
            </h1>
            <p className="mb-8 text-gray-600">
                К сожалению, запрашиваемый заказ не существует
                или был удален.
            </p>
            <Link
                href={route('account.orders.index')}
                className="inline-flex items-center rounded-md border border-transparent bg-[#8072DB] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#6B5ED9] focus:outline-none focus:ring-2 focus:ring-[#8072DB] focus:ring-offset-2"
            >
                Вернуться к списку заказов
            </Link>
        </div>
    );
} 