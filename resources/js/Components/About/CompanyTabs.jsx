import React from 'react';
import { TabButton, MissionTab, ValuesTab, HistoryTab } from './TabComponents';

/**
 * Компонент для табов о компании
 * 
 * @param {string} activeTab - Активный таб
 * @param {Function} setActiveTab - Функция для установки активного таба
 * @param {Array} values - Массив ценностей компании
 * @param {Array} history - Массив исторических событий компании
 * @param {boolean} isVisible - Флаг видимости для анимации
 */
export default function CompanyTabs({ activeTab, setActiveTab, values, history, isVisible }) {
    return (
        <div id="tabs-section" className={`mb-10 sm:mb-16 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000`}>
            <div className="flex justify-center flex-wrap gap-2 sm:space-x-4 mb-4 sm:mb-8">
                <TabButton active={activeTab === 'mission'} onClick={() => setActiveTab('mission')}>
                    Миссия
                </TabButton>
                <TabButton active={activeTab === 'values'} onClick={() => setActiveTab('values')}>
                    Ценности
                </TabButton>
                <TabButton active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
                    История
                </TabButton>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 p-4 sm:p-6">
                {activeTab === 'mission' && <MissionTab />}
                {activeTab === 'values' && <ValuesTab values={values} />}
                {activeTab === 'history' && <HistoryTab history={history} />}
            </div>
        </div>
    );
} 