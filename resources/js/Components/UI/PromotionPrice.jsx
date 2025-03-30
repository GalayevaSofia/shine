import React from 'react';
import ProductPrice from './ProductPrice';

/**
 * Компонент для отображения промо-цены товара с единой логикой расчета.
 * 
 * @param {object} product - Объект товара
 * @param {string} size - Размер компонента ('small', 'medium', 'large')
 * @param {string} className - Дополнительные классы CSS
 */
export default function PromotionPrice({ product, size = 'medium', className = '' }) {
    // Получаем акционные данные, если товар участвует в акции
    const getPromotionData = () => {
        if (!product) return { promotionalPrice: null, discountPercentage: 0, promotionName: '' };

        // Проверяем, есть ли активные промоакции с promotional_price
        if (product.promotions && Array.isArray(product.promotions) && product.promotions.length > 0) {
            // Берем первую активную акцию с promotional_price
            const activePromotion = product.promotions.find(
                promo => promo.is_active && promo.pivot && promo.pivot.promotional_price
            );
            
            if (activePromotion && activePromotion.pivot.promotional_price) {
                const originalPrice = parseFloat(product.price);
                const promoPrice = parseFloat(activePromotion.pivot.promotional_price);
                
                return {
                    promotionalPrice: promoPrice,
                    discountPercentage: Math.round((originalPrice - promoPrice) / originalPrice * 100),
                    promotionName: activePromotion.title || '',
                };
            }
        }

        // Используем best_price и original_price, если они уже рассчитаны в бэкенде
        if (product.best_price !== undefined && product.best_price !== null && 
            product.original_price !== undefined && product.original_price !== null) {
            
            const best = parseFloat(product.best_price);
            const original = parseFloat(product.original_price);
            
            if (original > best) {
                return {
                    promotionalPrice: best,
                    discountPercentage: product.discount_percentage || Math.round((original - best) / original * 100),
                    promotionName: product.promotion_name || '',
                };
            }
        }
        
        return {
            promotionalPrice: null,
            discountPercentage: 0,
            promotionName: '',
        };
    };

    const { promotionalPrice, discountPercentage, promotionName } = getPromotionData();
    
    // Безопасно парсим цену
    const price = parseFloat(product?.price || 0);
    const safePrice = isNaN(price) ? 0 : price;
    const safePromotionalPrice = promotionalPrice !== null ? parseFloat(promotionalPrice) : null;
    
    return (
        <ProductPrice
            price={safePrice}
            promotionalPrice={safePromotionalPrice}
            discountPercentage={discountPercentage}
            promotionName={promotionName}
            size={size}
            className={className}
        />
    );
} 