import { Link } from '@inertiajs/react';

export default function GradientButton({
    children,
    href = null,
    type = 'button',
    className = '',
    loading = false,
    disabled = false,
    onClick = null,
    small = false,
}) {
    const baseClasses = `bg-size-200 inline-block transform animate-gradient rounded-full bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] ${small ? 'text-sm' : ''} font-semibold text-white shadow-md transition-all hover:scale-105 hover:opacity-95 active:scale-95 ${disabled ? 'opacity-70 cursor-not-allowed' : ''} ${className}`;

    const buttonClasses = `${baseClasses} ${small ? 'px-4 py-2' : 'px-8 py-3'}`;

    // Если есть href, создаем Link, иначе button
    if (href) {
        return (
            <Link href={href} className={buttonClasses}>
                {loading ? (
                    <span className="flex items-center justify-center">
                        <svg
                            className="mr-2 h-4 w-4 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Загрузка...
                    </span>
                ) : (
                    children
                )}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? (
                <span className="flex items-center justify-center">
                    <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    Загрузка...
                </span>
            ) : (
                children
            )}
        </button>
    );
}
