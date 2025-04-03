import React from 'react';

/**
 * Компонент пагинации для каталога с анимацией
 * 
 * @param {number} currentPage - Текущая страница
 * @param {number} totalProducts - Общее количество товаров
 * @param {number} perPage - Количество товаров на странице
 * @param {Function} onPageChange - Функция обработки изменения страницы
 */
export default function CatalogPagination({ currentPage, totalProducts, perPage, onPageChange }) {
    const totalPages = Math.ceil(totalProducts / perPage);
    
    if (totalPages <= 1) return null;
    
    return (
        <div className="mt-6 sm:mt-8 flex justify-center opacity-0 translate-y-8 animate-item-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`rounded-md px-2 py-1 sm:px-4 sm:py-2 text-sm ${
                            currentPage === page
                                ? 'bg-[#8072DB] text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
} 