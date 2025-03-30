import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Components/Layout/MainLayout';
import LoadingIndicator from '@/Components/UI/LoadingIndicator';
import ErrorState from '@/Components/UI/ErrorState';
import PageTitle from '@/Components/UI/PageTitle';
import BackLink from '@/Components/UI/BackLink';
import PromotionHeader from '@/Components/Promotions/PromotionHeader';
import PromotionProductsGrid from '@/Components/Promotions/PromotionProductsGrid';
import usePromotionDetail from '@/hooks/usePromotionDetail';

const CONTAINER_CLASS = "container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10";
const META_VIEWPORT = <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />;

const PromotionDetail = ({ promotion = null, error = null }) => {
    const { isLoading, promotion: currentPromotion, error: errorMessage, calculateDiscount } = usePromotionDetail(promotion, error);

    if (isLoading) {
        return (
            <MainLayout>
                <Head title="Загрузка...">{META_VIEWPORT}</Head>
                <div className={CONTAINER_CLASS}>
                    <LoadingIndicator size="large" message="Загрузка акции..." />
                </div>
            </MainLayout>
        );
    }

    if (errorMessage || !currentPromotion) {
        return (
            <MainLayout>
                <Head title="Ошибка">{META_VIEWPORT}</Head>
                <div className={CONTAINER_CLASS}>
                    <ErrorState 
                        title="Ошибка загрузки акции" 
                        message={errorMessage || "Акция не найдена"} 
                        retryText="Вернуться к списку акций"
                        onRetry={() => window.location.href = '/promotions'}
                    />
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Head title={currentPromotion.title}>{META_VIEWPORT}</Head>
            
            <div className={CONTAINER_CLASS}>
                <div className="mb-4 sm:mb-6">
                    <BackLink href="/promotions">
                        Вернуться к списку акций
                    </BackLink>
                </div>

                <PromotionHeader promotion={currentPromotion} />

                <PageTitle className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                    Товары, участвующие в акции
                </PageTitle>
                
                <PromotionProductsGrid 
                    products={currentPromotion.products} 
                    calculateDiscount={calculateDiscount}
                />
            </div>
        </MainLayout>
    );
};

export default PromotionDetail; 