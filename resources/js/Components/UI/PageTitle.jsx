import React from 'react';

export default function PageTitle({ children, className = '' }) {
    return (
        <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center ${className}`}>
            <span className="bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent animate-gradient bg-size-200">
                {children}
            </span>
        </h1>
    );
} 