import React from 'react';
import ProductCard from '@/Components/ProductCard';

/**
 * Компонент для отображения сетки товаров
 * 
 * @param {Array} products - Массив товаров для отображения 
 */
export default function ProductGrid({ products }) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
} 