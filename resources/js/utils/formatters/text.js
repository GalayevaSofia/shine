/**
 * Модуль для форматирования текстовых данных
 */

/**
 * Обрезание текста до указанной длины
 * @param {string} text - Исходный текст
 * @param {number} maxLength - Максимальная длина
 * @param {string} suffix - Суффикс для обрезанного текста
 * @returns {string} Обрезанный текст
 */
export const truncateText = (text, maxLength = 100, suffix = '...') => {
	if (!text) return '';

	if (text.length <= maxLength) return text;

	return text.substring(0, maxLength) + suffix;
};

/**
 * Преобразование первой буквы текста в заглавную
 * @param {string} text - Исходный текст
 * @returns {string} Текст с заглавной первой буквой
 */
export const capitalizeFirstLetter = (text) => {
	if (!text) return '';

	return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Форматирование текста для отображения в URL (slug)
 * @param {string} text - Исходный текст
 * @returns {string} Текст, пригодный для URL
 */
export const slugify = (text) => {
	if (!text) return '';

	// Транслитерация кириллицы
	const translitMap = {
		'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
		'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
		'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
		'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
		'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
	};

	// Приводим к нижнему регистру и заменяем кириллицу по карте транслитерации
	const transliterated = text.toLowerCase().split('').map(char => {
		return translitMap[char] || char;
	}).join('');

	// Заменяем все не буквенно-цифровые символы на дефис
	return transliterated
		.replace(/[^a-z0-9]/g, '-') // заменяем не буквенно-цифровые символы на дефис
		.replace(/-+/g, '-')        // заменяем несколько дефисов подряд на один
		.replace(/^-|-$/g, '');     // удаляем дефисы в начале и конце строки
};

/**
 * Форматирование числа с разбиением на разряды
 * @param {number|string} number - Число для форматирования
 * @param {string} separator - Разделитель разрядов
 * @returns {string} Число с разделенными разрядами
 */
export const formatNumberWithSeparator = (number, separator = ' ') => {
	if (number === null || number === undefined) return '';

	// Преобразуем в строку
	const numStr = String(number);

	// Проверяем, является ли числом
	if (isNaN(Number(numStr))) return numStr;

	// Разбиваем на группы по 3 цифры с конца
	return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

/**
 * Преобразование текста в HTML-безопасный формат
 * @param {string} html - Исходный HTML-текст
 * @returns {string} Безопасный текст без HTML-тегов
 */
export const stripHtml = (html) => {
	if (!html) return '';

	// Создаем временный элемент div
	const temp = document.createElement('div');
	temp.innerHTML = html;

	// Возвращаем текстовое содержимое без HTML-тегов
	return temp.textContent || temp.innerText || '';
}; 