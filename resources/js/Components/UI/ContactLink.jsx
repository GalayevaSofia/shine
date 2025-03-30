import React from 'react';

export default function ContactLink({ type, value, className = '', children }) {
    const getIcon = () => {
        switch (type) {
            case 'email':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                );
            case 'phone':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    const href = type === 'email' ? `mailto:${value}` : type === 'phone' ? `tel:${value}` : value;
    const defaultStyles = 'inline-flex items-center text-[#8072DB] hover:text-[#6C60C9]';

    return (
        <a href={href} className={`${defaultStyles} ${className}`}>
            {getIcon()}
            {children || value}
        </a>
    );
} 