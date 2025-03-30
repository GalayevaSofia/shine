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
				'stats-section': 'stats',
				'tabs-section': 'tabs',
				'team-section': 'team',
				'cta-section': 'cta'
			};

			Object.entries(sections).forEach(([sectionId, stateName]) => {
				const section = document.getElementById(sectionId);
				if (section && scrollPosition > section.offsetTop + 100) {
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