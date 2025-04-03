import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Components/Layout/MainLayout';
import PageHeader from '@/Components/Contact/PageHeader';
import ContactList from '@/Components/Contact/ContactList';
import ContactForm from '@/Components/Contact/ContactForm';
import FaqList from '@/Components/Contact/FaqList';
import useContactData from '@/hooks/useContactData.jsx';
import useAnimateSections from '@/hooks/useAnimateSections';

/**
 * Страница Контакты с анимациями
 */
export default function Contacts() {
    const { contactInfo, faqItems, mapSrc, pageHeader } = useContactData();

    // Состояние для отслеживания видимости секций
    const [animateSection, setAnimateSection] = useState({
        header: false,
        contacts: false,
        form: false
    });
    
    // Подключаем хук для анимации секций при скролле
    useAnimateSections(setAnimateSection);

    return (
        <MainLayout>
            <Head title="Контакты" />
            
            <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-12">
                {/* Заголовок страницы с анимацией */}
                <div id="contact-header-section" className={`${animateSection.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700`}>
                    <PageHeader 
                        title={pageHeader.title}
                        highlightedText={pageHeader.highlightedText}
                        subtitle={pageHeader.subtitle}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Левая колонка: контактная информация и карта с анимацией */}
                    <div id="contact-info-section" className={`lg:col-span-2 ${animateSection.contacts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700 delay-100`}>
                        <ContactList contactInfo={contactInfo} mapSrc={mapSrc} />
                    </div>

                    {/* Правая колонка: форма обратной связи и FAQ с анимацией */}
                    <div id="contact-form-section" className={`lg:col-span-3 ${animateSection.form ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700 delay-200`}>
                        <ContactForm />

                        <div className="mt-4">
                            <FaqList faqItems={faqItems} />
                        </div>
                    </div>
                </div>
            </main>
        </MainLayout>
    );
} 