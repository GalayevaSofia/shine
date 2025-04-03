import React from 'react';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';

/**
 * Модальное окно для подтверждения очистки корзины
 * 
 * @param {boolean} show - Показывать ли модальное окно
 * @param {Function} onClose - Функция закрытия модального окна
 * @param {Function} onConfirm - Функция подтверждения очистки корзины
 */
export default function ClearCartModal({ show, onClose, onConfirm }) {
    if (!show) return null;
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Затемнение фона */}
            <div 
                className="absolute inset-0     bg-black bg-opacity-40 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            ></div>
            
            {/* Модальное окно */}
            <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                <div className="absolute right-4 top-4">
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                
                {/* Иконка корзины */}
                <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-red-100 p-3">
                        <TrashIcon className="h-8 w-8 text-red-500" />
                    </div>
                </div>
                
                <h3 className="text-center text-xl font-medium text-gray-900">
                    Очистить корзину
                </h3>
                
                <p className="mt-3 text-center text-gray-600">
                    Вы уверены, что хотите удалить все товары из корзины?
                </p>
                
                <div className="mt-6 flex justify-center gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={onConfirm}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
                    >
                        Очистить
                    </button>
                </div>
            </div>
        </div>
    );
} 