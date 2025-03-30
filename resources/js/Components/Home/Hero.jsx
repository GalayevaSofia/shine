import React from 'react';
import { Link } from '@inertiajs/react';

export default function Hero() {
    return (
        <section className="relative bg-white text-gray-900 w-full overflow-hidden">
            {/* Фоновое изображение на всю ширину */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-black/30 z-10"></div>
                <img
                    className="w-full h-full object-cover object-center filter saturate-75 brightness-90 contrast-110"
                    src="https://images.unsplash.com/photo-1631237535242-b6ef156c91b3?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Косметические средства"
                />
            </div>
            
            {/* Контентная часть с ограничением ширины для текста, но без ограничения для контейнера */}
            <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 lg:py-36">
                <div className="max-w-xl sm:max-w-2xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                        Красота в каждой
                        <span className="block text-white">детали</span>
                    </h1>
                    <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-100 max-w-lg">
                        Откройте для себя мир премиальной косметики. Создавайте свой неповторимый образ с нашими средствами.
                    </p>
                    <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Link 
                            href="/catalog"
                            className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white rounded-full text-sm font-semibold hover:opacity-95 transition-colors animate-gradient bg-size-200 flex items-center justify-center"
                        >
                            Смотреть каталог
                        </Link>
                        <Link
                            href="/about"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-200 text-sm font-medium rounded-full text-white hover:bg-white/10 transition-colors"
                        >
                            О бренде
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
} 