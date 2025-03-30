import React from 'react';

/**
 * Компонент для карточки члена команды
 * 
 * @param {Object} member - Объект с данными члена команды
 * @param {number} index - Индекс для анимации
 */
export default function TeamMemberCard({ member, index }) {
    return (
        <div 
            className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 hover:border-[#8072DB]/20 hover:shadow-xl overflow-hidden group transition-all duration-300"
            style={{ transitionDelay: `${index * 150}ms` }}
        >
            <div className="relative overflow-hidden">
                <div className="aspect-[3/2] overflow-hidden">
                    <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
            </div>
            <div className="p-3 sm:p-6 relative -mt-16 sm:-mt-20">
                <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-md sm:shadow-lg border border-gray-100 group-hover:border-[#8072DB]/20 transition-all">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 group-hover:bg-gradient-to-r group-hover:from-[#B86FBF] group-hover:via-[#8072DB] group-hover:to-[#5A8BEA] group-hover:bg-clip-text group-hover:text-transparent transition-all">
                        {member.name}
                    </h3>
                    <p className="text-[#8072DB] mb-2 sm:mb-3 text-sm sm:text-base font-medium">
                        {member.role}
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm italic">
                        "{member.quote}"
                    </p>
                </div>
            </div>
        </div>
    );
} 