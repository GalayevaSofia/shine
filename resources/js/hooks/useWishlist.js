import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useForm } from '@inertiajs/react';

// Глобальный кэш статуса избранного
const wishlistCache = new Map();
let csrfTokenInitialized = false;

// Экспортируем кэш для глобального доступа
if (typeof window !== 'undefined') {
	window.wishlistCache = wishlistCache;
}

/**
 * Хук для инициализации CSRF токена
 * @returns {Function} - Функция инициализации токена
 */
export function useCsrfToken() {
	const initializeToken = useCallback(async () => {
		if (csrfTokenInitialized) return;

		try {
			// Используем POST запрос для гарантии обновления CSRF токена
			await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
			csrfTokenInitialized = true;
		} catch (error) {
			console.error('Ошибка получения CSRF токена:', error);
		}
	}, []);

	return initializeToken;
}

/**
 * Хук для работы с кэшем статуса избранного
 * @returns {Object} - Методы для работы с кэшем
 */
export function useWishlistCache() {
	// Получение статуса из кэша
	const getFromCache = useCallback((productId) => {
		if (wishlistCache.has(productId)) {
			return wishlistCache.get(productId);
		}
		return null;
	}, []);

	// Сохранение статуса в кэш
	const saveToCache = useCallback((productId, status) => {
		wishlistCache.set(productId, status);
	}, []);

	// Проверка наличия в кэше
	const hasInCache = useCallback((productId) => {
		return wishlistCache.has(productId);
	}, []);

	return {
		getFromCache,
		saveToCache,
		hasInCache
	};
}

/**
 * Хук для проверки статуса товара в избранном
 * @param {number} productId - ID товара
 * @returns {Object} - Состояние и метод проверки
 */
export function useWishlistStatus(productId) {
	const safeProductId = Number(productId) || 0;
	const { hasInCache, getFromCache, saveToCache } = useWishlistCache();
	const initializeCsrfToken = useCsrfToken();

	// Проверка статуса товара в избранном
	const checkStatus = useCallback(async () => {
		if (safeProductId <= 0) return null;

		// Используем кэш, если данные есть
		if (hasInCache(safeProductId)) {
			return getFromCache(safeProductId);
		}

		try {
			await initializeCsrfToken();
			const response = await axios.get(`/api/wishlist/check/${safeProductId}`, { withCredentials: true });
			if (response.data.success) {
				const status = response.data.inWishlist;
				saveToCache(safeProductId, status);
				return status;
			}
		} catch (error) {
			console.error('Ошибка проверки статуса избранного:', error);
		}

		return null;
	}, [safeProductId, hasInCache, getFromCache, saveToCache, initializeCsrfToken]);

	return { checkStatus };
}

/**
 * Хук для операций с избранным (добавление/удаление)
 * @param {number} productId - ID товара
 * @returns {Function} - Функция переключения статуса
 */
export function useWishlistOperations(productId) {
	const safeProductId = Number(productId) || 0;
	const { saveToCache } = useWishlistCache();
	const initializeCsrfToken = useCsrfToken();
	const { post } = useForm();

	// Функция добавления в избранное
	const addToWishlist = useCallback(async () => {
		if (safeProductId <= 0) return false;

		try {
			await initializeCsrfToken();
			const response = await axios.post(`/api/wishlist/${safeProductId}`, {}, { withCredentials: true });

			if (response.data.success) {
				saveToCache(safeProductId, true);

				// Обновляем глобальное состояние wishlistItems, если оно существует
				if (window.refreshWishlist && typeof window.refreshWishlist === 'function') {
					try {
						window.refreshWishlist();
					} catch (refreshError) {
						console.error('Failed to refresh wishlist:', refreshError);
					}
				}

				return true;
			}
		} catch (error) {
			// Если товар уже в избранном (код 400)
			if (error.response?.status === 400) {
				saveToCache(safeProductId, true);
				return true;
			}

			// Перенаправление на страницу входа при ошибке авторизации
			if (error.response?.status === 401) {
				post(route('login'));
			}

			console.error('Ошибка добавления в избранное:', error);
		}

		return false;
	}, [safeProductId, saveToCache, initializeCsrfToken, post]);

	// Функция удаления из избранного
	const removeFromWishlist = useCallback(async () => {
		if (safeProductId <= 0) return false;

		try {
			await initializeCsrfToken();
			const response = await axios.delete(`/api/wishlist/${safeProductId}`, { withCredentials: true });

			if (response.data.success) {
				saveToCache(safeProductId, false);

				// Обновляем глобальное состояние wishlistItems, если оно существует
				if (window.refreshWishlist && typeof window.refreshWishlist === 'function') {
					try {
						window.refreshWishlist();
					} catch (refreshError) {
						console.error('Failed to refresh wishlist:', refreshError);
					}
				}

				return true;
			}
		} catch (error) {
			console.error('Ошибка удаления из избранного:', error);

			// В случае 404 считаем, что удаление все равно произошло 
			// (товар отсутствует в списке избранного, что и требовалось)
			if (error.response?.status === 404) {
				saveToCache(safeProductId, false);
				return true;
			}

			// Перенаправление на страницу входа при ошибке авторизации
			if (error.response?.status === 401) {
				post(route('login'));
			}
		}

		return false;
	}, [safeProductId, saveToCache, initializeCsrfToken, post]);

	return { addToWishlist, removeFromWishlist };
}

/**
 * Основной хук для управления функциональностью избранного
 * @param {number} productId - ID товара
 * @returns {Object} - Состояние и методы для работы с избранным
 */
export function useWishlist(productId) {
	const safeProductId = Number(productId) || 0;
	const [isInWishlist, setIsInWishlist] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { hasInCache, getFromCache } = useWishlistCache();
	const { checkStatus } = useWishlistStatus(safeProductId);
	const { addToWishlist, removeFromWishlist } = useWishlistOperations(safeProductId);

	// Инициализация состояния
	useEffect(() => {
		let isMounted = true;

		const loadInitialState = async () => {
			// Проверяем кэш сначала
			if (hasInCache(safeProductId)) {
				if (isMounted) {
					setIsInWishlist(getFromCache(safeProductId));
				}
				return;
			}

			// Отложенная загрузка статуса
			const timer = setTimeout(async () => {
				if (!isMounted || safeProductId <= 0) return;

				const status = await checkStatus();
				if (isMounted && status !== null) {
					setIsInWishlist(status);
				}
			}, 100);

			return () => clearTimeout(timer);
		};

		const cleanup = loadInitialState();

		return () => {
			isMounted = false;
			if (cleanup && typeof cleanup === 'function') {
				cleanup();
			}
		};
	}, [safeProductId, hasInCache, getFromCache, checkStatus]);

	// Переключение статуса избранного
	const toggleWishlist = async () => {
		if (isLoading || safeProductId <= 0) return;

		setIsLoading(true);
		try {
			let success;

			if (isInWishlist) {
				success = await removeFromWishlist();
				if (success) setIsInWishlist(false);
			} else {
				success = await addToWishlist();
				if (success) setIsInWishlist(true);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isInWishlist,
		isLoading,
		toggleWishlist
	};
}

/**
 * Хук для пакетной проверки товаров в избранном
 * @param {Array<number>} productIds - Массив ID товаров
 * @returns {Object} - Методы для проверки
 */
export function useBatchWishlistCheck() {
	const { saveToCache } = useWishlistCache();
	const initializeCsrfToken = useCsrfToken();

	// Пакетная проверка статуса товаров
	const checkBatch = useCallback(async (productIds) => {
		if (!productIds || !productIds.length) return {};

		try {
			await initializeCsrfToken();
			const idsParam = productIds.join(',');
			const response = await axios.get(`/api/wishlist/check-batch?ids=${idsParam}`, { withCredentials: true });

			if (response.data.success && response.data.items) {
				// Обновляем кэш
				Object.entries(response.data.items).forEach(([id, status]) => {
					saveToCache(Number(id), status);
				});

				return response.data.items;
			}
		} catch (error) {
			console.error('Ошибка пакетной проверки избранного:', error);
		}

		return {};
	}, [saveToCache, initializeCsrfToken]);

	return { checkBatch };
}