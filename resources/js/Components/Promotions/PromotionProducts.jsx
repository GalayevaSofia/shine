import React from 'react';
import PromotionProductItem from './PromotionProductItem';
import OutlineButton from '@/Components/UI/OutlineButton';

export default function PromotionProducts({ products, promotionSlug, visibleCount }) {
    return (
        <div className="mt-3 sm:mt-4 md:mt-6">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 md:mb-4">
                Товары, участвующие в акции:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                {products.slice(0, visibleCount).map((product) => (
                    <PromotionProductItem 
                        key={product.id} 
                        product={product} 
                    />
                ))}
            </div>
            {products.length > visibleCount && (
                <div className="text-center mt-2 sm:mt-3 md:mt-4">
                    <OutlineButton href={`/promotions/${promotionSlug}`}>
                        Показать все товары ({products.length})
                    </OutlineButton>
                </div>
            )}
        </div>
    );
} 