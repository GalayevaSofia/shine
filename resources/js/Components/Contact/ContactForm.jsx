import React, { useState } from 'react';

// Стили
const GRADIENT_BG = "bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA]";
const INPUT_STYLE = "w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 text-sm focus:outline-none focus:ring-1 focus:ring-[#8072DB]/30 focus:border-[#8072DB] hover:border-[#B86FBF] transition-all";

/**
 * Компонент формы обратной связи с анимированными полями
 */
export default function ContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState({ status: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus({
            status: 'success',
            message: 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.'
        });
        // Очистка формы
        setFormData({ name: '', email: '', message: '' });
        // Автоматическое скрытие сообщения об успехе через 5 секунд
        setTimeout(() => setFormStatus({ status: '', message: '' }), 5000);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#B86FBF]/10 via-[#8072DB]/10 to-[#5A8BEA]/10 rounded-full blur-xl opacity-70"></div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4 relative z-10">
                Напишите нам
            </h2>
            
            {formStatus.status && (
                <div className={`mb-4 p-3 rounded-lg text-sm ${formStatus.status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {formStatus.message}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="opacity-0 translate-y-8 animate-item-fade-in" style={{ animationDelay: '50ms', animationFillMode: 'forwards' }}>
                        <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
                            Ваше имя
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={INPUT_STYLE}
                            required
                        />
                    </div>
                    <div className="opacity-0 translate-y-8 animate-item-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                        <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={INPUT_STYLE}
                            required
                        />
                    </div>
                </div>
                <div className="opacity-0 translate-y-8 animate-item-fade-in" style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}>
                    <label htmlFor="message" className="block text-xs font-medium text-gray-700 mb-1">
                        Сообщение
                    </label>
                    <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className={INPUT_STYLE}
                        required
                    />
                </div>
                <div className="opacity-0 translate-y-8 animate-item-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                    <button
                        type="submit"
                        className={`w-full ${GRADIENT_BG} text-white py-2 px-4 rounded-lg font-medium text-sm hover:opacity-95 transition-all animate-gradient bg-size-200 shadow-sm transform hover:scale-[1.01] active:scale-[0.99]`}
                    >
                        Отправить
                    </button>
                </div>
            </form>
        </div>
    );
} 