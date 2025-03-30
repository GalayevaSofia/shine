import React from 'react';

export default function ProductNotifications({ addToCartSuccess, addToCartError }) {
    return (
        <>
            {addToCartSuccess && (
                <div className="animate-fade-in mb-6 flex items-center rounded-lg border border-green-100 bg-green-50 p-4 text-green-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Товар успешно добавлен в корзину
                </div>
            )}

            {addToCartError && (
                <div className="animate-fade-in mb-6 flex items-center rounded-lg border border-red-100 bg-red-50 p-4 text-red-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.344-5.25a57.159 57.159 0 0 0-2.58-1.408A2.25 2.25 0 0 0 16.5 4.5h-9a2.25 2.25 0 0 0-2.264 1.092 57.355 57.355 0 0 0-2.58 1.408 2.25 2.25 0 0 0-1.15 1.966v7.5a2.25 2.25 0 0 0 1.15 1.966 57.503 57.503 0 0 0 2.58 1.408 2.25 2.25 0 0 0 2.264 1.092h9a2.25 2.25 0 0 0 2.264-1.092 57.503 57.503 0 0 0 2.58-1.408 2.25 2.25 0 0 0 1.15-1.966v-7.5a2.25 2.25 0 0 0-1.15-1.966ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                    {addToCartError}
                </div>
            )}
        </>
    );
} 