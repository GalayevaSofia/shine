import { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useAuth } from '@/Context/AuthContext';
import { useCart } from '@/Context/CartContext';

export default function useProfile(initialTab = 'profile') {
	const { auth, flash = {} } = usePage().props;
	const [activeTab, setActiveTab] = useState(initialTab);
	const [wishlistItems, setWishlistItems] = useState([]);
	const [orders, setOrders] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isOrdersLoading, setIsOrdersLoading] = useState(false);
	const [showProfileSuccessMessage, setShowProfileSuccessMessage] = useState(!!flash?.success);
	const [showPasswordSuccessMessage, setShowPasswordSuccessMessage] = useState(false);
	const [authStatus, setAuthStatus] = useState({
		checked: true,
		authenticated: auth.user !== null,
	});
	const [promotions, setPromotions] = useState([]);
	const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

	const { data, setData, post, patch, processing, errors, reset } = useForm({
		name: auth.user?.name || '',
		email: auth.user?.email || '',
		phone: auth.user?.phone || '',
		current_password: '',
		new_password: '',
		new_password_confirmation: '',
		address: auth.user?.address || '',
		city: auth.user?.city || '',
		zip: auth.user?.zip || '',
		country: auth.user?.country || '',
	});

	const { authStatus: authContextStatus, login, logout } = useAuth();
	const { addToCart, formatPrice } = useCart();

	// Load wishlist data when tab is active
	useEffect(() => {
		let isMounted = true;

		const loadData = async () => {
			if (activeTab === 'wishlist') {
				setIsLoading(true);
				try {
					await loadWishlist();
				} catch (error) {
					console.error('Error loading wishlist tab data:', error);
				} finally {
					if (isMounted) setIsLoading(false);
				}
			} else if (activeTab === 'orders' && authStatus.authenticated) {
				setIsOrdersLoading(true);
				try {
					await fetchOrders();
				} catch (error) {
					console.error('Error loading orders tab data:', error);
				} finally {
					if (isMounted) setIsOrdersLoading(false);
				}
			}
		};

		loadData();

		return () => {
			isMounted = false;
		};
	}, [activeTab, authStatus.authenticated]);

	// Регистрируем функцию обновления в глобальном пространстве
	useEffect(() => {
		// Добавляем глобальную функцию обновления wishlist
		window.refreshWishlist = loadWishlist;

		// Очистка при размонтировании
		return () => {
			window.refreshWishlist = null;
		};
	}, []);

	// Handle success message
	useEffect(() => {
		if (flash?.success) {
			setShowProfileSuccessMessage(true);
			setTimeout(() => setShowProfileSuccessMessage(false), 5000);
		}
	}, [flash?.success]);

	const loadWishlist = async () => {
		try {
			console.log("Loading wishlist data...");
			await checkAuthAndFetchWishlist();
			await fetchPromotions();
			console.log("Wishlist data loaded successfully");
		} catch (error) {
			console.error('Error initializing wishlist:', error);
			throw error; // Пробрасываем ошибку дальше для обработки в useEffect
		}
	};

	const checkAuthAndFetchWishlist = async () => {
		try {
			// Всегда сначала обновляем CSRF токен
			await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

			const authResponse = await axios.get('/api/auth/check', { withCredentials: true });
			console.log('Auth check response:', authResponse.data);

			// Если пользователь авторизован через сессию, запрашиваем избранное
			if (authResponse.data.authenticated) {
				await fetchWishlistItems();
			} else {
				// Проверяем авторизацию по auth.user из props страницы
				if (auth.user) {
					console.log('User authenticated via page props, fetching wishlist');
					await fetchWishlistItems();
				} else {
					console.log('User not authenticated in any way. Please log in to view wishlist.');
					setWishlistItems([]);
				}
			}
		} catch (error) {
			console.error('Ошибка аутентификации:', error);
			// Даже если получили ошибку, но пользователь авторизован через props страницы
			if (auth.user) {
				console.log('Despite auth error, user is authenticated via page props');
				try {
					await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
					await fetchWishlistItems();
				} catch (retryError) {
					console.error('Ошибка при повторной попытке:', retryError);
					setWishlistItems([]);
				}
			} else {
				setWishlistItems([]);
			}
		}
	};

	const fetchWishlistItems = async () => {
		try {
			// Принудительно обновляем CSRF токен перед запросом избранного
			await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

			const { data } = await axios.get('/api/wishlist', { withCredentials: true });
			if (data.success) {
				setWishlistItems(data.data);
				console.log('Wishlist items loaded:', data.data);
			} else {
				console.error('Failed to load wishlist items:', data);
				setWishlistItems([]);
			}
		} catch (error) {
			console.error('Error fetching wishlist:', error);
			if (error.response?.status === 401) {
				console.error('User authentication required for wishlist');
				// Добавим попытку обновить аутентификацию
				try {
					await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
					const { data } = await axios.get('/api/wishlist', { withCredentials: true });
					if (data.success) {
						setWishlistItems(data.data);
						console.log('Wishlist items loaded after CSRF refresh:', data.data);
					} else {
						setWishlistItems([]);
					}
				} catch (retryError) {
					console.error('Failed to authenticate after retry:', retryError);
					setWishlistItems([]);
				}
			} else {
				setWishlistItems([]);
			}
		}
	};

	const fetchPromotions = async () => {
		try {
			const { data } = await axios.get('/api/promotions', { withCredentials: true });
			if (data.success) {
				setPromotions(data.data.promotions);
				console.log('Promotions loaded:', data.data.promotions?.length || 0);
			} else {
				console.error('Failed to load promotions:', data);
				setPromotions([]);
			}
		} catch (error) {
			console.error('Error fetching promotions:', error);
			setPromotions([]);
		}
	};

	const calculateDiscount = (product) => {
		if (!promotions?.length) return null;

		for (const promotion of promotions) {
			const productInPromotion = promotion.products?.find(p => p.id === product.id);
			const promoPrice = productInPromotion?.pivot?.promotional_price;

			if (promoPrice) {
				const discountPercent = Math.round((1 - promoPrice / product.price) * 100);
				return { discountPrice: promoPrice, discountPercent };
			}
		}

		return null;
	};

	const removeFromWishlist = async (productId) => {
		try {
			const { data } = await axios.delete(`/api/wishlist/${productId}`);
			if (data.success) {
				setWishlistItems(wishlistItems.filter(item => item.product_id !== productId));
				showNotification('Товар удален из избранного', 'success');

				// Обновляем глобальный кэш избранного
				if (window.wishlistCache) {
					window.wishlistCache.set(productId, false);
				}
			}
		} catch (error) {
			console.error('Error removing item from wishlist:', error);

			// В случае 404 считаем, что удаление все равно произошло
			if (error.response?.status === 404) {
				setWishlistItems(wishlistItems.filter(item => item.product_id !== productId));
				showNotification('Товар удален из избранного', 'success');

				// Обновляем глобальный кэш избранного
				if (window.wishlistCache) {
					window.wishlistCache.set(productId, false);
				}
				return;
			}

			showNotification('Ошибка при удалении товара', 'error');
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Валидация формата телефона
		if (data.phone && !isValidPhoneNumber(data.phone)) {
			setErrors({ ...errors, phone: 'Пожалуйста, введите корректный номер телефона' });
			return;
		}

		// Фильтруем данные для отправки - только личная информация
		const profileData = {
			name: data.name,
			email: data.email,
			phone: data.phone,
			address: data.address,
			city: data.city,
			zip: data.zip,
			country: data.country,
		};

		patch(route('profile.update'), {
			data: profileData,
			preserveScroll: true,
			onSuccess: () => {
				showNotification('Профиль успешно обновлен', 'success');
				setShowProfileSuccessMessage(true);
				setTimeout(() => setShowProfileSuccessMessage(false), 5000);
			},
		});
	};

	const handlePasswordSubmit = (e) => {
		e.preventDefault();

		// Проверка на заполнение полей пароля
		if (!data.current_password) {
			showNotification('Введите текущий пароль', 'error');
			return;
		}

		if (!data.new_password) {
			showNotification('Введите новый пароль', 'error');
			return;
		}

		if (data.new_password !== data.new_password_confirmation) {
			showNotification('Пароли не совпадают', 'error');
			return;
		}

		// Отправляем только данные пароля
		const passwordData = {
			current_password: data.current_password,
			new_password: data.new_password,
			new_password_confirmation: data.new_password_confirmation,
		};

		patch(route('profile.update'), {
			data: passwordData,
			preserveScroll: true,
			onSuccess: () => {
				showNotification('Пароль успешно обновлен', 'success');
				setShowPasswordSuccessMessage(true);
				// Очищаем поля пароля после успешного обновления
				setData({
					...data,
					current_password: '',
					new_password: '',
					new_password_confirmation: '',
				});
				setTimeout(() => setShowPasswordSuccessMessage(false), 5000);
			},
		});
	};

	const handleLogout = (e) => {
		e.preventDefault();
		post(route('logout'));
	};

	const fetchOrders = async () => {
		setIsOrdersLoading(true);
		try {
			const { data } = await axios.get('/api/orders');
			if (data.success && data.orders) {
				setOrders(data.orders);
			} else {
				console.error('Failed to fetch orders:', data);
				setOrders([]);
			}
		} catch (error) {
			console.error('Error fetching orders:', error);
			setOrders([]);
		} finally {
			setIsOrdersLoading(false);
		}
	};

	const showNotification = (message, type = 'success') => {
		setNotification({ show: true, message, type });
		setTimeout(() => {
			setNotification({ show: false, message: '', type: 'success' });
		}, 3000);
	};

	const handleAddToCart = async (productId, productName) => {
		try {
			const result = await addToCart(productId);
		} catch (error) {
			console.error('Ошибка при добавлении в корзину:', error);
		}
	};

	const getImageUrl = (image) => {
		if (!image) return '/images/no-image.svg';

		if (image.startsWith('http') || image.startsWith('/storage/')) {
			return image;
		} else {
			return `/storage/${image}`;
		}
	};

	// Вспомогательная функция для валидации телефона
	const isValidPhoneNumber = (phone) => {
		// Проверка на соответствие формату +7 (XXX) XXX-XX-XX
		const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

		// Если телефон не заполнен, считаем это допустимым (не обязательное поле)
		if (!phone || phone === '+7') return true;

		return phoneRegex.test(phone);
	};

	return {
		// State
		activeTab,
		setActiveTab,
		wishlistItems,
		orders,
		isLoading,
		isOrdersLoading,
		showProfileSuccessMessage,
		showPasswordSuccessMessage,
		authStatus,
		notification,
		data,
		processing,
		errors,
		flash,
		auth,

		// Methods
		setData,
		handleSubmit,
		handlePasswordSubmit,
		handleLogout,
		removeFromWishlist,
		calculateDiscount,
		handleAddToCart,
		formatPrice,
		getImageUrl,
	};
} 