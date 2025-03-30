import React from 'react';
import LoadingIndicator from '@/Components/UI/LoadingIndicator';
import CatalogEmptyState from './CatalogEmptyState';
import ProductGrid from './ProductGrid';
import CatalogPagination from './CatalogPagination';

/**
 * Компонент для отображения содержимого каталога в зависимости от состояния
 * 
 * @param {boolean} isLoading - Флаг загрузки данных
 * @param {Array} products - Массив товаров
 * @param {number} totalProducts - Общее количество товаров
 * @param {number} currentPage - Текущая страница
 * @param {number} perPage - Количество товаров на странице
 * @param {Function} onPageChange - Функция изменения страницы
 */
export default function CatalogContent({
    isLoading,
    products,
    totalProducts,
    currentPage,
    perPage,
    onPageChange
}) {
    if (isLoading) {
        return (
            <div className="py-8 sm:py-12">
                <LoadingIndicator message="Загрузка товаров..." size="medium" />
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="py-8 sm:py-12">
                <CatalogEmptyState />
            </div>
        );
    }

    return (
        <>
            <ProductGrid products={products} />
            <CatalogPagination
                currentPage={currentPage}
                totalProducts={totalProducts}
                perPage={perPage}
                onPageChange={onPageChange}
            />
        </>
    );
} 