import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Components/Layout/MainLayout';
import CatalogFilters from '@/Components/UI/CatalogFilters';
import CatalogHeader from '@/Components/Catalog/CatalogHeader';
import CatalogContent from '@/Components/Catalog/CatalogContent';
import useCatalog from '@/hooks/useCatalog';

/**
 * Страница каталога товаров
 * 
 * @param {Object} initialProducts - Начальные данные товаров
 * @param {Object} filters - Начальные фильтры из URL
 */
export default function Catalog({ initialProducts, filters }) {
    const {
        products,
        totalProducts,
        categories,
        isLoading,
        currentPage,
        currentFilters,
        handleFilterChange,
        handlePageChange,
        resetFilters,
        PER_PAGE
    } = useCatalog(initialProducts, filters);

    return (
        <MainLayout>
            <Head title="Каталог">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            
            <main className="mx-auto max-w-7xl px-4 pb-8 sm:pb-12 lg:pb-16 pt-4 sm:pt-6 lg:pt-8 sm:px-6 lg:px-8">
                {/* Заголовок */}
                <CatalogHeader />

                {/* Фильтры */}
                <CatalogFilters
                    categories={categories}
                    currentFilters={currentFilters}
                    onFilterChange={handleFilterChange}
                    onResetFilters={resetFilters}
                />

                {/* Контент каталога */}
                <CatalogContent
                    isLoading={isLoading}
                    products={products}
                    totalProducts={totalProducts}
                    currentPage={currentPage}
                    perPage={PER_PAGE}
                    onPageChange={handlePageChange}
                />
            </main>
        </MainLayout>
    );
}
