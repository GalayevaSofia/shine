import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Components/Layout/MainLayout';
import LoadingIndicator from '@/Components/UI/LoadingIndicator';
import ErrorState from '@/Components/UI/ErrorState';
import CartEmptyState from '@/Components/Checkout/CartEmptyState';
import CheckoutForm from '@/Components/Checkout/CheckoutForm';
import useCheckout from '@/hooks/useCheckout';

/**
 * Страница оформления заказа
 */
export default function Checkout() {
    const {
        cart,
        cartLoading,
        cartError,
        cartTotal,
        discount,
        delivery,
        total,
        data,
        errors,
        processing,
        handleSubmit,
        handleInputChange,
        handleRetryLoading,
        formatPrice,
        formatPhoneNumber
    } = useCheckout();
    
    // Определение состояния страницы
    const getPageContent = () => {
        if (cartLoading) {
            return <LoadingIndicator size="large" message="Загрузка данных оформления заказа..." />;
        }
        
        if (cartError) {
            return (
                <ErrorState 
                    title="Ошибка загрузки корзины" 
                    message={cartError}
                    retryText="Попробовать снова"
                    onRetry={handleRetryLoading}
                />
            );
        }
        
        if (!cart.items || cart.items.length === 0) {
            return <CartEmptyState />;
        }
        
        return (
            <CheckoutForm 
                data={data}
                errors={errors}
                processing={processing}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                cartItems={cart.items}
                cartTotal={cartTotal}
                discount={discount}
                delivery={delivery}
                total={total}
                formatPrice={formatPrice}
                formatPhoneNumber={formatPhoneNumber}
            />
        );
    };

    return (
        <MainLayout>
            <Head title="Оформление заказа" />
            <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
                {getPageContent()}
            </div>
        </MainLayout>
    );
}
