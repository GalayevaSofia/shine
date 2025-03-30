import React from 'react';

/**
 * Хук для общих стилей компонентов оформления заказа
 * Централизует стилевые константы для использования в разных компонентах
 */
export default function CheckoutStyles() {
    // Общие стили для компонентов формы оформления заказа
    const GRADIENT_BG = "bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA]";
    const BUTTON_STYLE = `bg-size-200 transform animate-gradient rounded-full ${GRADIENT_BG} px-8 py-3 font-semibold text-white shadow-md transition-all hover:scale-105 hover:opacity-95 active:scale-95`;
    const INPUT_STYLE = "w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#8072DB]/30 focus:border-[#8072DB] hover:border-[#B86FBF] transition-all";
    const CARD_STYLE = "bg-white p-6 rounded-xl shadow-sm border border-gray-100";
    const GRADIENT_TEXT = "bg-clip-text text-transparent bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] animate-gradient bg-size-200";

    return {
        GRADIENT_BG,
        BUTTON_STYLE,
        INPUT_STYLE,
        CARD_STYLE,
        GRADIENT_TEXT
    };
}

// Сохраняем для обратной совместимости
export const GRADIENT_TEXT = "bg-clip-text text-transparent bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] animate-gradient bg-size-200"; 