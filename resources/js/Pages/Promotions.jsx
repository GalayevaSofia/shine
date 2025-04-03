import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Components/Layout/MainLayout';
import LoadingIndicator from '@/Components/UI/LoadingIndicator';
import ErrorState from '@/Components/UI/ErrorState';
import PageTitle from '@/Components/UI/PageTitle';
import PromotionCard from '@/Components/Promotions/PromotionCard';
import EmptyPromotions from '@/Components/Promotions/EmptyPromotions';
import usePromotions from '@/hooks/usePromotions';
import useAnimateSections from '@/hooks/useAnimateSections';

const Promotions = ({ initialPromotions = [] }) => {
    const { promotions, loading, error, loadPromotions } = usePromotions(initialPromotions);
    
    // Состояние для отслеживания видимости секций
    const [animateSection, setAnimateSection] = useState({
        title: false,
        promotions: false
    });
    
    // Подключаем хук для анимации секций при скролле
    useAnimateSections(setAnimateSection);

    return (
        <MainLayout>
            <Head title="Акции и скидки">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
            </Head>

            <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-10">
                {/* Заголовок с анимацией */}
                <div id="promotion-title-section" className={`${animateSection.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700`}>
                    <PageTitle>Акции и скидки</PageTitle>
                </div>

                {loading ? (
                    <LoadingIndicator size="large" message="Загрузка акций..." />
                ) : error ? (
                    <ErrorState 
                        title="Ошибка загрузки акций" 
                        message={error} 
                        onRetry={loadPromotions}
                    />
                ) : promotions.length === 0 ? (
                    <EmptyPromotions />
                ) : (
                    <div id="promotions-section" className={`space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 ${animateSection.promotions ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700 delay-100`}>
                        {promotions.map((promotion, index) => (
                            <div
                                key={promotion.id}
                                className="opacity-0 translate-y-8 animate-item-fade-in"
                                style={{ 
                                    animationDelay: `${200 + index * 100}ms`,
                                    animationFillMode: 'forwards'
                                }}
                            >
                                <PromotionCard promotion={promotion} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default Promotions; 
