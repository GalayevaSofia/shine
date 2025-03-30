import React from 'react';
import FaqItem from './FaqItem';

// Стили
const GRADIENT_TEXT = "bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent animate-gradient bg-size-200";

/**
 * Компонент для отображения списка FAQ
 * 
 * @param {Array} faqItems - Массив элементов FAQ
 */
export default function FaqList({ faqItems }) {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Часто задаваемые <span className={GRADIENT_TEXT}>вопросы</span>
            </h2>
            <div className="space-y-3">
                {faqItems.map((item, index) => (
                    <FaqItem
                        key={index}
                        question={item.question}
                        answer={item.answer}
                    />
                ))}
            </div>
        </div>
    );
} 