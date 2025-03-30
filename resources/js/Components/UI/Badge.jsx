import React from 'react';

const variants = {
    primary: "bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] text-white",
    secondary: "bg-gray-100 text-gray-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-700",
};

export default function Badge({ children, variant = 'primary', className = '' }) {
    const baseClasses = "px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm";
    const variantClass = variants[variant] || variants.primary;

    return (
        <span className={`${baseClasses} ${variantClass} ${className}`}>
            {children}
        </span>
    );
} 