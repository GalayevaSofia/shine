import React from 'react';
import ProductCard from '@/Components/ProductCard';

/**
 * Компонент для отображения сетки товаров с анимацией каскада
 * 
 * @param {Array} products - Массив товаров для отображения 
 */
export default function ProductGrid({ products }) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {products.map((product, index) => (
                <div 
                    key={product.id} 
                    className="opacity-0 translate-y-8 animate-item-fade-in w-full"
                    style={{ 
                        animationDelay: `${index * 50}ms`,
                        animationFillMode: 'forwards'
                    }}
                >
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
} 