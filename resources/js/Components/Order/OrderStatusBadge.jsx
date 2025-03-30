import React from 'react';

/**
 * Компонент для отображения статуса заказа с соответствующим цветовым оформлением
 * 
 * @param {string} status - Код статуса заказа
 * @param {string} statusText - Текстовое представление статуса
 * @param {string} className - Дополнительные CSS классы
 */
export default function OrderStatusBadge({ status, statusText, className = '' }) {
    const getStatusBadgeClass = () => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ${getStatusBadgeClass()} ${className}`}
        >
            {statusText}
        </div>
    );
} 