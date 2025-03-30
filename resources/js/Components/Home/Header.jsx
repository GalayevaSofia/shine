import React from 'react';
import { Head } from '@inertiajs/react';

/**
 * Компонент заголовка для главной страницы
 * Содержит метатеги и SEO-информацию
 */
export default function Header() {
    return (
        <Head>
            <title>Сияй - магазин косметики для ярких личностей</title>
            <meta name="description" content="Премиальная косметика для тех, кто не боится быть собой. Широкий выбор средств для макияжа и ухода за кожей." />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
            <meta name="keywords" content="косметика, макияж, уход за кожей, премиум, красота" />
            <meta property="og:title" content="Сияй - магазин косметики для ярких личностей" />
            <meta property="og:description" content="Премиальная косметика для тех, кто не боится быть собой" />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Сияй - магазин косметики для ярких личностей" />
            <meta name="twitter:description" content="Премиальная косметика для тех, кто не боится быть собой" />
        </Head>
    );
} 