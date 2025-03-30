import React from 'react';
import EmptyState from '@/Components/UI/EmptyState';
import PromotionProductItem from './PromotionProductItem';

export default function PromotionProductsGrid({ products = [], calculateDiscount }) {
    if (!products || products.length === 0) {
        return (
            <div className="py-8 sm:py-12">
                <EmptyState
                    title="Нет товаров в акции"
                    message="В данной акции нет товаров или они временно недоступны"
                    buttonText="Вернуться к списку акций" 
                    buttonLink="/promotions"
                />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {products.map((product) => (
                <PromotionProductItem
                    key={product.id}
                    product={{
                        ...product,
                        pivot: {
                            promotional_price: calculateDiscount(product)?.discountPrice
                        }
                    }}
                />
            ))}
        </div>
    );
} 