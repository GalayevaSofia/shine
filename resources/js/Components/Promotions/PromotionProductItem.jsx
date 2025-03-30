import React from 'react';
import Badge from '@/Components/UI/Badge';
import ProductPrice from '@/Components/Product/ProductPrice';
import ProductCard from '@/Components/Product/ProductCard';

export default function PromotionProductItem({ product }) {
    const calculateDiscount = () => {
        const discountPrice = product.pivot?.promotional_price;
        if (!discountPrice) return null;
        
        const discountPercent = Math.round((1 - discountPrice / product.price) * 100);
        return { discountPrice, discountPercent };
    };

    const discount = calculateDiscount();

    return (
        <ProductCard product={product}>
            {discount && (
                <div className="flex items-center justify-between">
                    <ProductPrice 
                        price={discount.discountPrice} 
                        originalPrice={product.price} 
                    />
                    <Badge 
                        variant="danger" 
                        className="text-[10px] sm:text-xs px-1 sm:px-1.5 md:px-2 py-0.5 rounded"
                    >
                        -{discount.discountPercent}%
                    </Badge>
                </div>
            )}
        </ProductCard>
    );
} 