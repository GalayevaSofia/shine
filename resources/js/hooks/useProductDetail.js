import { useState } from 'react';
import { useCart } from '@/Context/CartContext';

export default function useProductDetail(initialProduct) {
	const [quantity, setQuantity] = useState(1);
	const [isAddingToCart, setIsAddingToCart] = useState(false);
	const [addToCartSuccess, setAddToCartSuccess] = useState(false);
	const [addToCartError, setAddToCartError] = useState(null);
	const { addToCart } = useCart();

	// Get promotion data if product is part of a promotion
	const getPromotionData = () => {
		if (!initialProduct) return { promotionalPrice: null, discountPercentage: 0, promotionName: '' };

		// Check if there are promotions with promotional price
		if (initialProduct.promotions?.length) {
			const activePromotion = initialProduct.promotions.find(
				promo => promo.is_active && promo.pivot?.promotional_price
			);

			if (activePromotion?.pivot?.promotional_price) {
				const originalPrice = parseFloat(initialProduct.price);
				const promoPrice = parseFloat(activePromotion.pivot.promotional_price);

				return {
					promotionalPrice: promoPrice,
					discountPercentage: Math.round((1 - promoPrice / originalPrice) * 100),
					promotionName: activePromotion.title || '',
				};
			}
		}

		// Use best_price and original_price if they are calculated in the backend
		if (initialProduct.best_price && initialProduct.original_price) {
			return {
				promotionalPrice: parseFloat(initialProduct.best_price),
				discountPercentage: initialProduct.discount_percentage ||
					Math.round((1 - initialProduct.best_price / initialProduct.original_price) * 100),
				promotionName: initialProduct.promotion_name || '',
			};
		}

		return { promotionalPrice: null, discountPercentage: 0, promotionName: '' };
	};

	// Handle adding to cart
	const handleAddToCart = async () => {
		if (isAddingToCart) return;

		setIsAddingToCart(true);
		setAddToCartSuccess(false);
		setAddToCartError(null);

		try {
			const result = await addToCart(initialProduct.id, quantity);
			if (result?.success) {
				setAddToCartSuccess(true);
				setTimeout(() => setAddToCartSuccess(false), 3000);
			} else {
				setAddToCartError(result?.message || 'Ошибка при добавлении товара');
			}
		} catch (error) {
			console.error('Ошибка при добавлении в корзину:', error);
			setAddToCartError('Не удалось добавить товар в корзину');
		} finally {
			setIsAddingToCart(false);
		}
	};

	// Prepare breadcrumbs
	const getBreadcrumbItems = () => {
		return [
			{ name: 'Каталог', href: '/catalog' },
			...(initialProduct?.category ? [{
				name: initialProduct.category.name,
				href: `/catalog?category=${initialProduct.category.id}`
			}] : []),
			{ name: initialProduct?.name }
		];
	};

	return {
		quantity,
		setQuantity,
		isAddingToCart,
		addToCartSuccess,
		addToCartError,
		handleAddToCart,
		promotionData: getPromotionData(),
		breadcrumbItems: getBreadcrumbItems(),
	};
} 