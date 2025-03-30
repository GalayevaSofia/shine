import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Components/Layout/MainLayout';
import AboutBanner from '@/Components/About/AboutBanner';
import StatisticsSection from '@/Components/About/StatisticsSection';
import CompanyTabs from '@/Components/About/CompanyTabs';
import TeamSection from '@/Components/About/TeamSection';
import CTASection from '@/Components/About/CTASection';
import useAnimateSections from '@/hooks/useAnimateSections';

// Данные о команде
const members = [
    {
        id: 1,
        name: 'Анна Петрова',
        role: 'Основатель',
        image: 'https://images.unsplash.com/photo-1618333453613-2ccb4967e610?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        quote: 'Красота должна быть доступна каждому'
    },
    {
        id: 2,
        name: 'Мария Иванова',
        role: 'Главный косметолог',
        image: 'https://images.unsplash.com/photo-1450297756549-a553121ddff2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D',
        quote: 'Забота о коже - это инвестиция в будущее'
    },
    {
        id: 3,
        name: 'Елена Сидорова',
        role: 'Визажист',
        image: 'https://images.unsplash.com/photo-1613423755148-0ff5515d60be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHdvbWVuJTIwZmFzaGlvbnxlbnwwfDF8Mnx8fDI%3D',
        quote: 'Макияж - это искусство быть собой'
    }
];

// Данные статистики
const stats = [
    { value: '1000+', label: 'Довольных клиентов' },
    { value: '500+', label: 'Товаров' },
    { value: '50+', label: 'Брендов' },
    { value: '24/7', label: 'Поддержка' }
];

// Данные ценностей
const values = [
    { title: 'Качество', description: 'Мы тщательно отбираем каждый продукт, работая только с проверенными брендами.' },
    { title: 'Забота', description: 'Индивидуальный подход к каждому клиенту - основа нашей работы.' },
    { title: 'Инновации', description: 'Мы следим за последними тенденциями и регулярно обновляем ассортимент.' },
    { title: 'Доступность', description: 'Качественная косметика должна быть доступна каждому.' }
];

// История компании
const history = [
    { year: '2024', title: 'Основание', description: 'Открытие первого онлайн-магазина с тщательно подобранным ассортиментом.' },
    { year: '2024', title: 'Развитие', description: 'Расширение ассортимента и запуск программы лояльности.' },
    { year: '2024', title: 'Будущее', description: 'Планы по открытию офлайн-магазинов и расширению географии доставки.' }
];

// Основной компонент страницы
export default function About() {
    const [activeTab, setActiveTab] = useState('mission');
    const [animateSection, setAnimateSection] = useState({
        stats: false,
        tabs: false,
        team: false,
        cta: false
    });

    // Хук для анимации секций при скролле
    useAnimateSections(setAnimateSection);

    return (
        <MainLayout>
            <Head title="О нас">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            
            {/* Верхний баннер */}
            <AboutBanner />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
                {/* Статистика */}
                <StatisticsSection stats={stats} isVisible={animateSection.stats} />

                {/* Табы */}
                <CompanyTabs 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    values={values} 
                    history={history} 
                    isVisible={animateSection.tabs} 
                />

                {/* Команда */}
                <TeamSection members={members} isVisible={animateSection.team} />

                {/* Призыв к действию */}
                <CTASection isVisible={animateSection.cta} />
            </main>
        </MainLayout>
    );
} 