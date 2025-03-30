import { Link } from '@inertiajs/react';

export default function Breadcrumbs({ items, className = '' }) {
    return (
        <nav
            className={`flex py-3 text-sm ${className}`}
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-gray-500 transition-colors hover:text-[#B86FBF]"
                    >
                        <svg
                            className="mr-2 h-3 w-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 16.5a7.5 7.5 0 1 1 7.5-7.5 7.508 7.508 0 0 1-7.5 7.5Zm0-11a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2h-1V7.5a1 1 0 0 0-1-1Z" />
                        </svg>
                        Главная
                    </Link>
                </li>

                {items.map((item, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <svg
                                className="mx-1 h-3 w-3 text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                            {index === items.length - 1 ? (
                                <span className="ml-1 font-medium text-gray-500 md:ml-2">
                                    {item.name}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="ml-1 text-gray-500 transition-colors hover:text-[#B86FBF] md:ml-2"
                                >
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
