/**
 * Модуль для форматирования размеров файлов
 */

/**
 * Форматирование размера файла
 * @param {number} bytes - Размер в байтах
 * @param {number} decimals - Количество десятичных знаков
 * @returns {string} Отформатированный размер
 */
export const formatFileSize = (bytes, decimals = 2) => {
	if (bytes === 0) return '0 Байт';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ', 'ЭБ', 'ЗБ', 'ЙБ'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Преобразование строкового представления размера файла в байты
 * @param {string} sizeStr - Строка с размером файла (например, "5MB", "1.5 ГБ")
 * @returns {number} Размер в байтах или -1 при ошибке
 */
export const parseFileSize = (sizeStr) => {
	if (!sizeStr) return -1;

	// Приводим к нижнему регистру и удаляем пробелы
	const normalized = sizeStr.toLowerCase().replace(/\s+/g, '');

	// Регулярное выражение для извлечения числового значения и единицы измерения
	const match = normalized.match(/^([\d.]+)([a-zа-я]+)$/);

	if (!match) return -1;

	const value = parseFloat(match[1]);
	const unit = match[2];

	if (isNaN(value)) return -1;

	// Коэффициенты для разных единиц измерения
	const unitMap = {
		'b': 1,
		'byte': 1,
		'bytes': 1,
		'байт': 1,
		'байта': 1,
		'байтов': 1,

		'kb': 1024,
		'кб': 1024,
		'килобайт': 1024,

		'mb': 1024 * 1024,
		'мб': 1024 * 1024,
		'мегабайт': 1024 * 1024,

		'gb': 1024 * 1024 * 1024,
		'гб': 1024 * 1024 * 1024,
		'гигабайт': 1024 * 1024 * 1024,

		'tb': 1024 * 1024 * 1024 * 1024,
		'тб': 1024 * 1024 * 1024 * 1024,
		'терабайт': 1024 * 1024 * 1024 * 1024
	};

	if (!(unit in unitMap)) return -1;

	return value * unitMap[unit];
};

/**
 * Получение соответствующей единицы измерения для указанного количества байт
 * @param {number} bytes - Размер в байтах
 * @returns {string} Наиболее подходящая единица измерения
 */
export const getBestUnit = (bytes) => {
	if (bytes === 0) return 'Байт';

	const k = 1024;
	const sizes = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ', 'ЭБ', 'ЗБ', 'ЙБ'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return sizes[i];
}; 