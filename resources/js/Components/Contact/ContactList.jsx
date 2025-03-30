import React from 'react';
import ContactItem from './ContactItem';
import MapDisplay from './MapDisplay';

/**
 * Компонент для отображения списка контактной информации
 * 
 * @param {Array} contactInfo - Массив контактной информации
 * @param {string} mapSrc - URL для встраивания карты
 */
export default function ContactList({ contactInfo, mapSrc }) {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {contactInfo.map((item, index) => (
                    <ContactItem
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        content={item.content}
                        subContent={item.subContent}
                        links={item.links}
                        socialLinks={item.socialLinks}
                    />
                ))}
            </div>

            {mapSrc && (
                <div className="mt-4">
                    <MapDisplay src={mapSrc} />
                </div>
            )}
        </div>
    );
} 