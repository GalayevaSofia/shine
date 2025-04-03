import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

const PER_PAGE = 20;

/**
 * Хук для управления состоянием и логикой каталога товаров
 * 
 * @param {Object} initialProducts - Начальные данные товаров
 * @param {Object} filters - Начальные фильтры из URL
 * @returns {Object} - Состояние и методы для работы с каталогом
 */
export default function useCatalog(initialProducts, filters) {
	const [products, setProducts] = useState(initialProducts?.data || []);
	const [totalProducts, setTotalProducts] = useState(initialProducts?.total || 0);
	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [initialCategorySlug, setInitialCategorySlug] = useState(filters?.category || '');

	// Нормализация фильтров и их начальное состояние
	const initialFilters = useMemo(() => {
		const normalized = { ...filters };

		// Преобразование строк в числа для ценовых фильтров
		if (normalized.min_price) {
			normalized.min_price = Number(normalized.min_price) || '';
		}

		if (normalized.max_price) {
			normalized.max_price = Number(normalized.max_price) || '';
		}

		return {
			category: '',
			min_price: '',
			max_price: '',
			manufacturer: '',
			in_stock: false,
			new_products: false,
			rating: '',
			sort_by: 'created_at',
			sort_dir: 'desc',
			search: '',
			page: 1,
			...(filters ? normalized : {})
		};
	}, [filters]);

	const [currentFilters, setCurrentFilters] = useState(initialFilters);

	// Поиск категории по slug или id
	const findCategory = (categoriesList, value, bySlug = false) => {
		if (!categoriesList?.length || !value) return null;

		// Конвертирование ID в число если ищем по ID
		const numericId = !bySlug ? Number(value) : null;
		const searchValueIsNumber = !bySlug && !isNaN(numericId);

		// Проверка категорий
		for (const category of categoriesList) {
			// Проверка по slug или id
			if ((bySlug && category.slug === value) ||
				(!bySlug && searchValueIsNumber && category.id === numericId)) {
				return category;
			}

			// Рекурсивный поиск в подкатегориях
			if (category.children?.length) {
				const found = findCategory(category.children, value, bySlug);
				if (found) return found;
			}
		}

		return null;
	};

	// Обновление фильтров и получение данных
	const updateFilters = debounce((newFilters) => {
		setIsLoading(true);

		// Подготовка параметров для API запроса
		const apiParams = { ...newFilters };

		// Преобразуем булевые параметры в строки для корректной передачи через URL
		apiParams.in_stock = apiParams.in_stock === true ? '1' : '0';
		apiParams.new_products = apiParams.new_products === true ? '1' : '0';

		// Убедимся, что параметры сортировки всегда заданы
		if (!apiParams.sort_by) {
			apiParams.sort_by = 'created_at';
		}
		if (!apiParams.sort_dir) {
			apiParams.sort_dir = 'desc';
		}

		// Преобразуем категорию в число, если это возможно
		if (apiParams.category && apiParams.category !== '') {
			const categoryNumber = Number(apiParams.category);
			if (!isNaN(categoryNumber)) {
				apiParams.category = categoryNumber;
			} else {
				delete apiParams.category;
			}
		}

		// Убедимся, что параметры правильно передаются
		if (apiParams.search === undefined) {
			apiParams.search = '';
		}

		// Удаляем пустые параметры (кроме search и manufacturer - их оставляем даже пустыми)
		Object.keys(apiParams).forEach((key) => {
			// Не удалять параметры search, manufacturer, sort_by, sort_dir и булевые параметры
			if (
				(key !== 'search' && key !== 'manufacturer' && key !== 'sort_by' && key !== 'sort_dir' &&
					key !== 'in_stock' && key !== 'new_products' && apiParams[key] === '') ||
				apiParams[key] === null ||
				apiParams[key] === undefined ||
				Number.isNaN(apiParams[key])
			) {
				delete apiParams[key];
			}
		});

		// Обновление URL с новыми параметрами фильтров
		const url = new URL(window.location.href);
		url.searchParams.forEach((_, key) => url.searchParams.delete(key));

		// Добавляем новые параметры
		Object.entries(newFilters).forEach(([key, value]) => {
			// Пропускаем пустые значения и значения по умолчанию, но включаем поиск и manufacturer
			if (
				(key !== 'search' && key !== 'manufacturer' && key !== 'in_stock' && key !== 'new_products' && value === '') ||
				value === null ||
				value === undefined ||
				(key === 'sort_by' && value === 'created_at') ||
				(key === 'sort_dir' && value === 'desc') ||
				(key === 'page' && value === 1) ||
				// Оставляем булевые параметры только если они true
				(key === 'in_stock' && value === false) ||
				(key === 'new_products' && value === false)
			) {
				return;
			}

			// Для категории сохраняем slug вместо ID
			if (key === 'category' && value !== '') {
				const category = findCategory(categories, value);
				if (category?.slug) {
					url.searchParams.set(key, category.slug);
				} else {
					url.searchParams.set(key, value);
				}
			} else {
				url.searchParams.set(key, value);
			}
		});

		// Обновляем URL без перезагрузки страницы
		window.history.pushState({}, '', url.toString());

		// Запрос товаров с фильтрами
		axios.get('/api/catalog', { params: apiParams })
			.then((response) => {
				if (response.data.success) {
					const newProducts = response.data.data.products.data || [];
					const newTotal = response.data.data.products.total || 0;

					setProducts(newProducts);
					setTotalProducts(newTotal);

					// Обновляем категории, если они пришли с сервера
					if (response.data.data.categories?.length) {
						setCategories(response.data.data.categories);
					}
				}
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
			});
	}, 300);

	// Инициализация при первой загрузке
	useEffect(() => {
		// Загрузка категорий если их еще нет
		if (categories.length === 0) {
			axios.get('/api/categories')
				.then((response) => {
					if (response.data.success && response.data.data) {
						const categoriesData = response.data.data;
						setCategories(categoriesData);

						// Если есть initialCategorySlug, ищем соответствующую категорию по slug
						if (initialCategorySlug) {
							const foundCategory = findCategory(categoriesData, initialCategorySlug, true);

							if (foundCategory) {
								// Обновляем фильтры с найденным ID категории
								const updatedFilters = {
									...currentFilters,
									category: foundCategory.id
								};
								setCurrentFilters(updatedFilters);
								updateFilters(updatedFilters);
							}
						}
					}
				})
				.catch((error) => {
					// Ошибка загрузки категорий
				});
		}

		// Если нет initialCategorySlug и есть другие фильтры, применяем их
		if (!initialCategorySlug && Object.keys(currentFilters).some((key) => currentFilters[key])) {
			updateFilters(currentFilters);
		}
	}, []);

	const handleFilterChange = (filters) => {
		// Преобразуем числовые значения
		const formattedFilters = { ...filters };

		if (formattedFilters.min_price) {
			formattedFilters.min_price = Number(formattedFilters.min_price);
		}

		if (formattedFilters.max_price) {
			formattedFilters.max_price = Number(formattedFilters.max_price);
		}

		// Проверка и преобразование категории
		if (formattedFilters.category && formattedFilters.category !== '') {
			const categoryNumber = Number(formattedFilters.category);
			if (!isNaN(categoryNumber)) {
				formattedFilters.category = categoryNumber;
			} else {
				formattedFilters.category = '';
			}
		}

		// Сбрасываем страницу при изменении фильтров
		const updatedFilters = {
			...formattedFilters,
			page: 1,
		};

		// Обновляем состояние и делаем запрос
		setCurrentFilters(updatedFilters);
		updateFilters(updatedFilters);
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
		setCurrentFilters((prev) => ({
			...prev,
			page,
		}));
		updateFilters({ ...currentFilters, page });
	};

	const resetFilters = () => {
		// Полностью очищаем все фильтры
		const resetValues = {
			category: '',
			min_price: '',
			max_price: '',
			manufacturer: '',
			in_stock: false,
			new_products: false,
			rating: '',
			sort_by: 'created_at',
			sort_dir: 'desc',
			search: '',
			page: 1,
		};

		setCurrentFilters(resetValues);
		updateFilters(resetValues);

		// Очищаем параметры URL
		if (window.history && window.history.pushState) {
			const url = new URL(window.location.href);
			// Удаляем все параметры из URL
			for (const key of url.searchParams.keys()) {
				url.searchParams.delete(key);
			}
			window.history.pushState({}, '', url.toString());
		}
	};

	return {
		products,
		totalProducts,
		categories,
		isLoading,
		currentPage,
		currentFilters,
		handleFilterChange,
		handlePageChange,
		resetFilters,
		PER_PAGE
	};
} 