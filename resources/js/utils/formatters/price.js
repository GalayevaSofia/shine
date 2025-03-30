/**
 * Модуль для форматирования ценовых значений
 */

/**
 * Форматирование цены в рублях
 * @param {number|string} price - Цена для форматирования
 * @param {boolean} showCurrency - Показывать ли символ валюты
 * @param {number} minimumFractionDigits - Минимальное количество дробных разрядов
 * @param {number} maximumFractionDigits - Максимальное количество дробных разрядов
 * @returns {string} Отформатированная цена
 */
export const formatPrice = (price, showCurrency = true, minimumFractionDigits = 0, maximumFractionDigits = 0) => {
	if (price === null || price === undefined) return '';

	// Преобразуем строку в число, если необходимо
	const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

	// Проверяем, что цена - число
	if (isNaN(numericPrice)) return '';

	return new Intl.NumberFormat('ru-RU', {
		style: showCurrency ? 'currency' : 'decimal',
		currency: 'RUB',
		minimumFractionDigits,
		maximumFractionDigits,
	}).format(numericPrice);
};

/**
 * Форматирование цены с учетом скидки
 * @param {number|string} price - Оригинальная цена
 * @param {number|string} discountedPrice - Цена со скидкой
 * @returns {Object} Объект с форматированными ценами и процентом скидки
 */
export const formatPriceWithDiscount = (price, discountedPrice) => {
	if (price === null || price === undefined || discountedPrice === null || discountedPrice === undefined) {
		return {
			originalPrice: '',
			discountedPrice: '',
			discountPercentage: 0,
			hasDiscount: false
		};
	}

	// Преобразуем в числа
	const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
	const numericDiscountedPrice = typeof discountedPrice === 'string' ? parseFloat(discountedPrice) : discountedPrice;

	// Проверка на валидные числа
	if (isNaN(numericPrice) || isNaN(numericDiscountedPrice)) {
		return {
			originalPrice: '',
			discountedPrice: '',
			discountPercentage: 0,
			hasDiscount: false
		};
	}

	// Расчет процента скидки
	const discountPercentage = numericDiscountedPrice < numericPrice
		? Math.round((1 - numericDiscountedPrice / numericPrice) * 100)
		: 0;

	return {
		originalPrice: formatPrice(numericPrice),
		discountedPrice: formatPrice(numericDiscountedPrice),
		discountPercentage,
		hasDiscount: discountPercentage > 0
	};
};

/**
 * Форматирование суммы с НДС
 * @param {number|string} amount - Сумма без НДС
 * @param {number} vatRate - Ставка НДС (20 для 20%)
 * @returns {Object} Объект с ценой с НДС и суммой НДС
 */
export const formatPriceWithVAT = (amount, vatRate = 20) => {
	if (amount === null || amount === undefined) {
		return {
			priceWithVAT: '',
			vatAmount: ''
		};
	}

	// Преобразуем в число
	const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

	// Проверка на валидное число
	if (isNaN(numericAmount)) {
		return {
			priceWithVAT: '',
			vatAmount: ''
		};
	}

	// Расчет НДС и цены с НДС
	const vatAmount = numericAmount * (vatRate / 100);
	const priceWithVAT = numericAmount + vatAmount;

	return {
		priceWithVAT: formatPrice(priceWithVAT),
		vatAmount: formatPrice(vatAmount)
	};
}; 