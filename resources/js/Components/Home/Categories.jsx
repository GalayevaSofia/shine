import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';

/**
 * Компонент отображения одной категории
 */
function CategoryCard({ category }) {
    return (
        <Link
            key={category.id}
            href={route('catalog', { category: category.id })}
            className="group"
        >
            <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg shadow-md transition-all duration-300 group-hover:shadow-lg">
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-transparent transition-all duration-300 group-hover:from-gray-900/40 group-hover:via-gray-800/30 group-hover:to-transparent"></div>
                <img
                    src={category.image || '/images/placeholder.svg'}
                    alt={category.name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                    onError={(e) => {
                        e.target.src = '/images/placeholder.svg';
                    }}
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                        {category.name}
                    </h3>
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-200">
                        {category.description}
                    </p>
                    <div className="mt-4 sm:mt-6">
                        <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-900 shadow-md transition-all duration-300 group-hover:bg-white group-hover:shadow-lg">
                            Подробнее
                            <svg
                                className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 text-[#8072DB]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

/**
 * Компонент секции категорий товаров
 */
export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Запасные категории на случай, если из API ничего не пришло
    const fallbackCategories = [
        {
            id: 1,
            name: 'Уход за лицом',
            description: 'Очищение, тонизирование, увлажнение',
            image: '/images/categories/face-care.jpg',
            slug: 'uxod-za-licom',
        },
        {
            id: 2,
            name: 'Макияж',
            description: 'Декоративная косметика для создания идеального образа',
            image: '/images/categories/makeup.jpg',
            slug: 'makiiaz',
        },
        {
            id: 3,
            name: 'Уход за телом',
            description: 'Все для красоты и здоровья вашей кожи',
            image: '/images/categories/body-care.jpg',
            slug: 'uxod-za-telom',
        },
        {
            id: 4,
            name: 'Ароматы',
            description: 'Парфюмерия для особых моментов',
            image: '/images/categories/fragrance.jpg',
            slug: 'aromaty',
        },
    ];

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories/featured');
            if (response.data.success) {
                setCategories(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Используем данные из API или запасные категории
    const displayCategories = categories.length > 0 ? categories : fallbackCategories;

    return (
        <section className="py-10 sm:py-12 lg:py-16 bg-white">
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
                {/* Заголовок секции */}
                <div className="mb-8 sm:mb-12 lg:mb-16 flex flex-col items-center text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                        Категории
                    </h2>
                    <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base lg:text-lg text-gray-700">
                        Исследуйте нашу коллекцию премиальных средств для создания вашего идеального образа
                    </p>
                </div>

                {/* Состояние загрузки */}
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="border-gradient-to-r h-12 w-12 animate-spin rounded-full border-4 border-t-transparent from-[#E6A8D7] via-[#B8C0FF] to-[#BBD0FF]"></div>
                    </div>
                ) : categories.length === 0 && fallbackCategories.length === 0 ? (
                    <p className="text-center text-gray-500">
                        Категории не найдены
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {displayCategories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
