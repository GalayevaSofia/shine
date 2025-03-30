import React from 'react';

export default function DescriptionTab({ product }) {
    return (
        <div className="space-y-4 leading-relaxed text-gray-700">
            {product.description ? (
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">О товаре</h3>
                    <div className="prose max-w-none">
                        {product.description.split('\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-3">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center rounded-lg bg-gray-50 p-8 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Описание товара не заполнено</span>
                </div>
            )}
        </div>
    );
} 