import React from 'react';

export default function ProductPrice({ price, originalPrice, discount, className = '' }) {
    return (
        <div className={`flex items-center flex-wrap ${className}`}>
            <span className="font-bold text-[#8072DB] mr-1.5 sm:mr-2 text-xs sm:text-sm">
                {price.toLocaleString()} ₽
            </span>
            {originalPrice && (
                <span className="text-[10px] sm:text-xs text-gray-500 line-through">
                    {originalPrice.toLocaleString()} ₽
                </span>
            )}
        </div>
    );
} 