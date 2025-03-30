import React from 'react';
import { ShieldCheckIcon, TruckIcon, SparklesIcon, HeartIcon } from '@heroicons/react/24/outline';

/**
 * Компонент для отображения одного преимущества
 */
function FeatureCard({ feature }) {
    const { name, description, icon: Icon } = feature;
    
    return (
        <div
            className="relative rounded-2xl bg-gray-50 p-5 sm:p-6 md:p-8 shadow-sm border border-transparent bg-gradient-to-r from-[#B86FBF]/10 via-[#8072DB]/10 to-[#5A8BEA]/10 animate-gradient bg-size-200 transition-all duration-300 hover:shadow-md"
        >
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] animate-gradient bg-size-200">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
            </div>
            <h3 className="mt-4 sm:mt-6 text-base sm:text-lg font-semibold text-gray-900">{name}</h3>
            <p className="mt-1 sm:mt-2 text-sm text-gray-600">{description}</p>
        </div>
    );
}

/**
 * Список преимуществ компании
 */
const features = [
    {
        name: 'Оригинальная продукция',
        description: 'Мы являемся официальным представителем популярных брендов косметики',
        icon: ShieldCheckIcon,
    },
    {
        name: 'Быстрая доставка',
        description: 'Доставляем заказы по всей России в кратчайшие сроки',
        icon: TruckIcon,
    },
    {
        name: 'Широкий ассортимент',
        description: 'В нашем каталоге представлены самые популярные и трендовые косметические продукты',
        icon: SparklesIcon,
    },
    {
        name: 'Программа лояльности',
        description: 'Получайте бонусы за покупки и эксклюзивные скидки на любимые бренды',
        icon: HeartIcon,
    },
];

/**
 * Компонент секции преимуществ компании
 */
export default function Features() {
    return (
        <div className="bg-white py-16 sm:py-20 md:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Заголовок секции */}
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">Почему выбирают нас</h2>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-700 max-w-2xl">
                        Мы собрали для вас лучшие косметические бренды в одном месте, чтобы сделать ваши покупки максимально комфортными
                    </p>
                </div>

                {/* Сетка преимуществ */}
                <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <FeatureCard key={feature.name} feature={feature} />
                    ))}
                </div>
            </div>
        </div>
    );
} 