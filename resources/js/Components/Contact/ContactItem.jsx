import React from 'react';

// Стили
const GRADIENT_BG = "bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA]";
const GRADIENT_TEXT = "bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent animate-gradient bg-size-200";
const CARD_STYLE = "bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-[#8072DB]/20 hover:shadow-md transition-all";

/**
 * Компонент для отображения элемента контактной информации
 * 
 * @param {React.ReactNode} icon - Иконка для элемента
 * @param {string} title - Заголовок элемента
 * @param {string} content - Основной текст элемента (опционально)
 * @param {string} subContent - Дополнительный текст элемента (опционально)
 * @param {Array} links - Массив ссылок { href, text } (опционально)
 * @param {Array} socialLinks - Массив социальных ссылок { href, text } (опционально)
 */
export default function ContactItem({ icon, title, content, subContent, links, socialLinks }) {
    return (
        <div className={CARD_STYLE}>
            <div className="flex items-center">
                <div className={`flex-shrink-0 w-7 h-7 ${GRADIENT_BG} rounded-full flex items-center justify-center animate-gradient bg-size-200`}>
                    {icon}
                </div>
                <h3 className="ml-2 text-sm font-semibold text-gray-900">{title}</h3>
            </div>
            
            {content && (
                <p className="text-gray-600 text-sm mt-2">
                    {content}
                    {subContent && <><br /><span className="text-xs text-gray-500">{subContent}</span></>}
                </p>
            )}
            
            {links && (
                <div className="mt-2 text-sm">
                    {links.map((link, idx) => (
                        <a key={idx} href={link.href} className="block text-gray-600 hover:text-[#8072DB] transition-colors">
                            {link.text}
                        </a>
                    ))}
                </div>
            )}
            
            {socialLinks && (
                <div className="flex space-x-3 mt-2">
                    {socialLinks.map((link, idx) => (
                        <a key={idx} href={link.href} className={`text-sm ${GRADIENT_TEXT} hover:opacity-80 font-medium transition-all`}>
                            {link.text}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
} 