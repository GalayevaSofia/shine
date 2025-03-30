import React from 'react';

/**
 * Компонент для секции статистики
 * 
 * @param {Array} stats - Массив объектов со статистикой
 * @param {boolean} isVisible - Флаг видимости для анимации
 */
export default function StatisticsSection({ stats, isVisible }) {
    return (
        <div id="stats-section" className={`grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-16 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000`}>
            {stats.map((stat, index) => (
                <div 
                    key={index} 
                    className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 hover:border-[#8072DB]/20 text-center transform transition-all hover:scale-105 hover:shadow-xl"
                    style={{ transitionDelay: `${index * 100}ms` }}
                >
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mb-2 sm:mb-4 rounded-full bg-gradient-to-r from-[#B86FBF]/10 via-[#8072DB]/10 to-[#5A8BEA]/10">
                        <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent animate-gradient bg-size-200">{stat.value}</span>
                    </div>
                    <div className="text-gray-600 text-xs sm:text-sm md:text-base font-medium">{stat.label}</div>
                </div>
            ))}
        </div>
    );
} 