import React, { useMemo } from 'react';

/**
 * Хук для работы с данными страницы контактов
 * 
 * @returns {Object} - Объект с данными для страницы контактов
 */
export default function useContactData() {
	// Контактная информация
	const contactInfo = useMemo(() => [
		{
			icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
			</svg>,
			title: 'Адрес',
			content: 'г. Москва, ул. Тверская, д. 1',
			subContent: 'Ежедневно с 10:00 до 22:00'
		},
		{
			icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
			</svg>,
			title: 'Телефон',
			links: [
				{ href: 'tel:+79991234567', text: '+7 (999) 123-45-67' },
				{ href: 'tel:+79997654321', text: '+7 (999) 765-43-21' }
			]
		},
		{
			icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
			</svg>,
			title: 'Email',
			links: [
				{ href: 'mailto:info@shine.ru', text: 'info@shine.ru' },
				{ href: 'mailto:support@shine.ru', text: 'support@shine.ru' }
			]
		},
		{
			icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
			</svg>,
			title: 'Соцсети',
			socialLinks: [
				{ href: '#', text: 'VK' },
				{ href: '#', text: 'Telegram' },
				{ href: '#', text: 'WhatsApp' }
			]
		}
	], []);

	// FAQ
	const faqItems = useMemo(() => [
		{
			question: 'Как оформить заказ?',
			answer: 'Добавьте товары в корзину, перейдите к оформлению и следуйте инструкциям на экране. Вы можете выбрать доставку или самовывоз.'
		},
		{
			question: 'Какие способы оплаты доступны?',
			answer: 'Мы принимаем оплату банковскими картами, электронными кошельками и наличными при получении заказа.'
		},
		{
			question: 'Как долго идет доставка?',
			answer: 'Доставка по Москве занимает 1-2 дня, по России — от 3 до 10 дней в зависимости от региона.'
		},
		{
			question: 'Можно ли вернуть товар?',
			answer: 'Да, вы можете вернуть неиспользованный товар в течение 14 дней с момента получения. Для этого свяжитесь с нашей службой поддержки.'
		}
	], []);

	// Карта
	const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.397087693!2d37.59935611584507!3d55.75857699923669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0KLQstC10YDRgdC60LDRjyDRg9C7LiwgMSwg0JzQvtGB0LrQstCwLCAxMjUwMDk!5e0!3m2!1sru!2sru!4v1635444444444!5m2!1sru!2sru";

	return {
		contactInfo,
		faqItems,
		mapSrc,
		pageHeader: {
			title: 'Контакты',
			highlightedText: 'Сияй',
			subtitle: 'Мы всегда готовы ответить на ваши вопросы'
		}
	};
} 