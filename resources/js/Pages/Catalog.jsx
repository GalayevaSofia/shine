import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Components/Layout/MainLayout';
import CatalogFilters from '@/Components/UI/CatalogFilters';
import CatalogHeader from '@/Components/Catalog/CatalogHeader';
import CatalogContent from '@/Components/Catalog/CatalogContent';
import useCatalog from '@/hooks/useCatalog';
import useAnimateSections from '@/hooks/useAnimateSections';

/**
 * Страница каталога товаров с анимацией секций
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

    // Состояние для отслеживания видимости секций
    const [animateSection, setAnimateSection] = useState({
        header: false,
        filters: false,
        products: false
    });
    
    // Подключаем хук для анимации секций при скролле
    useAnimateSections(setAnimateSection);

    return (
        <MainLayout>
            <Head title="Каталог">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            
            <main className="mx-auto max-w-[1440px] px-4 pb-8 sm:pb-12 lg:pb-16 pt-4 sm:pt-6 lg:pt-8 sm:px-6 lg:px-8">
                {/* Заголовок с анимацией */}
                <div id="header-section" className={`${animateSection.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700`}>
                    <CatalogHeader />
                </div>

                {/* Фильтры с анимацией */}
                <div id="filters-section" className={`${animateSection.filters ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700 delay-100`}>
                    <CatalogFilters
                        categories={categories}
                        currentFilters={currentFilters}
                        onFilterChange={handleFilterChange}
                        onResetFilters={resetFilters}
                    />
                </div>

                {/* Контент каталога с анимацией */}
                <div id="products-section" className={`${animateSection.products ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700 delay-200`}>
                    <CatalogContent
                        isLoading={isLoading}
                        products={products}
                        totalProducts={totalProducts}
                        currentPage={currentPage}
                        perPage={PER_PAGE}
                        onPageChange={handlePageChange}
                    />
                </div>
            </main>
        </MainLayout>
    );
}
