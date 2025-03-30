import React from 'react';
import MainLayout from '@/Components/Layout/MainLayout';
import HomeHeader from '@/Components/Home/Header';
import Hero from '@/Components/Home/Hero';
import Categories from '@/Components/Home/Categories';
import Features from '@/Components/Home/Features';
import Partners from '@/Components/Home/Partners';
import FeaturedProducts from '@/Components/Home/FeaturedProducts';
import HomeContainer from '@/Components/Home/HomeContainer';

/**
 * Главная страница магазина
 * Содержит основные компоненты: герой-баннер, категории, преимущества, 
 * популярные товары и партнеры
 */
export default function Welcome() {
    return (
        <MainLayout fullWidth={true}>
            <HomeHeader />
            
            {/* Полноширинный герой-баннер */}
            <Hero />
            
            <HomeContainer>
                {/* Категории, преимущества и популярные товары */}
                <Categories />
                <Features />
                <FeaturedProducts />
                <Partners />
            </HomeContainer>
        </MainLayout>
    );
}