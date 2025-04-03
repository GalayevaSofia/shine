import React, { useState } from 'react';

// Styles
const INPUT_CLASS = "w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-800 transition-all focus:border-[#8072DB] focus:outline-none focus:ring-2 focus:ring-[#8072DB]/30";
const SUBMIT_BUTTON = "bg-size-200 transform animate-gradient rounded-full bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] px-8 py-3 font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:opacity-95 active:scale-[0.98] disabled:opacity-50";

/**
 * Форматирует телефонный номер в стандартный российский формат
 * 
 * @param {string} phone - Номер телефона в любом формате
 * @returns {string} - Форматированный номер телефона
 */
function formatPhoneNumber(phone) {
    if (!phone) return '+7';
    
    // Удаляем все символы кроме цифр
    const digits = phone.replace(/\D/g, '');
    
    // Обеспечиваем наличие кода страны
    const phoneDigits = digits.startsWith('7') ? digits : (digits.startsWith('8') ? '7' + digits.substring(1) : '7' + digits);
    
    // Проверяем длину и обрезаем до 11 цифр (российский формат)
    const trimmedDigits = phoneDigits.substring(0, 11);
    
    // Если после удаления нецифровых символов и обрезания осталось мало цифр
    if (trimmedDigits.length <= 1) {
        return '+7';
    }
    
    // Форматируем телефон
    let formattedPhone = '+7';
    
    if (trimmedDigits.length > 1) {
        formattedPhone += ' (' + trimmedDigits.substring(1, Math.min(4, trimmedDigits.length));
    }
    
    if (trimmedDigits.length > 4) {
        formattedPhone += ') ' + trimmedDigits.substring(4, Math.min(7, trimmedDigits.length));
    }
    
    if (trimmedDigits.length > 7) {
        formattedPhone += '-' + trimmedDigits.substring(7, Math.min(9, trimmedDigits.length));
    }
    
    if (trimmedDigits.length > 9) {
        formattedPhone += '-' + trimmedDigits.substring(9, Math.min(11, trimmedDigits.length));
    }
    
    return formattedPhone;
}

export default function ProfileForm({ 
    data, 
    setData, 
    errors = {}, 
    processing,
    showSuccessMessage,
    handleSubmit 
}) {
    // Обработчик изменения телефона с использованием функции форматирования
    const handlePhoneChange = (e) => {
        const value = e.target.value;
        
        // Форматируем номер телефона
        const formattedPhone = formatPhoneNumber(value);
        
        setData('phone', formattedPhone);
    };

    const renderInput = (id, label, type = 'text', value, onChange, error, placeholder = '') => (
        <div>
            <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full rounded-lg border ${
                    error ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 px-4 py-2.5 text-gray-800 transition-all focus:border-[#8072DB] focus:outline-none focus:ring-2 focus:ring-[#8072DB]/30`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );

    return (
        <div className="mx-auto max-w-3xl">
            <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
                {/* Decorative gradient elements */}
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#B86FBF]/10 via-[#8072DB]/10 to-[#5A8BEA]/10 opacity-70 blur-xl"></div>
                <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#B86FBF]/10 via-[#8072DB]/10 to-[#5A8BEA]/10 opacity-70 blur-xl"></div>

                <form
                    onSubmit={handleSubmit}
                    className="relative z-10 space-y-6"
                >
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        Личная информация
                    </h3>
                    
                    {showSuccessMessage && (
                        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4">
                            <div className="flex items-center">
                                <svg
                                    className="h-5 w-5 text-green-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">
                                        Личные данные успешно обновлены
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {renderInput('name', 'Имя', 'text', data.name, 
                        (e) => setData('name', e.target.value), errors.name)}
                    
                    {renderInput('email', 'Email', 'email', data.email, 
                        (e) => setData('email', e.target.value), errors.email)}
                    
                    <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                            Телефон
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={data.phone || ''}
                            onChange={handlePhoneChange}
                            placeholder="+7 (___) ___-__-__"
                            maxLength={18}
                            pattern="\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}"
                            title="Формат: +7 (XXX) XXX-XX-XX"
                            className={`w-full rounded-lg border ${
                                errors.phone ? 'border-red-500' : 'border-gray-300'
                            } bg-gray-50 px-4 py-2.5 text-gray-800 transition-all focus:border-[#8072DB] focus:outline-none focus:ring-2 focus:ring-[#8072DB]/30`}
                        />
                        <p className="mt-1 text-xs text-gray-500">Формат: +7 (XXX) XXX-XX-XX</p>
                        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className={SUBMIT_BUTTON}
                        >
                            Сохранить изменения
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 