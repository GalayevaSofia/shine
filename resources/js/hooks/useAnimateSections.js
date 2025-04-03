import { useEffect } from 'react';

/**
 * Хук для анимации секций при скролле
 * @param {Function} setAnimateSection - Функция для установки состояния анимации секций
 */
export default function useAnimateSections(setAnimateSection) {
	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + window.innerHeight;
			const sections = {
				// Секции для страницы About
				'stats-section': 'stats',
				'tabs-section': 'tabs',
				'team-section': 'team',
				'cta-section': 'cta',

				// Секции для страницы Catalog
				'header-section': 'header',
				'filters-section': 'filters',
				'products-section': 'products',

				// Секции для страницы Promotions
				'promotion-title-section': 'title',
				'promotions-section': 'promotions',

				// Секции для страницы деталей акции
				'promotion-navigation-section': 'navigation',
				'promotion-header-section': 'header',
				'promotion-products-section': 'products',

				// Секции для страницы контактов
				'contact-header-section': 'header',
				'contact-info-section': 'contacts',
				'contact-form-section': 'form'
			};

			Object.entries(sections).forEach(([sectionId, stateName]) => {
				const section = document.getElementById(sectionId);
				if (section && scrollPosition > section.offsetTop + 50) {
					setAnimateSection(prev => ({ ...prev, [stateName]: true }));
				}
			});
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll(); // Проверка видимых элементов при загрузке

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [setAnimateSection]);
} 