/**
 * Модуль для форматирования дат
 */

/**
 * Форматирование даты
 * @param {string|Date} date - Дата для форматирования
 * @param {boolean} includeTime - Включать ли время в результат
 * @returns {string} Отформатированная дата
 */
export const formatDate = (date, includeTime = false) => {
	if (!date) return '';

	const dateObj = date instanceof Date ? date : new Date(date);

	// Проверяем, валидная ли дата
	if (isNaN(dateObj.getTime())) return '';

	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	if (includeTime) {
		options.hour = '2-digit';
		options.minute = '2-digit';
	}

	return dateObj.toLocaleDateString('ru-RU', options);
};

/**
 * Форматирование даты в относительном формате (сегодня, вчера, 5 дней назад и т.д.)
 * @param {string|Date} date - Дата для форматирования
 * @returns {string} Отформатированная дата в относительном формате
 */
export const formatRelativeDate = (date) => {
	if (!date) return '';

	const dateObj = date instanceof Date ? date : new Date(date);

	// Проверяем, валидная ли дата
	if (isNaN(dateObj.getTime())) return '';

	const now = new Date();
	const diffTime = now - dateObj;
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays === 0) {
		return 'Сегодня';
	} else if (diffDays === 1) {
		return 'Вчера';
	} else if (diffDays < 7) {
		return `${diffDays} ${getDaysWord(diffDays)} назад`;
	} else if (diffDays < 30) {
		const weeks = Math.floor(diffDays / 7);
		return `${weeks} ${getWeeksWord(weeks)} назад`;
	} else if (diffDays < 365) {
		const months = Math.floor(diffDays / 30);
		return `${months} ${getMonthsWord(months)} назад`;
	} else {
		return formatDate(dateObj);
	}
};

/**
 * Получение правильной формы слова "день" в зависимости от числа
 * @param {number} days - Количество дней
 * @returns {string} Форма слова "день"
 */
const getDaysWord = (days) => {
	if (days >= 5 && days <= 20) return 'дней';
	const remainder = days % 10;
	if (remainder === 1) return 'день';
	if (remainder >= 2 && remainder <= 4) return 'дня';
	return 'дней';
};

/**
 * Получение правильной формы слова "неделя" в зависимости от числа
 * @param {number} weeks - Количество недель
 * @returns {string} Форма слова "неделя"
 */
const getWeeksWord = (weeks) => {
	if (weeks >= 5 && weeks <= 20) return 'недель';
	const remainder = weeks % 10;
	if (remainder === 1) return 'неделю';
	if (remainder >= 2 && remainder <= 4) return 'недели';
	return 'недель';
};

/**
 * Получение правильной формы слова "месяц" в зависимости от числа
 * @param {number} months - Количество месяцев
 * @returns {string} Форма слова "месяц"
 */
const getMonthsWord = (months) => {
	if (months >= 5 && months <= 20) return 'месяцев';
	const remainder = months % 10;
	if (remainder === 1) return 'месяц';
	if (remainder >= 2 && remainder <= 4) return 'месяца';
	return 'месяцев';
};

/**
 * Форматирование диапазона дат
 * @param {string|Date} startDate - Начальная дата
 * @param {string|Date} endDate - Конечная дата
 * @param {boolean} includeTime - Включать ли время
 * @returns {string} Отформатированный диапазон дат
 */
export const formatDateRange = (startDate, endDate, includeTime = false) => {
	if (!startDate || !endDate) return '';

	const startObj = startDate instanceof Date ? startDate : new Date(startDate);
	const endObj = endDate instanceof Date ? endDate : new Date(endDate);

	// Проверяем, валидные ли даты
	if (isNaN(startObj.getTime()) || isNaN(endObj.getTime())) return '';

	return `${formatDate(startObj, includeTime)} — ${formatDate(endObj, includeTime)}`;
}; 