import React from 'react';
import EmptyState from '@/Components/UI/EmptyState';
import icons from '@/utils/icons';

export default function EmptyPromotions() {
    // Using a tag icon from our centralized icons
    const tagIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-12 w-12 text-gray-400"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
        </svg>
    );

    return (
        <EmptyState 
            title="Нет активных акций"
            message="В настоящее время нет действующих акций. Следите за обновлениями, скоро появятся новые выгодные предложения!"
            buttonText="Вернуться на главную"
            buttonLink="/"
            icon={tagIcon}
        />
    );
} 