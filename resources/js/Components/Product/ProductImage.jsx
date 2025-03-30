import React from 'react';
import ImageWithFallback from '@/Components/UI/ImageWithFallback';

export default function ProductImage({ image, name }) {
    return (
        <div className="relative aspect-square overflow-hidden rounded-2xl">
            {/* Decorative gradient elements */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#B86FBF]/10 via-[#8072DB]/10 to-[#5A8BEA]/10 opacity-70 blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#5A8BEA]/10 via-[#8072DB]/10 to-[#B86FBF]/10 opacity-70 blur-xl"></div>

            <div className="relative z-10 flex h-full w-full items-center justify-center">
                <ImageWithFallback
                    src={image}
                    alt={name}
                    className="h-full w-full object-contain"
                />
            </div>
        </div>
    );
} 