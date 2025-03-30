import React from 'react';

export default function UsageTab({ product }) {
    const parseUsageInstructions = () => {
        if (!product.usage_instructions) return [];
        
        // First split text by paragraphs
        const paragraphs = product.usage_instructions.split('\n');
        // Then extract sentences from each paragraph
        const sentences = [];
        
        paragraphs.forEach(paragraph => {
            // Split paragraph into sentences (considering periods, exclamation and question marks)
            const paragraphSentences = paragraph
                .split(/(?<=[.!?])\s+/)
                .filter(sentence => sentence.trim().length > 0);
            
            sentences.push(...paragraphSentences);
        });
        
        return sentences;
    };

    return (
        <div className="space-y-4 leading-relaxed text-gray-700">
            {product.usage_instructions ? (
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 text-[#8072DB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Инструкция по применению
                    </h3>
                    <div className="space-y-4 pl-2">
                        {parseUsageInstructions().map((sentence, idx) => (
                            <div key={idx} className="flex items-start">
                                <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                    {idx + 1}
                                </div>
                                <p className="text-gray-700">
                                    {sentence.trim()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center rounded-lg bg-gray-50 p-8 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Инструкция по применению не заполнена</span>
                </div>
            )}
        </div>
    );
} 