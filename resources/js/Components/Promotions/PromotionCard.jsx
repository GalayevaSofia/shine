import React from 'react';
import { Link } from '@inertiajs/react';
import { formatDate } from '@/utils';
import { useMediaQuery } from 'react-responsive';
import ImageWithFallback from '@/Components/UI/ImageWithFallback';
import Badge from '@/Components/UI/Badge';
import PromotionProducts from './PromotionProducts';

const GRADIENT_CLASS = "bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA]";
const BADGE_CLASS = "px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm";

export default function PromotionCard({ promotion }) {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isSmallMobile = useMediaQuery({ maxWidth: 480 });
    
    const getVisibleProductCount = () => isSmallMobile ? 2 : 4;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
            <div className="p-3 sm:p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-6 mb-3 sm:mb-4">
                    {promotion.image && (
                        <div className="md:w-1/4 mb-3 md:mb-0">
                            <ImageWithFallback
                                src={promotion.image}
                                alt={promotion.title}
                                className="w-full h-auto rounded-lg object-cover"
                                style={{ 
                                    maxHeight: isSmallMobile ? '120px' : isMobile ? '150px' : '200px', 
                                    objectFit: 'cover', 
                                    width: '100%' 
                                }}
                            />
                        </div>
                    )}
                    <div className="flex-1">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-gray-800">{promotion.title}</h2>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3 line-clamp-3">{promotion.description}</p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                            <Badge variant="primary">
                                Скидка {promotion.discount_percentage}%
                            </Badge>
                            <Badge variant="secondary">
                                До {formatDate(promotion.end_date)}
                            </Badge>
                        </div>
                        <Link
                            href={`/promotions/${promotion.slug}`}
                            className="text-[#8072DB] hover:text-[#B86FBF] font-medium text-xs sm:text-sm md:text-base inline-flex items-center"
                        >
                            Подробнее об акции
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {promotion.products?.length > 0 && (
                    <PromotionProducts 
                        products={promotion.products}
                        promotionSlug={promotion.slug}
                        visibleCount={getVisibleProductCount()}
                    />
                )}
            </div>
        </div>
    );
} 