/**
 * Модуль форматтеров экспортирует все вспомогательные функции для форматирования данных
 */

// Реэкспортируем все функции из специализированных модулей
export { formatPrice, formatPriceWithDiscount, formatPriceWithVAT } from './formatters/price';
export { formatDate, formatRelativeDate, formatDateRange } from './formatters/date';
export { formatPhone, cleanPhoneNumber, isValidRussianPhone, formatInternationalPhone } from './formatters/phone';
export { truncateText, capitalizeFirstLetter, slugify, formatNumberWithSeparator, stripHtml } from './formatters/text';
export { formatFileSize, parseFileSize, getBestUnit } from './formatters/fileSize'; 