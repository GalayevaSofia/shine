import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-white relative">
            {/* Градиентная линия сверху */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] animate-gradient bg-size-200"></div>
            
            <div className="max-w-[1440px] mx-auto py-16 px-4 sm:px-6 lg:px-8">
                {/* Верхняя секция с колонками */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent animate-gradient bg-size-200">
                            О компании
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    О нас
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacts" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Контакты
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent animate-gradient bg-size-200">
                            Покупателям
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/promotions" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Акции и скидки
                                </Link>
                            </li>
                            <li>
                                <Link href="/delivery" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Доставка
                                </Link>
                            </li>
                            <li>
                                <Link href="/payment" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Оплата
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent animate-gradient bg-size-200">
                            Каталог
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/catalog?category=face-care" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Уход за лицом
                                </Link>
                            </li>
                            <li>
                                <Link href="/catalog?category=makeup" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Макияж
                                </Link>
                            </li>
                            <li>
                                <Link href="/catalog?category=body-care" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Уход за телом
                                </Link>
                            </li>
                            <li>
                                <Link href="/catalog?category=hair-care" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Уход за волосами
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent animate-gradient bg-size-200">
                            Контакты
                        </h3>
                        <ul className="space-y-4">
                            <li className="text-sm text-gray-600">
                                <span className="block text-gray-900 mb-1">Телефон:</span>
                                <a href="tel:+79991234567" className="hover:text-gray-900 transition-colors">
                                    +7 (999) 123-45-67
                                </a>
                            </li>
                            <li className="text-sm text-gray-600">
                                <span className="block text-gray-900 mb-1">Email:</span>
                                <a href="mailto:info@shine.ru" className="hover:text-gray-900 transition-colors">
                                    info@shine.ru
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Нижняя секция с копирайтом */}
                <div className="mt-16 pt-8 relative">
                    {/* Градиентная линия сверху */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] animate-gradient bg-size-200"></div>
                    
                    <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                        <p className="text-sm text-gray-600">
                            © 2024 Сияй. Все права защищены.
                        </p>
                        <div className="flex space-x-6">
                            <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                Политика конфиденциальности
                            </Link>
                            <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                Условия использования
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
} 