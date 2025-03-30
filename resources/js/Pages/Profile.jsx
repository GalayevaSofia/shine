// import Navigation from '@/Components/Navigation';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MainLayout from '@/Components/Layout/MainLayout';
import { formatDate } from '@/utils';
import { useAuth } from '@/Context/AuthContext';
import GradientButton from '@/Components/UI/GradientButton';
import GradientHeading from '@/Components/UI/GradientHeading';
import { useCart } from '@/Context/CartContext';
import { useMediaQuery } from 'react-responsive';
import ProfileTabs from '@/Components/Profile/ProfileTabs';
import ProfileForm from '@/Components/Profile/ProfileForm';
import OrdersList from '@/Components/Profile/OrdersList';
import WishlistItems from '@/Components/Profile/WishlistItems';
import Notification from '@/Components/UI/Notification';
import useProfile from '@/hooks/useProfile';

// Общие стили
const GRADIENT_BG = "bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA]";
const GRADIENT_TEXT = "bg-size-200 animate-gradient bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent";
const ACTIVE_TAB = `${GRADIENT_BG} text-white shadow-md`;
const INACTIVE_TAB = "border border-gray-200 text-gray-600 hover:bg-gray-100";
const INPUT_CLASS = "w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-800 transition-all focus:border-[#8072DB] focus:outline-none focus:ring-2 focus:ring-[#8072DB]/30";
const SUBMIT_BUTTON = "bg-size-200 transform animate-gradient rounded-full bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] px-8 py-3 font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:opacity-95 active:scale-[0.98] disabled:opacity-50";

export default function Profile({
    initialTab = 'profile',
    mustVerifyEmail = false,
    status = null,
}) {
    const profile = useProfile(initialTab);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <MainLayout>
            <Head title="Профиль" />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
                <h1 className="text-4xl font-bold text-gray-900">
                    Личный{' '}
                    <span className={GRADIENT_TEXT}>кабинет</span>
                </h1>
            </div>

            {/* Logout button */}
            <div className="absolute right-8 top-24">
                <button
                    onClick={profile.handleLogout}
                    className="rounded-full border border-gray-200 px-6 py-2 text-sm text-gray-600 shadow-sm transition-all hover:border-[#8072DB] hover:text-[#8072DB] hover:shadow-md"
                >
                    Выйти
                </button>
            </div>

            {/* Tabs */}
            <ProfileTabs 
                activeTab={profile.activeTab} 
                setActiveTab={profile.setActiveTab} 
            />

            {/* Notification */}
            <Notification 
                show={profile.notification.show} 
                message={profile.notification.message} 
                type={profile.notification.type} 
            />

            {/* Tab content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {profile.activeTab === 'profile' && (
                    <ProfileForm 
                        data={profile.data}
                        setData={profile.setData}
                        errors={profile.errors}
                        processing={profile.processing}
                        showSuccessMessage={profile.showSuccessMessage}
                        handleSubmit={profile.handleSubmit}
                    />
                )}

                {profile.activeTab === 'orders' && (
                    <OrdersList 
                        orders={profile.orders}
                        isLoading={profile.isOrdersLoading}
                        showSuccessMessage={profile.showSuccessMessage}
                        flash={profile.flash}
                        formatPrice={profile.formatPrice}
                    />
                )}

                {profile.activeTab === 'wishlist' && (
                    <WishlistItems 
                        wishlistItems={profile.wishlistItems}
                        isLoading={profile.isLoading}
                        authStatus={profile.authStatus}
                        auth={profile.auth}
                        calculateDiscount={profile.calculateDiscount}
                        handleAddToCart={profile.handleAddToCart}
                        removeFromWishlist={profile.removeFromWishlist}
                        formatPrice={profile.formatPrice}
                        getImageUrl={profile.getImageUrl}
                    />
                )}
            </div>
        </MainLayout>
    );
}
