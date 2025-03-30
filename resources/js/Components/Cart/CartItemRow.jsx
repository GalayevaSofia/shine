import React from 'react';
import { Link } from '@inertiajs/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import QuantitySelector from '@/Components/UI/QuantitySelector';
import ImageWithFallback from '@/Components/UI/ImageWithFallback';
import PromotionPrice from '@/Components/UI/PromotionPrice';

/**
 * Компонент строки товара в корзине
 * 
 * @param {Object} item - Элемент корзины
 * @param {Object} localQuantities - Локальное состояние количества товаров
 * @param {Object} removingItems - Товары, отмеченные для удаления
 * @param {Object} loadingItems - Товары в состоянии загрузки
 * @param {Function} handleQuantityChange - Обработчик изменения количества
 * @param {Function} handleRemoveItem - Обработчик удаления товара
 */
export default function CartItemRow({ 
    item, 
    localQuantities, 
    removingItems, 
    loadingItems, 
    handleQuantityChange, 
    handleRemoveItem 
}) {
    // Use cart_id and product_id as composite key instead of id
    const { product, quantity, cart_id, product_id } = item;
    const itemKey = `${cart_id}-${product_id}`;
    
    // Если товар в процессе удаления, не показываем его
    if (removingItems[itemKey]) return null;
    
    // Используем локальное количество для отображения
    const displayQuantity = localQuantities[itemKey] !== undefined ? localQuantities[itemKey] : quantity;
    
    // Проверяем, загружается ли этот элемент
    const isItemLoading = loadingItems[itemKey];

    return (
        <div className="flex flex-col items-start gap-4 border-b border-gray-200 py-6 last:border-0 md:flex-row md:items-center md:gap-6">
            {/* Изображение продукта */}
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                <ImageWithFallback
                    src={product?.image}
                    alt={product?.name}
                    className="h-full w-full object-cover transition-transform hover:scale-110"
                />
            </div>

            {/* Информация о продукте */}
            <div className="min-w-0 flex-grow">
                <h3 className="mb-1 truncate text-lg font-medium text-gray-900">
                    <Link
                        href={route('product.detail', product?.id)}
                        className="transition-colors hover:text-primary"
                    >
                        {product?.name || 'Товар'}
                    </Link>
                </h3>

                {product?.variants && product.variants.length > 0 && (
                    <div className="mb-1 text-sm text-gray-500">
                        Вариант: {product.variants.join(', ')}
                    </div>
                )}

                <div className="mt-2 flex flex-col sm:flex-row sm:items-end sm:justify-between">
                    <div className="mb-2 sm:mb-0">
                        <QuantitySelector
                            quantity={displayQuantity}
                            onChange={(newQuantity) => handleQuantityChange(itemKey, newQuantity)}
                            loading={isItemLoading}
                            min={1}
                            max={100}
                            size="medium"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <PromotionPrice 
                                product={product}
                                size="medium"
                            />
                        </div>
                        
                        <button
                            onClick={() => handleRemoveItem(itemKey)}
                            className="group flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 p-1 hover:bg-red-50 hover:text-red-500"
                            title="Удалить товар"
                        >
                            <TrashIcon className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 