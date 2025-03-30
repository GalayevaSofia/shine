import React from 'react';

/**
 * Компонент для кнопки таба
 * 
 * @param {boolean} active - Активен ли таб
 * @param {Function} onClick - Функция обработки клика
 * @param {React.ReactNode} children - Дочерние элементы
 */
export function TabButton({ active, onClick, children }) {
    return (
        <button
            onClick={onClick}
            className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                active
                ? 'bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] text-white shadow-md animate-gradient bg-size-200'
                : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
        >
            {children}
        </button>
    );
}

/**
 * Компонент для таба "Миссия"
 */
export function MissionTab() {
    return (
        <div className="max-w-3xl mx-auto text-center animate-fadeIn">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-4">Наша миссия</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Наша миссия — сделать качественную косметику доступной каждому. 
                Мы верим, что уход за собой должен приносить радость и уверенность, 
                а не быть сложным и дорогим процессом. Мы стремимся помочь каждому 
                клиенту подобрать идеальные средства, которые подчеркнут естественную красоту.
            </p>
        </div>
    );
}

/**
 * Компонент для таба "Ценности"
 * 
 * @param {Array} values - Массив ценностей компании
 */
export function ValuesTab({ values }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 animate-fadeIn">
            {values.map((value, index) => (
                <div key={index} className="bg-white p-3 sm:p-5 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 hover:border-[#8072DB]/20 hover:shadow-md transition-all">
                    <div className="flex items-center mb-2 sm:mb-3">
                        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] rounded-full flex items-center justify-center animate-gradient bg-size-200">
                            <span className="text-white text-xs sm:text-sm font-bold">{index + 1}</span>
                        </div>
                        <h3 className="ml-2 sm:ml-3 text-base sm:text-lg font-semibold text-gray-900">
                            {value.title}
                        </h3>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm ml-8 sm:ml-11">{value.description}</p>
                </div>
            ))}
        </div>
    );
}

/**
 * Компонент для таба "История"
 * 
 * @param {Array} history - Массив исторических событий компании
 */
export function HistoryTab({ history }) {
    return (
        <div className="space-y-4 sm:space-y-6 animate-fadeIn max-w-3xl mx-auto">
            {history.map((item, index) => (
                <div key={index} className="relative pl-8 sm:pl-10 pb-4 sm:pb-6">
                    <div className="absolute left-0 top-0 h-full border-l-2 border-gray-200"></div>
                    <div className="absolute left-0 top-2 w-4 h-4 sm:w-6 sm:h-6 -ml-2 sm:-ml-3 rounded-full bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] animate-gradient bg-size-200 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm border border-gray-100 hover:border-[#8072DB]/20 hover:shadow-md transition-all">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">{item.title}</h3>
                            <span className="mt-1 sm:mt-0 px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-[#B86FBF]/10 via-[#8072DB]/10 to-[#5A8BEA]/10 rounded-full text-xs sm:text-sm font-medium text-gray-700">{item.year}</span>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
} 