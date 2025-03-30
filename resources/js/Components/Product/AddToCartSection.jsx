import React from 'react';
import QuantitySelector from '@/Components/UI/QuantitySelector';
import WishlistButton from '@/Components/WishlistButton';

const GRADIENT_BTN = "bg-size-200 flex transform items-center gap-2 rounded-full bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] px-6 py-3 font-semibold text-white shadow-md transition-all hover:scale-105 hover:opacity-95 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70";

export default function AddToCartSection({ 
    product, 
    quantity, 
    setQuantity, 
    isAddingToCart, 
    handleAddToCart 
}) {
    if (product.stock <= 0) {
        return (
            <div className="rounded-lg bg-gray-50 p-4 text-gray-700">
                В настоящее время товар отсутствует на складе.
                Оставьте свой email, чтобы получить уведомление, когда товар появится в наличии.
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center gap-4">
                <span className="text-gray-600">Количество:</span>
                <QuantitySelector
                    quantity={quantity}
                    onChange={setQuantity}
                    min={1}
                    max={Math.min(10, product.stock)}
                    size="medium"
                />
            </div>

            <div className="flex gap-3">
                <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className={GRADIENT_BTN}
                >
                    {isAddingToCart ? (
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                        </svg>
                    )}
                    {isAddingToCart ? 'Добавление...' : 'Добавить в корзину'}
                </button>

                <WishlistButton productId={product.id} />
            </div>
        </>
    );
} 