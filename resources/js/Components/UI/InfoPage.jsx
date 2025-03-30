import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Components/Layout/MainLayout';
import GradientHeading from '@/Components/UI/GradientHeading';

export default function InfoPage({ title, heading, sections }) {
    return (
        <MainLayout>
            <Head title={`${title} - Shine`} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <GradientHeading level={1} centered className="mb-10">
                    {heading}
                </GradientHeading>
                
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
                    {sections.map((section, index) => (
                        <div 
                            key={index} 
                            className={`p-8 border-b ${index !== sections.length - 1 ? 'border-gray-100' : 'border-transparent'} ${index % 2 === 1 ? 'bg-gradient-to-r from-purple-50 to-blue-50' : ''}`}
                        >
                            {section.icon && section.title ? (
                                <div className="flex items-start">
                                    <div className={`shrink-0 bg-gradient-to-r ${index % 2 === 0 ? 'from-[#B86FBF] to-[#8072DB]' : 'from-[#8072DB] to-[#5A8BEA]'} p-3 rounded-lg text-white mr-5`}>
                                        {section.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent mb-3">
                                            {section.title}
                                        </h2>
                                        <div className="space-y-3 text-gray-700">
                                            {section.content}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-lg text-gray-700 leading-relaxed">
                                    {section.content}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
} 