import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useCart } from '@/Context/CartContext';

const navigation = [
    { name: 'Главная', routeName: 'home' },
    { name: 'Каталог', routeName: 'catalog' },
    { name: 'Акции', routeName: 'promotions' },
    { name: 'О нас', routeName: 'about' },
    { name: 'Контакты', routeName: 'contacts' },
];

export default function Navigation() {
    // Безопасное получение auth, проверка на undefined
    const { auth = {} } = usePage().props || {};
    const { cart } = useCart();
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const mobileMenuRef = useRef(null);
    const mobileMenuButtonRef = useRef(null);
    
    // Улучшенная функция обработки прокрутки с дебаунсом
    const handleScroll = useCallback(() => {
        const isScrolled = window.scrollY > 20; // Увеличиваем порог для сокращения количества изменений
        if (isScrolled !== scrolled) {
            // Не изменяем состояние слишком часто при небольших колебаниях
            if (isScrolled) {
                setScrolled(true);
            } else {
                // Добавляем небольшую задержку перед сменой с "прокручено" на "не прокручено"
                // для предотвращения мерцания при небольших движениях
                const timer = setTimeout(() => {
                    if (window.scrollY <= 20) {
                        setScrolled(false);
                    }
                }, 150);
                return () => clearTimeout(timer);
            }
        }
    }, [scrolled]);
    
    // Обработчик клика за пределами мобильного меню
    const handleClickOutside = useCallback((event) => {
        if (
            isMobileMenuOpen &&
            mobileMenuRef.current && 
            !mobileMenuRef.current.contains(event.target) &&
            mobileMenuButtonRef.current &&
            !mobileMenuButtonRef.current.contains(event.target)
        ) {
            setIsMobileMenuOpen(false);
        }
    }, [isMobileMenuOpen]);
    
    // Добавляем эффект прокрутки для изменения стиля навигации
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);
    
    // Добавляем обработчик клика для закрытия меню
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [handleClickOutside]);

    // User Actions
    const CartIcon = () => (
        <Link
            href={route('cart')}
            className="text-gray-800 p-2 relative group"
        >
            <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        </Link>
    );
    
    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${
            scrolled 
                ? 'bg-white/90 backdrop-blur-md shadow-lg' 
                : 'bg-white/75 backdrop-blur-sm'
        } border-b border-gray-100`}>
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 relative group">
                        <Link href={route('home')} className="font-bold text-xl relative">
                            <span className="relative inline-block bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent animate-gradient bg-size-200">
                                СИЯЙ
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] group-hover:w-full transition-all duration-300"></span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={route(item.routeName)}
                                    className="text-gray-800 relative group font-semibold"
                                >
                                    <span className="relative inline-block">
                                        {item.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] group-hover:w-full transition-all duration-300"></span>
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* User Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <CartIcon />
                        {auth?.user ? (
                            <Link
                                href={route('profile')}
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] text-sm font-semibold rounded-full text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-sm animate-gradient bg-size-200"
                            >
                                Профиль
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] text-sm font-semibold rounded-full text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-sm animate-gradient bg-size-200"
                            >
                                Войти
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            ref={mobileMenuButtonRef}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none relative group"
                        >
                            <svg
                                className="h-6 w-6 transform group-hover:scale-110 transition-transform duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu с анимацией */}
            <div 
                ref={mobileMenuRef}
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="bg-white border-t border-gray-100 shadow-lg px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={route(item.routeName)}
                            className="block px-3 py-2 text-base font-semibold text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-300"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="flex items-center space-x-4 px-3 py-2">
                        <CartIcon />
                        {auth?.user ? (
                            <Link
                                href={route('profile')}
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] text-sm font-semibold rounded-full text-white hover:opacity-90 transition-all duration-300 shadow-sm animate-gradient bg-size-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Профиль
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] text-sm font-semibold rounded-full text-white hover:opacity-90 transition-all duration-300 shadow-sm animate-gradient bg-size-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Войти
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
} 