/**
 * Вспомогательные функции
 * Реэкспорт из модулей форматтеров и других утилит для обратной совместимости
 */

// Реэкспортируем функции из модуля форматтеров
export {
    formatDate,
    formatPrice,
    truncateText,
    formatFileSize,
    capitalizeFirstLetter,
    slugify
} from '../utils/formatters';

// Реэкспортируем функции из модуля генераторов
export { generateId } from './generators';