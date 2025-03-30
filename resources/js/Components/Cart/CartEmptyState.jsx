import React from 'react';
import EmptyState from '@/Components/UI/EmptyState';
import CartIcons from './CartIcons';

/**
 * Компонент для отображения пустой корзины
 */
export default function CartEmptyState() {
    const { CartIcon } = CartIcons();
    
    return (
        <EmptyState
            title="Ваша корзина пуста"
            message="Добавьте товары в корзину, чтобы оформить заказ"
            icon={<CartIcon />}
            buttonText="Перейти в каталог"
            buttonLink="/catalog"
            buttonClassName="flex items-center justify-center gap-2 rounded-lg border border-primary/80 bg-white px-6 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
            iconClassName="bg-gray-100"
        />
    );
} 