import React from 'react';
import { Link } from '@inertiajs/react';
import ImageWithFallback from '@/Components/UI/ImageWithFallback';

export default function ProductCard({ product, href, children }) {
    return (
        <div className="rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <Link href={href || `/products/${product.slug}`}>
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                    <ImageWithFallback
                        src={product.image || product.images?.[0]?.url}
                        alt={product.name}
                        className="w-full h-full object-cover product-image transition-all duration-300 hover:scale-105"
                        style={{ mixBlendMode: 'multiply' }}
                    />
                </div>
                <div className="p-1.5 sm:p-2 md:p-3">
                    <h4 className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 line-clamp-2">{product.name}</h4>
                    {children}
                </div>
            </Link>
        </div>
    );
} 