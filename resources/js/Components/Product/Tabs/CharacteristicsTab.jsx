import React from 'react';

export default function CharacteristicsTab({ product }) {
    // Helper function to render star rating
    const renderStarRating = (rating) => {
        return (
            <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => {
                    const currentRating = rating || 0;
                    // Determine star type (full, half, empty)
                    let starType = 'empty'; // Default empty
                    
                    if (i < Math.floor(currentRating)) {
                        starType = 'full'; // Full star for whole values
                    } else if (i === Math.floor(currentRating) && currentRating % 1 >= 0.25 && currentRating % 1 < 0.75) {
                        starType = 'half'; // Half star for .25 to .75
                    } else if (i === Math.floor(currentRating) && currentRating % 1 >= 0.75) {
                        starType = 'full'; // Full star for >= .75
                    }
                    
                    return (
                        <div key={i} className="relative">
                            {/* Empty star (background) */}
                            <svg className="h-4 w-4 text-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            
                            {/* Full or half star */}
                            {starType !== 'empty' && (
                                <div className={`absolute inset-0 overflow-hidden ${starType === 'half' ? 'w-1/2' : 'w-full'}`}>
                                    <svg className="h-4 w-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="bg-gradient-to-r from-[#B86FBF]/10 via-[#8072DB]/10 to-[#5A8BEA]/10 px-4 py-3">
                    <h3 className="text-base font-semibold text-gray-900">
                        Основная информация
                    </h3>
                </div>
                <div className="divide-y divide-gray-200 px-4 py-4">
                    {product.weight && (
                        <div className="flex items-center justify-between py-3">
                            <span className="text-sm text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 inline-block h-4 w-4 text-[#8072DB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                </svg>
                                Вес
                            </span>
                            <span className="font-medium">{product.weight}</span>
                        </div>
                    )}
                    {product.volume && (
                        <div className="flex items-center justify-between py-3">
                            <span className="text-sm text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 inline-block h-4 w-4 text-[#8072DB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                Объем
                            </span>
                            <span className="font-medium">{product.volume}</span>
                        </div>
                    )}
                    {(product.rating !== undefined || product.average_rating) && (
                        <div className="flex items-center justify-between py-3">
                            <span className="text-sm text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 inline-block h-4 w-4 text-[#8072DB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                Рейтинг
                            </span>
                            <div className="flex items-center">
                                {renderStarRating(product.average_rating || product.rating)}
                                <span className="ml-2 font-medium">
                                    {parseFloat(product.average_rating || product.rating || 0).toFixed(1)}
                                    <span className="ml-1 text-xs text-gray-500">
                                        {product.reviews_count ? `(${product.reviews_count} отзывов)` : ''}
                                    </span>
                                </span>
                            </div>
                        </div>
                    )}
                    {product.manufacturer && (
                        <div className="flex items-center justify-between py-3">
                            <span className="text-sm text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 inline-block h-4 w-4 text-[#8072DB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Производитель
                            </span>
                            <span className="font-medium">{product.manufacturer}</span>
                        </div>
                    )}
                </div>
            </div>
            
            {product.ingredients && (
                <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                    <div className="bg-gradient-to-r from-[#B86FBF]/10 via-[#8072DB]/10 to-[#5A8BEA]/10 px-4 py-3">
                        <h3 className="text-base font-semibold text-gray-900">
                            Состав
                        </h3>
                    </div>
                    <div className="px-4 py-4">
                        <ul className="list-inside list-disc space-y-2 text-sm text-gray-600">
                            {product.ingredients.split(/[,.;]+/).map((ingredient, idx) => {
                                const trimmed = ingredient.trim();
                                return trimmed ? (
                                    <li key={idx} className="py-1">
                                        {trimmed.charAt(0).toUpperCase() + trimmed.slice(1)}
                                    </li>
                                ) : null;
                            }).filter(Boolean)}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
} 