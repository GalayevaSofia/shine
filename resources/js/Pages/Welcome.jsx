import React, { useState } from 'react';
import MainLayout from '@/Components/Layout/MainLayout';
import HomeHeader from '@/Components/Home/Header';
import Hero from '@/Components/Home/Hero';
import Categories from '@/Components/Home/Categories';
import Features from '@/Components/Home/Features';
import Partners from '@/Components/Home/Partners';
import FeaturedProducts from '@/Components/Home/FeaturedProducts';
import HomeContainer from '@/Components/Home/HomeContainer';
import useAnimateSections from '@/hooks/useAnimateSections';

/**
 * Главная страница магазина
 * Содержит основные компоненты: герой-баннер, категории, преимущества, 
 * популярные товары и партнеры с анимацией при скролле
 */
export default function Welcome() {
    // Состояние для отслеживания видимости секций
    const [animateSection, setAnimateSection] = useState({
        stats: false,
        tabs: false,
        team: false,
        cta: false
    });
    
    // Подключаем хук для анимации секций при скролле
    useAnimateSections(setAnimateSection);

    return (
        <MainLayout fullWidth={true}>
            <HomeHeader />
            
            {/* Полноширинный герой-баннер */}
            <Hero />
            
            <HomeContainer>
                {/* Анимированные секции */}
                
                {/* Категории */}
                <div id="stats-section" className={`mt-10 mb-16 ${animateSection.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000`}>
                    <Categories />
                </div>
                
                {/* Преимущества с анимацией */}
                <div id="tabs-section" className={`${animateSection.tabs ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000`}>
                    <Features />
                </div>
                
                {/* Популярные товары с анимацией */}
                <div id="team-section" className={`mt-12 sm:mt-20 ${animateSection.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000`}>
                    <FeaturedProducts />
                </div>
                
                {/* Партнеры с анимацией */}
                <div id="cta-section" className={`mt-12 sm:mt-20 ${animateSection.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000`}>
                    <Partners />
                </div>
            </HomeContainer>
        </MainLayout>
    );
}