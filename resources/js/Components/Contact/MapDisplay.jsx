import React from 'react';

/**
 * Компонент для отображения карты
 * 
 * @param {string} src - URL для встраивания карты
 * @param {number} height - Высота карты в пикселях
 */
export default function MapDisplay({ src, height = 220 }) {
    return (
        <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <iframe
                src={src}
                width="100%"
                height={height}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Карта местоположения"
            />
        </div>
    );
} 