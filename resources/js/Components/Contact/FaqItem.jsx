import React from 'react';

// Стили
const CARD_STYLE = "bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-[#8072DB]/20 hover:shadow-md transition-all";

/**
 * Компонент для отображения элемента FAQ
 * 
 * @param {string} question - Вопрос
 * @param {string} answer - Ответ
 */
export default function FaqItem({ question, answer }) {
    return (
        <div className={CARD_STYLE}>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{question}</h3>
            <p className="text-gray-600 text-sm">{answer}</p>
        </div>
    );
} 