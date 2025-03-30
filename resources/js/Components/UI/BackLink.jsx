import React from 'react';
import { Link } from '@inertiajs/react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';

export default function BackLink({ href, children, className = '' }) {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    
    return (
        <Link
            href={href}
            className={`inline-flex items-center text-[#8072DB] hover:text-[#B86FBF] font-medium text-sm sm:text-base ${className}`}
        >
            <MdKeyboardArrowLeft className="mr-1" size={isMobile ? 16 : 20} />
            {children}
        </Link>
    );
} 