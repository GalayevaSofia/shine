/**
 * Модуль для форматирования телефонных номеров
 */

/**
 * Форматирование телефонного номера
 * @param {string} phone - Номер телефона
 * @returns {string} Отформатированный номер телефона
 */
export const formatPhone = (phone) => {
	if (!phone) return '';

	// Убираем все нецифровые символы
	const digits = phone.replace(/\D/g, '');

	// Если номер начинается с 7 или 8, форматируем как российский
	if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
		return digits.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 ($2) $3-$4-$5');
	}

	// Для других номеров просто возвращаем исходное значение
	return phone;
};

/**
 * Очистка номера телефона от всех нецифровых символов
 * @param {string} phone - Номер телефона
 * @returns {string} Очищенный номер телефона (только цифры)
 */
export const cleanPhoneNumber = (phone) => {
	if (!phone) return '';

	// Убираем все нецифровые символы
	return phone.replace(/\D/g, '');
};

/**
 * Проверка валидности российского номера телефона
 * @param {string} phone - Номер телефона для проверки
 * @returns {boolean} Результат проверки
 */
export const isValidRussianPhone = (phone) => {
	if (!phone) return false;

	// Очищаем номер от нецифровых символов
	const digits = cleanPhoneNumber(phone);

	// Проверяем, что это российский номер (11 цифр, начинается с 7 или 8)
	return digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'));
};

/**
 * Форматирование номера телефона для международного отображения
 * @param {string} phone - Номер телефона
 * @returns {string} Международный формат номера
 */
export const formatInternationalPhone = (phone) => {
	if (!phone) return '';

	// Очищаем номер от нецифровых символов
	const digits = cleanPhoneNumber(phone);

	// Форматируем российский номер
	if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
		return `+7${digits.substring(1)}`;
	}

	// Если не российский и длина не менее 10 цифр, пробуем форматировать как международный
	if (digits.length >= 10) {
		// Предполагаем, что это международный номер, добавляем +
		return `+${digits}`;
	}

	// Для остальных случаев возвращаем как есть
	return phone;
}; 