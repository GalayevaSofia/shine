import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Components/Layout/MainLayout';
import LoadingIndicator from '@/Components/UI/LoadingIndicator';
import AuthRequiredState from '@/Components/Cart/AuthRequiredState';
import CartContent from '@/Components/Cart/CartContent';
import CartError from '@/Components/Cart/CartError';
import ClearCartModal from '@/Components/Cart/ClearCartModal';
import useCartPage from '@/hooks/useCartPage';

/**
 * Страница корзины
 */
export default function Cart() {
    const {
        cart,
        loading,
        error,
        localLoading,
        formatPrice,
        getCartTotal,
        getCartDiscount,
        cartItemCount,
        authStatus,
        localQuantities,
        removingItems,
        loadingItems,
        showClearCartModal,
        isEmptyCart,
        handleQuantityChange,
        handleRemoveItem,
        handleRefreshCart,
        handleClearCart,
        openClearCartModal,
        closeClearCartModal
    } = useCartPage();

    // Проверка на неавторизованного пользователя
    if (authStatus === 'unauthenticated') {
        return (
            <MainLayout>
                <Head title="Корзина - Shine" />
                <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <AuthRequiredState />
                </div>
            </MainLayout>
        );
    }

    // Проверка на ошибку загрузки корзины
    if (error) {
        return (
            <MainLayout>
                <Head title="Корзина - Shine" />
                <CartError error={error} refreshCart={handleRefreshCart} />
            </MainLayout>
        );
    }

    // Проверка состояния загрузки
    if (loading || localLoading) {
        return (
            <MainLayout>
                <Head title="Корзина - Shine" />
                <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <LoadingIndicator size="large" message="Загрузка корзины..." />
                </div>
            </MainLayout>
        );
    }

    // Основной рендер
    return (
        <MainLayout>
            <Head title="Корзина - Shine" />
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <CartContent
                    cart={cart}
                    isEmptyCart={isEmptyCart}
                    cartItemCount={cartItemCount}
                    localQuantities={localQuantities}
                    removingItems={removingItems}
                    loadingItems={loadingItems}
                    handleQuantityChange={handleQuantityChange}
                    handleRemoveItem={handleRemoveItem}
                    formatPrice={formatPrice}
                    getCartTotal={getCartTotal}
                    getCartDiscount={getCartDiscount}
                    onClearCart={openClearCartModal}
                />
            </div>
            <ClearCartModal 
                show={showClearCartModal}
                onClose={closeClearCartModal}
                onConfirm={handleClearCart}
            />
        </MainLayout>
    );
}
