import React from 'react';
import GradientHeading from '@/Components/UI/GradientHeading';

/**
 * Компонент заголовка каталога
 */
export default function CatalogHeader() {
    return (
        <div className="mb-4 sm:mb-6 lg:mb-8">
            <GradientHeading level={1} centered className="mb-2 sm:mb-4">
                Каталог товаров
            </GradientHeading>
        </div>
    );
} 