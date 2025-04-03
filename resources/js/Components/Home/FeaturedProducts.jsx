import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import ProductCard from '@/Components/ProductCard';
import LoadingIndicator from '@/Components/UI/LoadingIndicator';
import EmptyState from '@/Components/UI/EmptyState';

const BUTTON_CLASS = "inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] text-white rounded-full hover:opacity-95 transition-colors animate-gradient bg-size-200 text-sm sm:text-base";

/**
 * Компонент для отображения популярных товаров на главной странице
 */
export default function FeaturedProducts() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get('/api/catalog/featured');
                setFeaturedProducts(data.success ? data.data : []);
            } catch (error) {
                console.error('Error fetching featured products:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchFeaturedProducts();
    }, []);

    return (
        <section className="py-8 sm:py-10 lg:py-12 max-w-[1440px] mx-auto">
            <h2 className="text-2xl sm:text-3xl text-center font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-10">
                Популярные <span className="bg-gradient-to-r from-[#E6A8D7] via-[#B8C0FF] to-[#BBD0FF] bg-clip-text text-transparent">товары</span>
            </h2>

            {isLoading ? (
                <LoadingIndicator 
                    message="Загрузка популярных товаров..." 
                    size="medium"
                />
            ) : featuredProducts.length === 0 ? (
                <EmptyState
                    title="Нет рекомендуемых товаров"
                    message="Популярные товары временно недоступны. Пожалуйста, вернитесь позже."
                    buttonText="Перейти в каталог"
                    buttonLink="/catalog"
                    buttonClassName={BUTTON_CLASS}
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
            
            <div className="text-center mt-6 sm:mt-8">
                <Link href="/catalog" className={BUTTON_CLASS}>
                    Перейти в каталог
                </Link>
            </div>
        </section>
    );
} 