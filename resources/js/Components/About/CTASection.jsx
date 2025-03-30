import React from 'react';
import { Link } from '@inertiajs/react';

/**
 * Компонент для секции "Призыв к действию"
 * 
 * @param {boolean} isVisible - Флаг видимости для анимации
 */
export default function CTASection({ isVisible }) {
    return (
        <div id="cta-section" className={`mt-12 sm:mt-20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000`}>
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#B86FBF]/5 via-[#8072DB]/5 to-[#5A8BEA]/5 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-5 sm:p-8 border border-gray-100">
                <div className="text-center space-y-3 sm:space-y-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Станьте частью нашей <span className="bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent animate-gradient bg-size-200">истории</span>
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-2">
                        Присоединяйтесь к нам в создании пространства, где красота встречается с качеством и заботой.
                        Мы всегда рады новым клиентам и готовы помочь вам выбрать лучшие средства для ухода.
                    </p>
                    <div className="pt-2 sm:pt-4">
                        <Link
                            href={route('contacts')}
                            className="inline-block px-5 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] text-white rounded-full shadow-md font-medium sm:font-semibold text-sm sm:text-base hover:opacity-95 transition-all animate-gradient bg-size-200 transform hover:scale-105 active:scale-95"
                        >
                            Связаться с нами
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
} 