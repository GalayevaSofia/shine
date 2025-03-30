import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Components/Layout/MainLayout';
import PageHeader from '@/Components/Contact/PageHeader';
import ContactList from '@/Components/Contact/ContactList';
import ContactForm from '@/Components/Contact/ContactForm';
import FaqList from '@/Components/Contact/FaqList';
import useContactData from '@/hooks/useContactData.jsx';

/**
 * Страница Контакты
 */
export default function Contacts() {
    const { contactInfo, faqItems, mapSrc, pageHeader } = useContactData();

    return (
        <MainLayout>
            <Head title="Контакты" />
            
            <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-12">
                {/* Заголовок страницы */}
                <PageHeader 
                    title={pageHeader.title}
                    highlightedText={pageHeader.highlightedText}
                    subtitle={pageHeader.subtitle}
                />

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Левая колонка: контактная информация и карта */}
                    <div className="lg:col-span-2">
                        <ContactList contactInfo={contactInfo} mapSrc={mapSrc} />
                    </div>

                    {/* Правая колонка: форма обратной связи и FAQ */}
                    <div className="lg:col-span-3">
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