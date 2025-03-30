import React from 'react';
import { Link } from '@inertiajs/react';
import EmptyState from '@/Components/UI/EmptyState';
import CartIcons from './CartIcons';

/**
 * Компонент для отображения состояния, когда требуется авторизация
 */
export default function AuthRequiredState() {
    const { UserIcon } = CartIcons();
    
    return (
        <EmptyState
            title="Необходима авторизация"
            message="Для доступа к корзине необходимо войти в аккаунт или зарегистрироваться"
            icon={<UserIcon />}
            iconClassName="bg-blue-100"
            className="p-10"
        >
            <div className="flex gap-4">
                <Link
                    href={route('login')}
                    className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] px-6 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
                >
                    Войти
                </Link>
                <Link
                    href={route('register')}
                    className="flex items-center justify-center gap-2 rounded-lg border border-primary/80 bg-white px-6 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
                >
                    Зарегистрироваться
                </Link>
            </div>
        </EmptyState>
    );
} 