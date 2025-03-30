import React from 'react';
import { Link } from '@inertiajs/react';

export default function OutlineButton({ children, href, className = '', onClick }) {
    const baseClasses = "inline-flex items-center justify-center px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 border border-[#8072DB] text-[#8072DB] text-xs sm:text-sm rounded-md hover:bg-[#8072DB] hover:text-white transition-colors";
    
    if (href) {
        return (
            <Link 
                href={href}
                className={`${baseClasses} ${className}`}
            >
                {children}
            </Link>
        );
    }
    
    return (
        <button 
            onClick={onClick}
            className={`${baseClasses} ${className}`}
        >
            {children}
        </button>
    );
} 