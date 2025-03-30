import React from 'react';
import { Link } from '@inertiajs/react';
import ImageWithFallback from '@/Components/UI/ImageWithFallback';

export default function ProductCard({ product, href, children }) {
    return (
        <div className="rounded-lg p-1.5 sm:p-2 md:p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
            <Link href={href || `/products/${product.slug}`}>
                <div className="aspect-w-1 aspect-h-1 w-full mb-1.5 sm:mb-2 md:mb-3">
                    <ImageWithFallback
                        src={product.image || product.images?.[0]?.url}
                        alt={product.name}
                        className="w-full rounded-lg h-[70px] sm:h-[90px] md:h-[120px] object-cover"
                    />
                </div>
                <h4 className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 line-clamp-2">{product.name}</h4>
                {children}
            </Link>
        </div>
    );
} 