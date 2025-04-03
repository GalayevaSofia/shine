import React from 'react';
import { useMediaQuery } from 'react-responsive';

// Gradients and styles
const GRADIENT_BG = "bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA]";
const ACTIVE_TAB = `${GRADIENT_BG} text-white shadow-md`;
const INACTIVE_TAB = "border border-gray-200 text-gray-600 hover:bg-gray-100";

export default function ProfileTabs({ activeTab, setActiveTab }) {
    const isMobile = useMediaQuery({ maxWidth: 640 });
    
    const tabs = [
        { id: 'profile', label: 'Профиль' },
        { id: 'orders', label: 'Заказы' },
        { id: 'wishlist', label: 'Избранное' }
    ];
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row justify-center'} space-y-2 sm:space-y-0 sm:space-x-4`}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                            activeTab === tab.id ? ACTIVE_TAB : INACTIVE_TAB
                        } ${isMobile ? 'w-full' : ''}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
} 