/**
 * УСТАРЕВШИЙ МОДУЛЬ
 * Сохранен для обратной совместимости
 * 
 * Для нового кода рекомендуется использовать:
 * import { funcName } from '@/utils';
 * 
 * @deprecated Используйте импорт из '@/utils' вместо этого файла
 */

// Реэкспортируем функции из модуля форматтеров
export { formatPrice, formatDate, truncateText, formatFileSize } from './utils/formatters';

// Добавляем комментарий для поддержки обратной совместимости
// Предыдущие определения:
//
// export const formatPrice = (price) => {
// 	return new Intl.NumberFormat('ru-RU', {
// 		style: 'currency',
// 		currency: 'RUB',
// 		minimumFractionDigits: 0,
// 		maximumFractionDigits: 0
// 	}).format(price);
// };
//
// export const formatDate = (dateString) => {
//     const date = new Date(dateString);
//
//     if (isNaN(date)) {
//         return 'Некорректная дата';
//     }
//
//     return new Intl.DateTimeFormat('ru-RU', {
//         day: '2-digit',
//         month: 'long',
//         year: 'numeric'
//     }).format(date);
// };