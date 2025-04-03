import React from 'react';

/**
 * Компонент для верхнего баннера на странице "О нас"
 */
export default function AboutBanner() {
    return (
        <section className="relative bg-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#B86FBF]/5 via-[#8072DB]/5 to-[#5A8BEA]/5"></div>
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 relative">
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                        О <span className="bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent animate-gradient bg-size-200">нас</span>
                    </h1>
                    <p className="mt-2 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
                        Мы стремимся сделать качественную косметику доступной каждому, 
                        помогая нашим клиентам раскрыть свою естественную красоту
                    </p>
                </div>
            </div>
        </section>
    );
} 