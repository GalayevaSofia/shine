import React from 'react';
import CheckoutStyles from './CheckoutStyles';

/**
 * Компонент для отображения сводки заказа
 * 
 * @param {Array} cartItems - Товары в корзине
 * @param {number} cartTotal - Сумма заказа
 * @param {number} discount - Сумма скидки
 * @param {number} delivery - Стоимость доставки
 * @param {number} total - Итоговая сумма заказа
 * @param {Function} formatPrice - Функция форматирования цены
 */
export default function OrderSummary({ cartItems, cartTotal, discount, delivery, total, formatPrice }) {
    const { GRADIENT_TEXT } = CheckoutStyles();
    
    return (
        <>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Ваш заказ</h2>
            
            <div className="space-y-3">
                {cartItems?.map((item) => {
                    // Продукт и его обычная цена
                    const product = item.product;
                    if (!product) return null;
                    
                    // Определяем обычную цену товара
                    const regularPrice = parseFloat(product.price || 0);
                    
                    // Получаем промо-цену из правильного источника данных
                    let salePrice = null;
                    
                    // 1. Проверяем наличие активных промоакций
                    if (product.promotions && Array.isArray(product.promotions) && product.promotions.length > 0) {
                        // Находим активную акцию с promotional_price
                        const activePromotion = product.promotions.find(
                            promo => promo.is_active && promo.pivot && promo.pivot.promotional_price
                        );
                        
                        if (activePromotion && activePromotion.pivot.promotional_price) {
                            salePrice = parseFloat(activePromotion.pivot.promotional_price);
                        }
                    }
                    
                    // 2. Если акций нет, проверяем поля best_price и original_price
                    if (salePrice === null && product.best_price !== undefined && 
                        product.original_price !== undefined && 
                        product.best_price < product.original_price) {
                        salePrice = parseFloat(product.best_price);
                    }
                    
                    // Определяем, есть ли скидка
                    const isOnSale = salePrice !== null && salePrice < regularPrice;
                    const finalPrice = isOnSale ? salePrice : regularPrice;
                    
                    // Получаем скидку в процентах (для отображения)
                    const discountPercentage = product.discount_percentage || 
                        (isOnSale ? Math.round((regularPrice - salePrice) / regularPrice * 100) : 0);
                    
                    // Определяем путь к изображению
                    const imageUrl = product.image || 
                                    product.thumbnail || 
                                    (product.image_path ? `/storage/${product.image_path}` : null);
                    
                    return (
                        <div key={item.id} className="flex items-center border-b border-gray-100 pb-3">
                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                {imageUrl ? (
                                    <img 
                                        src={imageUrl} 
                                        alt={product.name} 
                                        className="h-full w-full object-cover object-center"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="ml-4 flex-1">
                                <h3 className="text-sm text-gray-900">{product.name}</h3>
                                <div className="text-xs">
                                    <span className="text-gray-500">
                                        {item.quantity} шт.
                                    </span>
                                    {product.promotion_name && (
                                        <span className="ml-2 text-xs text-blue-600">
                                            {product.promotion_name}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                {isOnSale ? (
                                    <>
                                        <div className="flex items-center">
                                            <span className="text-sm font-medium text-red-600">
                                                {formatPrice(finalPrice)}
                                            </span>
                                            <span className="ml-1 text-xs line-through text-gray-400">
                                                {formatPrice(regularPrice)}
                                            </span>
                                        </div>
                                        <span className="text-xs text-green-600">-{discountPercentage}%</span>
                                    </>
                                ) : (
                                    <span className="text-sm font-medium text-gray-900">
                                        {formatPrice(finalPrice)}
                                    </span>
                                )}
                                <span className="text-xs text-gray-500 mt-1">
                                    {formatPrice(finalPrice * item.quantity)}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                    <p className="text-gray-600">Сумма</p>
                    <p className="font-medium text-gray-900">{formatPrice(cartTotal + discount)}</p>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-sm">
                        <p className="text-gray-600">Скидка</p>
                        <p className="font-medium text-green-600">- {formatPrice(discount)}</p>
                    </div>
                )}
                <div className="flex justify-between text-sm">
                    <p className="text-gray-600">Доставка</p>
                    <p className="font-medium text-gray-900">{delivery > 0 ? formatPrice(delivery) : 'Бесплатно'}</p>
                </div>
                <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between text-lg font-semibold">
                        <p className="text-gray-900">Итого</p>
                        <p className={GRADIENT_TEXT}>
                            {formatPrice(total)}
                        </p>
                    </div>
                    {discount > 0 && (
                        <p className="mt-1 text-xs text-green-600 text-right">
                            Вы экономите {formatPrice(discount)}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
} 