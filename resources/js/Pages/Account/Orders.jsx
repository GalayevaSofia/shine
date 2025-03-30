import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navigation from '@/Components/Navigation';

export default function Orders({ orders }) {
    return (
        <>
            <Head>
                <title>Мои заказы - Сияй</title>
                <meta name="description" content="История ваших заказов в магазине косметики Сияй" />
            </Head>

            <div className="min-h-screen bg-white">
                <Navigation />
                
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
                    {/* Заголовок */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-gray-900">
                            Мои <span className="bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent animate-gradient bg-size-200">заказы</span>
                        </h1>
                    </div>

                    {orders.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
                            <div className="mb-6 text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">У вас пока нет заказов</h2>
                            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                Самое время сделать первый заказ в нашем магазине!
                            </p>
                            <Link 
                                href="/catalog"
                                className="inline-block px-8 py-3 bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] text-white rounded-full font-semibold hover:opacity-95 transition-all animate-gradient bg-size-200 shadow-md transform hover:scale-105 active:scale-95"
                            >
                                Перейти в каталог
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <Link
                                    key={order.id}
                                    href={route('account.orders.show', order.order_number)}
                                    className="block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-[#8072DB]/20 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                                Заказ №{order.order_number}
                                            </div>
                                            <div className="text-lg font-semibold text-gray-900">
                                                {order.total.toLocaleString('ru-RU')} ₽
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-sm text-gray-500 mb-1">
                                                {order.created_at}
                                            </div>
                                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {order.status_text}
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <div className="text-sm text-gray-500">
                                                {order.items_count} {order.items_count === 1 ? 'товар' : 
                                                order.items_count < 5 ? 'товара' : 'товаров'}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
} 