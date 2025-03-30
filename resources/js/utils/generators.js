/**
 * Модуль для генерации различных значений
 * Содержит функции для создания уникальных идентификаторов, токенов, ключей и т.д.
 */

/**
 * Генерирует уникальный строковый ID на основе Math.random()
 * @returns {string} Уникальный ID
 */
export const generateId = () => {
	return Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15);
};

/**
 * Генерирует уникальный UUID v4
 * @returns {string} UUID в формате xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 */
export const generateUUID = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

/**
 * Генерирует случайное целое число в заданном диапазоне
 * @param {number} min - Минимальное значение (включительно)
 * @param {number} max - Максимальное значение (включительно)
 * @returns {number} Случайное целое число
 */
export const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Генерирует случайный цвет в формате HEX
 * @param {boolean} includeHashSign - Включать ли символ # в начале
 * @returns {string} Случайный цвет в формате HEX
 */
export const getRandomColor = (includeHashSign = true) => {
	const hex = Math.floor(Math.random() * 16777215).toString(16);
	// Добавляем нули в начало, если длина меньше 6
	const paddedHex = hex.padStart(6, '0');
	return includeHashSign ? `#${paddedHex}` : paddedHex;
};

/**
 * Генерирует случайный токен для аутентификации
 * @param {number} length - Длина токена
 * @returns {string} Случайный токен
 */
export const generateToken = (length = 32) => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let token = '';

	for (let i = 0; i < length; i++) {
		token += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return token;
}; 