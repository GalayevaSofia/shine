import React from 'react';
import { Link } from '@inertiajs/react';
import LoadingIndicator from '@/Components/UI/LoadingIndicator';

export default function OrdersList({ 
    orders, 
    isLoading, 
    showSuccessMessage, 
    flash,
    formatPrice 
}) {
    if (isLoading) {
        return (
            <div className="py-12 text-center">
                <LoadingIndicator size="medium" />
            </div>
        );
    }

    if (showSuccessMessage && flash?.success) {
        return (
            <div className="mx-auto max-w-6xl">
                <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-5 w-5 text-green-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-green-800">
                                {flash.success}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center shadow-sm">
                <div className="mb-6 text-gray-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="mx-auto h-16 w-16"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                    </svg>
                </div>
                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                    У вас пока нет заказов
                </h2>
                <p className="mx-auto mb-8 max-w-md text-gray-600">
                    Самое время сделать первый заказ в нашем
                    магазине!
                </p>
                <Link
                    href="/catalog"
                    className="bg-size-200 inline-block transform animate-gradient rounded-full bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] px-8 py-3 font-semibold text-white shadow-md transition-all hover:scale-105 hover:opacity-95 active:scale-95"
                >
                    Перейти в каталог
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl">
            <div className="space-y-4">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="block rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <div className="mb-1 text-sm text-gray-500">
                                    Заказ №
                                    {order.order_number}
                                </div>
                                <div className="text-lg font-semibold text-gray-900">
                                    {order && order.total ? 
                                        formatPrice(Number(order.total)) : 
                                        '0 ₽'}
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="mb-1 text-sm text-gray-500">
                                    {order.created_at}
                                </div>
                                <div
                                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                                        order.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : order.status === 'processing'
                                              ? 'bg-blue-100 text-blue-800'
                                              : order.status === 'shipped'
                                                ? 'bg-purple-100 text-purple-800'
                                                : order.status === 'delivered'
                                                  ? 'bg-green-100 text-green-800'
                                                  : order.status === 'cancelled'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    {order.status_text}
                                </div>
                            </div>

                            <div className="w-full mt-2 flex flex-wrap gap-2 items-center border-t border-gray-100 pt-3">
                                <Link
                                    href={`/account/orders/${order.order_number}`}
                                    className="flex items-center gap-2 w-full"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                    <div className="text-sm font-medium text-gray-700">
                                        {order && order.item_count ? 
                                            (() => {
                                                const count = Number(order.item_count);
                                                return `${count} ${count === 1 ? 'товар' : count >= 2 && count <= 4 ? 'товара' : 'товаров'}`;
                                            })() : 
                                            '0 товаров'}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 