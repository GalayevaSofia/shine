import React, { useState } from 'react';
import DescriptionTab from './Tabs/DescriptionTab';
import CharacteristicsTab from './Tabs/CharacteristicsTab';
import UsageTab from './Tabs/UsageTab';

const ACTIVE_TAB = "border-b-2 border-[#8072DB] text-[#8072DB] font-semibold";
const INACTIVE_TAB = "text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700";
const TABS = ['description', 'characteristics', 'usage'];
const TAB_NAMES = {
    description: 'Описание',
    characteristics: 'Характеристики',
    usage: 'Применение'
};

export default function ProductTabs({ product, initialTab = 'description' }) {
    const [activeTab, setActiveTab] = useState(initialTab);

    return (
        <div className="mt-12">
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-4 text-sm font-medium transition-colors ${activeTab === tab ? ACTIVE_TAB : INACTIVE_TAB}`}
                        >
                            {TAB_NAMES[tab]}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="py-6">
                {activeTab === 'description' && <DescriptionTab product={product} />}
                {activeTab === 'characteristics' && <CharacteristicsTab product={product} />}
                {activeTab === 'usage' && <UsageTab product={product} />}
            </div>
        </div>
    );
} 