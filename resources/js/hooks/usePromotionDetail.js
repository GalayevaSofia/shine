import { useState, useEffect } from 'react';
import axios from 'axios';

export default function usePromotionDetail(initialPromotion = null, initialError = null) {
	const [isLoading, setIsLoading] = useState(!initialPromotion && !initialError);
	const [promotion, setPromotion] = useState(initialPromotion);
	const [error, setError] = useState(initialError);

	useEffect(() => {
		if (!initialPromotion && !initialError) {
			const slug = window.location.pathname.split('/').pop();
			slug && loadPromotion(slug);
		}
	}, [initialPromotion, initialError]);

	const loadPromotion = async (slug) => {
		try {
			setIsLoading(true);
			const { data } = await axios.get(`/api/promotions/${slug}`);
			if (data.success) {
				setPromotion(data.data.promotion);
				setError(null);
			} else {
				setError(data.message || 'Не удалось загрузить акцию');
			}
		} catch (err) {
			setError('Ошибка при загрузке акции');
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const calculateDiscount = (product) => {
		if (!promotion) return null;

		const discountPrice = promotion.products.find(p => p.id === product.id)?.pivot?.promotional_price;
		if (!discountPrice) return null;

		const discountPercent = Math.round((1 - discountPrice / product.price) * 100);
		return { discountPrice, discountPercent };
	};

	return {
		isLoading,
		promotion,
		error,
		calculateDiscount
	};
} 