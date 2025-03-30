import React from 'react';
import { formatDate } from '@/utils';
import { useMediaQuery } from 'react-responsive';
import ImageWithFallback from '@/Components/UI/ImageWithFallback';
import Badge from '@/Components/UI/Badge';

export default function PromotionHeader({ promotion }) {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 sm:mb-8 md:mb-10">
            <div className="p-4 sm:p-6">
                <div className="flex flex-col md:flex-row md:items-start mb-4 sm:mb-6">
                    {promotion.image && (
                        <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6 lg:mr-8">
                            <ImageWithFallback
                                src={promotion.image}
                                alt={promotion.title}
                                className="w-full h-auto rounded-lg object-cover"
                                style={{ maxHeight: isMobile ? '200px' : '300px', objectFit: 'cover', width: '100%' }}
                            />
                        </div>
                    )}
                    <div className="flex-1">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-gray-800">{promotion.title}</h1>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-3 sm:mb-4">{promotion.description}</p>
                        <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <Badge variant="primary" className="px-2 sm:px-4 py-1">
                                Скидка {promotion.discount_percentage}%
                            </Badge>
                            <Badge variant="secondary" className="px-2 sm:px-4 py-1">
                                До {formatDate(promotion.end_date)}
                            </Badge>
                        </div>
                        {promotion.code && (
                            <div className="mt-3 sm:mt-4">
                                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Используйте промокод при оформлении заказа:</p>
                                <div className="bg-gray-100 border border-gray-300 rounded px-3 sm:px-4 py-1.5 sm:py-2 inline-block font-mono text-sm sm:text-lg">
                                    {promotion.code}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 