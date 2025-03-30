import React from 'react';

export default function Notification({ show, message, type = 'success' }) {
    if (!show) return null;
    
    return (
        <div
            className={`animate-fade-in fixed right-4 top-20 z-50 max-w-xs rounded-lg p-4 shadow-lg ${
                type === 'success'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    : 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
            }`}
        >
            <div className="flex items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d={type === 'success' 
                            ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            : "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        }
                        clipRule="evenodd"
                    />
                </svg>
                <span>{message}</span>
            </div>
        </div>
    );
} 