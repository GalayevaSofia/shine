import { useEffect, useState } from 'react';
import GradientButton from './GradientButton';

export default function CatalogFilters({
    categories = [],
    currentFilters,
    onFilterChange,
    onResetFilters,
}) {
    const [showFilters, setShowFilters] = useState(false);

    // Убедимся, что currentFilters определен
    useEffect(() => {
        if (!currentFilters) {
            // Ошибка при отсутствии currentFilters
        }
    }, [currentFilters]);

    // Обработчик изменения значения фильтра
    const handleFilterChange = (key, value) => {
        // Проверка наличия currentFilters перед использованием
        if (!currentFilters) return;

        // Обработка числовых значений для цены
        if (key === 'min_price' || key === 'max_price') {
            // Если значение пусто, сохраняем как пустую строку
            // Иначе преобразуем в число
            value = value === '' ? '' : Number(value);
        }

        onFilterChange({
            ...currentFilters,
            [key]: value,
        });
    };

    // Обработчик изменения категории
    const handleCategoryChange = (categoryId) => {
        // Проверка наличия currentFilters перед использованием
        if (!currentFilters) return;

        // Преобразование значения категории в число
        const numericCategoryId = categoryId === '' ? '' : Number(categoryId);

        // Проверка, что преобразованное значение является числом
        if (
            numericCategoryId !== '' &&
            (isNaN(numericCategoryId) || !Number.isInteger(numericCategoryId))
        ) {
            return;
        }

        onFilterChange({
            ...currentFilters,
            category: numericCategoryId,
        });
    };

    // Обработчик изменения сортировки
    const handleSortChange = (event) => {
        // Проверка наличия currentFilters перед использованием
        if (!currentFilters) return;

        const value = event.target.value;
        const [sortBy, sortDir] = value.split(':');
        
        onFilterChange({
            ...currentFilters,
            sort_by: sortBy,
            sort_dir: sortDir,
        });
    };

    // Обработчик сброса фильтров
    const handleResetFilters = () => {
        onResetFilters();
        setShowFilters(false);
    };

    // Функция для проверки соответствия категории фильтру
    const checkCategoryMatch = (categoryId, filterCategoryId) => {
        try {
            // Явно приводим оба значения к числу для сравнения
            const numericCategoryId = Number(categoryId);
            const numericFilterCategoryId = Number(filterCategoryId);

            return numericCategoryId === numericFilterCategoryId;
        } catch (e) {
            return false;
        }
    };

    // Проверяем наличие фильтров (но не сортировки и пагинации)
    const hasActiveFilters = () => {
        if (!currentFilters) return false;

        return Object.entries(currentFilters).some(([key, value]) => {
            // Игнорируем sort_by, sort_dir и page при проверке
            if (
                key === 'sort_by' ||
                key === 'sort_dir' ||
                key === 'page' ||
                key === 'search'
            ) {
                return false;
            }

            // Если категория, проверяем, что есть не пустое значение
            if (key === 'category') {
                return value !== '' && value !== null && value !== undefined;
            }

            // Логические значения (чекбоксы)
            if (typeof value === 'boolean') {
                return value === true;
            }

            // Проверяем, что строковые или числовые значения не пусты
            return value !== '' && value !== null && value !== undefined;
        });
    };

    // Определяем тип интерфейса в зависимости от ширины устройства
    return (
        <div className="mb-6 sm:mb-8">
            {/* Верхняя панель с поиском и мобильной кнопкой фильтров */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                {/* Строка поиска */}
                <div className="mb-3 sm:mb-0 relative flex-1">
                    <form onSubmit={(e) => {
                        e.preventDefault(); // Предотвращаем отправку формы
                        // Явно вызываем обработчик с текущим значением поиска
                        const searchValue = currentFilters?.search || '';
                        onFilterChange({
                            ...currentFilters,
                            search: searchValue
                        });
                    }}>
                        <input
                            type="text"
                            placeholder="Поиск товаров..."
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 pr-10 text-sm shadow-sm focus:border-[#8072DB] focus:outline-none"
                            value={currentFilters?.search || ''}
                            onChange={(e) => {
                                handleFilterChange('search', e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    // Явно вызываем обработчик фильтра при нажатии Enter
                                    onFilterChange({
                                        ...currentFilters,
                                        search: e.target.value
                                    });
                                }
                            }}
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                            aria-label="Искать"
                            onClick={() => {
                                if (currentFilters?.search) {
                                    handleFilterChange('search', '');
                                } else {
                                    // Если поле поиска пустое, запускаем поиск с пустой строкой
                                    onFilterChange({
                                        ...currentFilters,
                                        search: ''
                                    });
                                }
                            }}
                        >
                            {currentFilters?.search ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            )}
                        </button>
                    </form>
                </div>

                {/* Блок с кнопкой фильтров для мобильных и сортировкой */}
                <div className="flex justify-between sm:justify-end gap-3">
                    {/* Кнопка показа/скрытия фильтров на мобильном */}
                    <button
                        className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm md:hidden"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-1.5 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                            />
                        </svg>
                        {showFilters ? 'Скрыть фильтры' : 'Фильтры'}
                        {hasActiveFilters() && (
                            <span className="ml-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#8072DB] text-xs text-white">
                                !
                            </span>
                        )}
                    </button>

                    {/* Сортировка (всегда видима) */}
                    <div className="w-full sm:w-auto">
                        <select
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#8072DB] focus:outline-none sm:w-44 md:w-48"
                            value={`${currentFilters?.sort_by || 'popularity'}:${
                                currentFilters?.sort_dir || 'desc'
                            }`}
                            onChange={(e) => {
                                handleSortChange(e);
                            }}
                        >
                            <option value="popularity:desc">По популярности</option>
                            <option value="price:asc">Сначала дешевле</option>
                            <option value="price:desc">Сначала дороже</option>
                            <option value="name:asc">По алфавиту А-Я</option>
                            <option value="name:desc">По алфавиту Я-А</option>
                            <option value="rating:desc">По рейтингу</option>
                            <option value="created_at:desc">Сначала новые</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Мобильные фильтры (сворачиваемые) */}
            <div
                className={`mb-4 sm:mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all md:hidden ${
                    showFilters
                        ? 'max-h-[2000px] opacity-100'
                        : 'max-h-0 border-0 opacity-0'
                }`}
            >
                <div className="p-3 sm:p-4">
                    {/* Категории */}
                    <div className="mb-4 sm:mb-6">
                        <h3 className="mb-2 text-sm font-medium text-gray-700">
                            Категория
                        </h3>
                        <select
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#8072DB] focus:outline-none"
                            value={currentFilters?.category || ''}
                            onChange={(e) =>
                                handleCategoryChange(e.target.value)
                            }
                        >
                            <option value="">Все категории</option>
                            {categories.map((category) => (
                                <option
                                    key={`mobile-category-${category.id}`}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Цена */}
                    <div className="mb-4 sm:mb-6">
                        <h3 className="mb-2 text-sm font-medium text-gray-700">
                            Цена
                        </h3>
                        <div className="flex space-x-3">
                            <div className="flex-1">
                                <input
                                    type="number"
                                    placeholder="От"
                                    min="0"
                                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#8072DB] focus:outline-none"
                                    value={currentFilters?.min_price || ''}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'min_price',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    type="number"
                                    placeholder="До"
                                    min="0"
                                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#8072DB] focus:outline-none"
                                    value={currentFilters?.max_price || ''}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'max_price',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Производитель */}
                    <div className="mb-4 sm:mb-6">
                        <h3 className="mb-2 text-sm font-medium text-gray-700">
                            Производитель
                        </h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <input
                                type="text"
                                placeholder="Введите названия брендов через запятую"
                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#8072DB] focus:outline-none"
                                value={currentFilters?.manufacturer || ''}
                                onChange={(e) => {
                                    handleFilterChange('manufacturer', e.target.value);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </form>
                        <p className="mt-1 text-xs text-gray-500">
                            Например: Shine Beauty, L'Oreal, Maybelline
                        </p>
                    </div>

                    {/* Дополнительные фильтры */}
                    <div className="mb-4 sm:mb-6 grid grid-cols-1 gap-2 sm:gap-3">
                        <div className="flex items-center">
                            <input
                                id="mobile-in_stock"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-[#8072DB] focus:ring-[#8072DB]"
                                checked={currentFilters?.in_stock || false}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'in_stock',
                                        e.target.checked,
                                    )
                                }
                            />
                            <label
                                htmlFor="mobile-in_stock"
                                className="ml-2 text-sm text-gray-700"
                            >
                                В наличии
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="mobile-new_products"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-[#8072DB] focus:ring-[#8072DB]"
                                checked={currentFilters?.new_products || false}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'new_products',
                                        e.target.checked,
                                    )
                                }
                            />
                            <label
                                htmlFor="mobile-new_products"
                                className="ml-2 text-sm text-gray-700"
                            >
                                Новинки
                            </label>
                        </div>
                    </div>

                    {/* Кнопки внизу */}
                    <div className="flex space-x-2">
                        <GradientButton
                            onClick={() => setShowFilters(false)}
                            className="flex-1"
                        >
                            Применить
                        </GradientButton>
                        <button
                            onClick={handleResetFilters}
                            className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            Сбросить
                        </button>
                    </div>
                </div>
            </div>

            {/* Десктопные фильтры (всегда видимы) */}
            <div className="hidden rounded-xl border border-gray-200 bg-white p-4 sm:p-5 lg:p-6 shadow-sm md:block">
                <div className="flex flex-wrap justify-between gap-4 sm:gap-6 lg:gap-8">
                    {/* Колонка 1: Категории */}
                    <div className="w-full md:w-[30%] lg:w-[30%]">
                        <h3 className="mb-2 font-medium text-gray-700">
                            Категория
                        </h3>
                        <div className="max-h-48 sm:max-h-64 overflow-y-auto">
                            <div className="mb-1.5 flex items-center">
                                <input
                                    id="category-all"
                                    name="category"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-[#8072DB] focus:ring-[#8072DB]"
                                    value=""
                                    checked={
                                        !currentFilters?.category ||
                                        currentFilters.category === ''
                                    }
                                    onChange={() => handleCategoryChange('')}
                                />
                                <label
                                    htmlFor="category-all"
                                    className="ml-2 block text-sm font-medium text-gray-700"
                                >
                                    Все категории
                                </label>
                            </div>

                            {categories.map((category) => (
                                <div
                                    key={`desktop-category-${category.id}`}
                                    className="mb-1.5 flex items-center"
                                >
                                    <input
                                        id={`category-${category.id}`}
                                        name="category"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-[#8072DB] focus:ring-[#8072DB]"
                                        value={category.id}
                                        checked={checkCategoryMatch(
                                            category.id,
                                            currentFilters?.category,
                                        )}
                                        onChange={() =>
                                            handleCategoryChange(category.id)
                                        }
                                    />
                                    <label
                                        htmlFor={`category-${category.id}`}
                                        className="ml-2 block text-sm font-medium text-gray-700"
                                    >
                                        {category.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Колонка 2: Цена и производитель */}
                    <div className="w-full md:w-[30%] lg:w-[30%]">
                        <div className="mb-6">
                            <h3 className="mb-2 font-medium text-gray-700">
                                Цена
                            </h3>
                            <div className="flex space-x-3">
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        placeholder="От"
                                        min="0"
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#8072DB] focus:outline-none"
                                        value={currentFilters?.min_price || ''}
                                        onChange={(e) =>
                                            handleFilterChange(
                                                'min_price',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        placeholder="До"
                                        min="0"
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#8072DB] focus:outline-none"
                                        value={currentFilters?.max_price || ''}
                                        onChange={(e) =>
                                            handleFilterChange(
                                                'max_price',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="mb-2 font-medium text-gray-700">
                                Производитель
                            </h3>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                            }}>
                                <input
                                    type="text"
                                    placeholder="Введите названия брендов через запятую"
                                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#8072DB] focus:outline-none"
                                    value={currentFilters?.manufacturer || ''}
                                    onChange={(e) => {
                                        handleFilterChange('manufacturer', e.target.value);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </form>
                            <p className="mt-1 text-xs text-gray-500">
                                Например: Shine Beauty, L'Oreal, Maybelline
                            </p>
                        </div>
                    </div>

                    {/* Колонка 3: Дополнительные фильтры */}
                    <div className="w-full md:w-[30%] lg:w-[30%]">
                        <h3 className="mb-2 font-medium text-gray-700">
                            Дополнительно
                        </h3>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input
                                    id="desktop-in_stock"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-[#8072DB] focus:ring-[#8072DB]"
                                    checked={currentFilters?.in_stock || false}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'in_stock',
                                            e.target.checked,
                                        )
                                    }
                                />
                                <label
                                    htmlFor="desktop-in_stock"
                                    className="ml-2 text-sm text-gray-700"
                                >
                                    В наличии
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="desktop-new_products"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-[#8072DB] focus:ring-[#8072DB]"
                                    checked={
                                        currentFilters?.new_products || false
                                    }
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'new_products',
                                            e.target.checked,
                                        )
                                    }
                                />
                                <label
                                    htmlFor="desktop-new_products"
                                    className="ml-2 text-sm text-gray-700"
                                >
                                    Новинки
                                </label>
                            </div>

                            <div className="mt-4 sm:mt-6">
                                <GradientButton
                                    onClick={handleResetFilters}
                                    fullWidth
                                >
                                    Сбросить все фильтры
                                </GradientButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
