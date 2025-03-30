import React from 'react';
import TeamMemberCard from './TeamMemberCard';

/**
 * Компонент для секции команды
 * 
 * @param {Array} members - Массив членов команды
 * @param {boolean} isVisible - Флаг видимости для анимации
 */
export default function TeamSection({ members, isVisible }) {
    return (
        <div id="team-section" className={`mt-12 sm:mt-20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000`}>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-10 text-center">
                Наша <span className="bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent animate-gradient bg-size-200">команда</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
                {members.map((member, index) => (
                    <TeamMemberCard key={member.id} member={member} index={index} />
                ))}
            </div>
        </div>
    );
} 