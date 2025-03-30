import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { formatDate } from '@/utils';
import { useMediaQuery } from 'react-responsive';

const HomePromotions = ({ title = "Акции и скидки", limit = 3 }) => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isSmallMobile = useMediaQuery({ maxWidth: 480 });

    useEffect(() => {
        loadPromotions();
    }, []);

    const loadPromotions = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/promotions?limit=${limit}`);
            if (response.data.success) {
                setPromotions(response.data.data.promotions);
                setError(null);
            } else {
                setError(response.data.message || 'Не удалось загрузить акции');
            }
        } catch (err) {
            setError('Ошибка при загрузке акций');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="py-6 sm:py-8">
                <div className="container mx-auto px-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center">{title}</h2>
                    <div className="flex justify-center py-6 sm:py-8">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-[#8072DB] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return null; // Скрываем секцию, если есть ошибка
    }

    if (promotions.length === 0) {
        return null; // Скрываем секцию, если нет акций
    }

    return (
        <div className="py-6 sm:py-8 md:py-12 bg-gray-50">
            <div className="container mx-auto px-3 sm:px-6">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{title}</h2>
                    <Link 
                        href="/promotions" 
                        className="text-[#8072DB] hover:text-[#B86FBF] text-xs sm:text-sm md:text-base font-medium inline-flex items-center"
                    >
                        Все акции
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {promotions.map((promotion) => (
                        <div key={promotion.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
                            <Link href={`/promotions/${promotion.slug}`}>
                                {promotion.image && (
                                    <div className="aspect-w-16 aspect-h-9">
                                        <img
                                            src={promotion.image}
                                            alt={promotion.title}
                                            className="w-full h-[160px] sm:h-[180px] md:h-[200px] object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-3 sm:p-4">
                                    <div className="flex gap-1.5 sm:gap-2 mb-2 flex-wrap">
                                        <span className="bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] text-white px-1.5 sm:px-2 py-0.5 rounded-full text-xs">
                                            Скидка {promotion.discount_percentage}%
                                        </span>
                                        <span className="bg-gray-100 text-gray-700 px-1.5 sm:px-2 py-0.5 rounded-full text-xs">
                                            До {formatDate(promotion.end_date)}
                                        </span>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 text-gray-800 line-clamp-1">{promotion.title}</h3>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{promotion.description}</p>
                                    
                                    <div className="text-[#8072DB] hover:text-[#B86FBF] text-xs sm:text-sm font-medium inline-flex items-center">
                                        Подробнее
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePromotions; 