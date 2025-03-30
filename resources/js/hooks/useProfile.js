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
	const [showSuccessMessage, setShowSuccessMessage] = useState(!!flash?.success);
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
		if (activeTab === 'wishlist') {
			loadWishlist();
		} else if (activeTab === 'orders' && authStatus.authenticated) {
			fetchOrders();
		}
	}, [activeTab, authStatus.authenticated]);

	// Handle success message
	useEffect(() => {
		if (flash?.success) {
			setShowSuccessMessage(true);
			setTimeout(() => setShowSuccessMessage(false), 5000);
		}
	}, [flash?.success]);

	const loadWishlist = async () => {
		setIsLoading(true);
		try {
			await checkAuthAndFetchWishlist();
			await fetchPromotions();
		} catch (error) {
			console.error('Error initializing wishlist:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const checkAuthAndFetchWishlist = async () => {
		try {
			const authResponse = await axios.get('/api/auth/check');
			if (authResponse.data.authenticated) {
				fetchWishlistItems();
			}
		} catch (error) {
			console.error('Ошибка аутентификации:', error);
			if (error.response?.status === 401) {
				try {
					await axios.get('/sanctum/csrf-cookie');
					const newAuthResponse = await axios.get('/api/auth/check');
					if (newAuthResponse.data.authenticated) {
						fetchWishlistItems();
					}
				} catch (csrfError) {
					console.error('Ошибка обновления CSRF токена:', csrfError);
				}
			}
		}
	};

	const fetchWishlistItems = async () => {
		try {
			const { data } = await axios.get('/api/wishlist');
			if (data.success) {
				setWishlistItems(data.data);
			}
		} catch (error) {
			console.error('Error fetching wishlist:', error);
		}
	};

	const fetchPromotions = async () => {
		try {
			const { data } = await axios.get('/api/promotions');
			if (data.success) {
				setPromotions(data.data.promotions);
			}
		} catch (error) {
			console.error('Error fetching promotions:', error);
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
			}
		} catch (error) {
			console.error('Error removing item from wishlist:', error);
			showNotification('Ошибка при удалении товара', 'error');
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		patch(route('profile.update'), {
			preserveScroll: true,
			onSuccess: () => {
				setShowSuccessMessage(true);
				setData({
					...data,
					current_password: '',
					new_password: '',
					new_password_confirmation: '',
				});
				setTimeout(() => setShowSuccessMessage(false), 5000);
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
			if (result?.success) {
				showNotification(`${productName} добавлен в корзину`, 'success');
			} else {
				showNotification(result?.message || 'Ошибка добавления в корзину', 'error');
			}
		} catch (error) {
			console.error('Ошибка при добавлении в корзину:', error);
			showNotification('Ошибка добавления в корзину', 'error');
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

	return {
		// State
		activeTab,
		setActiveTab,
		wishlistItems,
		orders,
		isLoading,
		isOrdersLoading,
		showSuccessMessage,
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
		handleLogout,
		removeFromWishlist,
		handleAddToCart,
		calculateDiscount,
		formatPrice,
		getImageUrl
	};
} 