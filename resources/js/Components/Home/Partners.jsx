import React from 'react';

/**
 * Компонент для отображения одного партнера
 */
function PartnerLogo({ partner }) {
    return (
        <div 
            key={partner.id}
            className="w-full max-w-[110px] sm:max-w-[140px] h-14 sm:h-16 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100 p-2 hover:shadow-md hover:border-[#8072DB]/20 transition-all duration-500 group"
        >
            <span className="text-xs sm:text-sm font-medium text-center text-gray-400 filter grayscale group-hover:filter-none group-hover:bg-gradient-to-r group-hover:from-[#B86FBF] group-hover:via-[#8072DB] group-hover:to-[#5A8BEA] group-hover:bg-clip-text group-hover:text-transparent group-hover:animate-gradient group-hover:bg-size-200 transition-all duration-500">
                {partner.name}
            </span>
        </div>
    );
}

/**
 * Список партнеров
 */
const partners = [
    { id: 1, name: 'L\'Oreal Paris' },
    { id: 2, name: 'Estée Lauder' },
    { id: 3, name: 'Garnier' },
    { id: 4, name: 'Maybelline' },
    { id: 5, name: 'MAC Cosmetics' },
    { id: 6, name: 'Clinique' },
    { id: 7, name: 'Lancome' },
    { id: 8, name: 'Bourjois' },
    { id: 9, name: 'NYX' },
    { id: 10, name: 'Chanel' },
    { id: 11, name: 'Dior' },
    { id: 12, name: 'Yves Saint Laurent' }
];

/**
 * Компонент секции партнеров
 */
export default function Partners() {
    return (
        <div className="py-8 sm:py-10 lg:py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Заголовок секции */}
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Наши <span className="bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent animate-gradient bg-size-200">партнеры</span>
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-gray-600">
                        Мы сотрудничаем с ведущими брендами в индустрии красоты
                    </p>
                </div>

                {/* Сетка логотипов партнеров */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 items-center justify-items-center">
                    {partners.map(partner => (
                        <PartnerLogo key={partner.id} partner={partner} />
                    ))}
                </div>
            </div>
        </div>
    );
} 