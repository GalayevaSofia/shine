import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Components/Layout/MainLayout';
import LoadingIndicator from '@/Components/UI/LoadingIndicator';
import ErrorState from '@/Components/UI/ErrorState';
import PageTitle from '@/Components/UI/PageTitle';
import PromotionCard from '@/Components/Promotions/PromotionCard';
import EmptyPromotions from '@/Components/Promotions/EmptyPromotions';
import usePromotions from '@/hooks/usePromotions';

const Promotions = ({ initialPromotions = [] }) => {
    const { promotions, loading, error, loadPromotions } = usePromotions(initialPromotions);

    return (
        <MainLayout>
            <Head title="Акции и скидки">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
            </Head>

            <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-10">
                <PageTitle>Акции и скидки</PageTitle>

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
                    <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
                        {promotions.map((promotion) => (
                            <PromotionCard key={promotion.id} promotion={promotion} />
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default Promotions; 
