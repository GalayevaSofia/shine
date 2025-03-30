import React from 'react';
import { Link } from '@inertiajs/react';

/**
 * Компонент для отображения хлебных крошек на странице заказа
 * 
 * @param {string} orderNumber - Номер заказа
 */
export default function OrderBreadcrumbs({ orderNumber }) {
    return (
        <div className="mb-8 text-sm text-gray-500">
            <Link
                href="/"
                className="transition-colors hover:text-[#8072DB]"
            >
                Главная
            </Link>
            <span className="mx-2">/</span>
            <Link
                href={route('account.orders.index')}
                className="transition-colors hover:text-[#8072DB]"
            >
                Мои заказы
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#B86FBF]">
                Заказ №{orderNumber}
            </span>
        </div>
    );
} 