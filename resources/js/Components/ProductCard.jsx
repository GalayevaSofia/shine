import ProductPrice from '@/Components/UI/ProductPrice';
import StockStatus from '@/Components/UI/StockStatus';
import WishlistButton from '@/Components/WishlistButton';
import { useCart } from '@/Context/CartContext';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function ProductCard(props) {
    // Безопасное извлечение параметров
    const { product } = props || {};
    const { addToCart } = useCart();
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: 'success',
    });
    const [imageError, setImageError] = useState(false); // Состояние для отслеживания ошибок изображения

    // Функция показа уведомления
    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: 'success' });
        }, 3000);
    };

    // Проверка на null/undefined для product
    if (!product || typeof product !== 'object') {
        console.log('ProductCard получил пустой product или не объект');
        return null;
    }

    // Безопасное извлечение свойств товара
    const {
        id = 0,
        name = 'Товар без названия',
        description = 'Нет описания',
        image = null,
        image_url = null,
        price = 0,
        stock = 0,
        promotions = [],
        pivot = null,
    } = product;

    // Получаем акционные данные, если товар участвует в акции
    const getPromotionData = () => {
        // Проверяем, есть ли связь с акцией через pivot или через массив promotions
        if (pivot && pivot.promotional_price) {
            return {
                promotionalPrice: pivot.promotional_price,
                discountPercentage: Math.round((price - pivot.promotional_price) / price * 100),
                promotionName: '',
            };
        }
        
        // Проверяем массив акций, если он есть
        if (Array.isArray(promotions) && promotions.length > 0) {
            // Берем первую активную акцию
            const activePromotion = promotions.find(
                promo => promo.is_active && promo.pivot && promo.pivot.promotional_price
            );
            
            if (activePromotion && activePromotion.pivot.promotional_price) {
                return {
                    promotionalPrice: activePromotion.pivot.promotional_price,
                    discountPercentage: Math.round((price - activePromotion.pivot.promotional_price) / price * 100),
                    promotionName: activePromotion.title || '',
                };
            }
        }
        
        return {
            promotionalPrice: null,
            discountPercentage: 0,
            promotionName: '',
        };
    };

    const { promotionalPrice, discountPercentage, promotionName } = getPromotionData();

    // Определение URL изображения с учётом возможных вариантов хранения в БД
    const getImageUrl = () => {
        // Проверяем, есть ли у нас изображение и какой формат пути используется
        if (image) {
            // Проверяем, содержит ли путь к изображению полный URL или относительный путь
            if (image.startsWith('http://') || image.startsWith('https://')) {
                return image; // Полный URL
            } else if (image.startsWith('/storage/')) {
                return image; // Уже относительный путь к storage
            } else {
                return `/storage/${image}`; // Добавляем префикс /storage/
            }
        } else if (image_url) {
            // То же самое для image_url
            if (image_url.startsWith('http://') || image_url.startsWith('https://')) {
                return image_url;
            } else if (image_url.startsWith('/storage/')) {
                return image_url;
            } else {
                return `/storage/${image_url}`;
            }
        }
        
        // Если изображения нет вообще
        return '/images/no-image.svg';
    };

    // Получаем URL изображения
    const imageUrl = getImageUrl();

    // Функция обработки ошибки загрузки изображения
    const handleImageError = (e) => {
        console.log('Ошибка загрузки изображения:', imageUrl);
        e.target.onerror = null; // Предотвращаем бесконечную рекурсию
        e.target.src = '/images/no-image.svg'; // Используем заглушку
        setImageError(true); // Устанавливаем флаг ошибки
    };

    // Функция добавления в корзину
    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isAddingToCart) return;

        setIsAddingToCart(true);
        try {
            const result = await addToCart(id);

            if (result && result.success) {
                showNotification(`${name} добавлен в корзину`);
            } else if (result) {
                showNotification(
                    result.message || 'Ошибка добавления в корзину',
                    'error',
                );
            } else {
                showNotification(
                    'Неизвестная ошибка при добавлении в корзину',
                    'error',
                );
            }
        } catch (error) {
            console.error('Ошибка при добавлении в корзину:', error);
            showNotification('Ошибка добавления в корзину', 'error');
        } finally {
            setIsAddingToCart(false);
        }
    };

    return (
        <div className="relative">
            {/* Уведомление о добавлении в корзину */}
            <div
                className={`pointer-events-none absolute inset-x-0 top-0 z-50 transition-all duration-300 ${
                    notification.show
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-6'
                }`}
            >
                <div
                    className={`mx-auto max-w-[90%] rounded-lg py-2 px-3 text-sm text-white text-center ${
                        notification.type === 'success'
                            ? 'bg-green-500'
                            : 'bg-red-500'
                    }`}
                >
                    {notification.message}
                </div>
            </div>

            {/* Карточка товара */}
            <div className="group h-full overflow-hidden rounded-xl bg-white transition-shadow duration-300 hover:shadow-md">
                <div className="flex h-full flex-col">
                    {/* Часть с изображением */}
                    <div className="relative h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] overflow-hidden bg-gray-100">
                        {/* Ссылка на страницу товара (покрывает всё изображение) */}
                        <Link
                            href={`/products/${id}`}
                            className="absolute inset-0 z-10"
                        >
                            {imageError ? (
                                <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100 p-4 text-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mb-2 h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span className="text-xs text-gray-500">
                                        Изображение не найдено
                                    </span>
                                </div>
                            ) : (
                                <img
                                    src={imageUrl}
                                    alt={name}
                                    className="h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
                                    onError={handleImageError}
                                />
                            )}
                        </Link>

                        {/* Кнопка добавления в избранное */}
                        <WishlistButton
                            productId={id}
                            className="absolute right-2 top-2 z-20 text-xl"
                        />
                    </div>
                    <div className="relative z-10 flex flex-grow flex-col justify-between p-3 sm:p-4">
                        <div>
                            {/* Статус наличия */}
                            <div className="mb-1 sm:mb-1.5">
                                <StockStatus
                                    inStock={stock > 0}
                                    quantity={stock}
                                    size="small"
                                />
                            </div>

                            {/* Название товара */}
                            <h3 className="mb-1 text-sm sm:text-base lg:text-lg font-medium leading-tight text-gray-800 hover:text-[#8072DB] line-clamp-2">
                                <Link
                                    href={`/products/${id}`}
                                    className="transition-colors"
                                >
                                    {name}
                                </Link>
                            </h3>
                        </div>

                        <div className="mt-auto">
                            {/* Цена */}
                            <div className="mt-2 sm:mt-3">
                                <ProductPrice 
                                    price={price} 
                                    promotionalPrice={promotionalPrice}
                                    discountPercentage={discountPercentage}
                                    promotionName={promotionName}
                                    size="medium" 
                                />
                            </div>

                            {/* Кнопка Добавить в корзину */}
                            <div className="mt-3 sm:mt-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={stock <= 0 || isAddingToCart}
                                    className={`flex w-full items-center justify-center rounded-lg px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all ${
                                        stock > 0
                                            ? 'bg-size-200 animate-gradient bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] text-white hover:scale-[1.02] active:scale-[0.98]'
                                            : 'cursor-not-allowed bg-gray-100 text-gray-400'
                                    }`}
                                >
                                    {isAddingToCart ? (
                                        <svg
                                            className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                    ) : (
                                        <>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="mr-1 sm:mr-1.5 h-4 w-4 sm:h-5 sm:w-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                                />
                                            </svg>
                                            В корзину
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
