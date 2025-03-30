import { useState, useEffect } from 'react';
import axios from 'axios';

export default function usePromotions(initialPromotions = []) {
	const [promotions, setPromotions] = useState(initialPromotions);
	const [loading, setLoading] = useState(initialPromotions.length === 0);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (initialPromotions.length === 0) {
			loadPromotions();
		}
	}, [initialPromotions]);

	const loadPromotions = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get('/api/promotions');
			if (data.success) {
				setPromotions(data.data.promotions);
				setError(null);
			} else {
				setError(data.message || 'Не удалось загрузить акции');
			}
		} catch (err) {
			setError('Ошибка при загрузке акций');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return {
		promotions,
		loading,
		error,
		loadPromotions
	};
} 