import { useState, useEffect, useMemo } from 'react';
import { useCart } from '@/Context/CartContext';
import { useAuth } from '@/Context/AuthContext';

/**
 * Хук для управления состоянием и логикой страницы корзины
 * 
 * @returns {Object} - Состояние и методы для работы с корзиной
 */
export default function useCartPage() {
	const {
		cart,
		setCart,
		loading,
		error,
		updateCartItem,
		removeFromCart,
		formatPrice,
		refreshCart,
		getCartTotal,
		clearCart,
		getCartDiscount,
	} = useCart();

	const { authStatus } = useAuth();

	// Состояние компонента
	const [localQuantities, setLocalQuantities] = useState({});
	const [removingItems, setRemovingItems] = useState({});
	const [localLoading, setLocalLoading] = useState(false);
	const [loadingItems, setLoadingItems] = useState({});
	const [showClearCartModal, setShowClearCartModal] = useState(false);
	const [isEmptyCart, setIsEmptyCart] = useState(false);

	// Рассчитываем количество товаров в корзине
	const cartItemCount = useMemo(() => {
		if (!cart || !cart.items || !Array.isArray(cart.items)) return 0;

		return cart.items.reduce((total, item) => {
			return total + (Number(item?.quantity) || 0);
		}, 0);
	}, [cart?.items]);

	// Отслеживаем изменение состояния корзины
	useEffect(() => {
		// Проверяем пуста ли корзина
		const isEmpty = !cart || !cart.items || !Array.isArray(cart.items) || cart.items.length === 0;
		setIsEmptyCart(isEmpty);
	}, [cart, cart?.items]);

	// Инициализация
	useEffect(() => {
		refreshCart();
	}, []);

	// Инициализация локальных количеств при загрузке корзины
	useEffect(() => {
		if (cart?.items && Array.isArray(cart.items)) {
			const quantities = {};
			cart.items.forEach(item => {
				if (item && item.cart_id && item.product_id) {
					const itemKey = `${item.cart_id}-${item.product_id}`;
					quantities[itemKey] = item.quantity;
				}
			});
			setLocalQuantities(quantities);
		}
	}, [cart?.items]);

	// Обработчики событий
	const handleQuantityChange = async (itemId, quantity) => {
		if (quantity < 1) return;

		setLocalQuantities(prev => ({ ...prev, [itemId]: quantity }));
		setLoadingItems(prev => ({ ...prev, [itemId]: true }));

		await updateCartItem(itemId, quantity);

		setLoadingItems(prev => ({ ...prev, [itemId]: false }));
	};

	const handleRemoveItem = async (itemId) => {
		setRemovingItems(prev => ({ ...prev, [itemId]: true }));
		const result = await removeFromCart(itemId);

		// Проверяем есть ли товары в корзине после удаления
		// Если корзина пуста после удаления последнего товара, принудительно обновляем состояние
		if (result && result.success) {
			if (!result.items || result.items.length === 0) {
				setCart({ ...cart, items: [] });
				setIsEmptyCart(true);
			}
		}
	};

	const handleRefreshCart = async () => {
		setLocalLoading(true);
		await refreshCart();
		setLocalLoading(false);
	};

	const handleClearCart = async () => {
		setShowClearCartModal(false);
		setLocalLoading(true);
		await clearCart();
		setLocalLoading(false);
	};

	const openClearCartModal = () => {
		setShowClearCartModal(true);
	};

	const closeClearCartModal = () => {
		setShowClearCartModal(false);
	};

	// Вычисление количества видимых элементов (не помеченных для удаления)
	const visibleItemsCount = useMemo(() => {
		return cart?.items?.filter(item =>
			item && !removingItems[`${item.cart_id}-${item.product_id}`]
		)?.length || 0;
	}, [cart?.items, removingItems]);

	// Проверка, пуста ли корзина с учетом удаляемых элементов
	const isCartEmptyWithRemoving = useMemo(() => {
		return isEmptyCart || visibleItemsCount === 0;
	}, [isEmptyCart, visibleItemsCount]);

	return {
		cart,
		loading,
		error,
		localLoading,
		formatPrice,
		getCartTotal,
		getCartDiscount,
		cartItemCount,
		authStatus,
		localQuantities,
		removingItems,
		loadingItems,
		showClearCartModal,
		isEmptyCart: isCartEmptyWithRemoving,
		visibleItemsCount,
		handleQuantityChange,
		handleRemoveItem,
		handleRefreshCart,
		handleClearCart,
		openClearCartModal,
		closeClearCartModal
	};
} 