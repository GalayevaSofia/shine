import React from 'react';
import StockStatus from '@/Components/UI/StockStatus';

export default function ProductHeader({ product }) {
    return (
        <div className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
                <StockStatus
                    inStock={product.stock > 0}
                    quantity={product.stock}
                    size="medium"
                />

                {product.featured && (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                        Популярный товар
                    </span>
                )}

                {product.is_new && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                        Новинка
                    </span>
                )}
            </div>

            <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                {product.name}
            </h1>

            {product.manufacturer && (
                <p className="mb-4 text-gray-600">
                    Производитель: {product.manufacturer}
                </p>
            )}
        </div>
    );
} 