import { formatPrice, formatDate } from '@/utils';

/**
 * Хук для работы с деталями заказа
 * @param {Object} order - Данные заказа
 * @returns {Object} - Обработанные данные заказа и вспомогательные функции
 */
export default function useOrderDetail(order) {
	/**
	 * Получение цены в форматированном виде
	 * @param {number} price - Цена для форматирования
	 * @returns {string} - Форматированная цена
	 */
	const getFormattedPrice = (price) => {
		return formatPrice(price);
	};

	/**
	 * Получение даты в форматированном виде
	 * @param {string} date - Дата для форматирования
	 * @returns {string} - Форматированная дата
	 */
	const getFormattedDate = (date) => {
		return formatDate(date, true);
	};

	/**
	 * Получение статуса заказа в удобочитаемом виде
	 * @param {string} status - Код статуса заказа
	 * @returns {string} - Описание статуса на русском языке
	 */
	const getStatusText = (status) => {
		switch (status) {
			case 'pending':
				return 'Ожидает обработки';
			case 'processing':
				return 'В обработке';
			case 'shipped':
				return 'Отправлен';
			case 'delivered':
				return 'Доставлен';
			case 'cancelled':
				return 'Отменен';
			default:
				return 'Неизвестный статус';
		}
	};

	/**
	 * Проверка наличия данных заказа
	 * @returns {boolean} - true, если данные заказа присутствуют
	 */
	const hasOrderData = () => {
		return !!order && !order.notFound;
	};

	// Обработка случая, когда заказ не найден
	if (!hasOrderData()) {
		return {
			hasData: false,
			formattedPrice: getFormattedPrice,
			formattedDate: getFormattedDate
		};
	}

	return {
		hasData: true,
		orderNumber: order.order_number,
		status: order.status,
		statusText: order.status_text || getStatusText(order.status),
		items: order.items,
		subtotal: order.subtotal,
		deliveryFee: order.delivery_fee,
		total: order.total,
		customerName: order.customer_name,
		customerEmail: order.customer_email,
		customerPhone: order.customer_phone,
		deliveryMethod: order.delivery_method,
		deliveryAddress: order.delivery_address,
		paymentMethod: order.payment_method,
		comment: order.comment,
		formattedPrice: getFormattedPrice,
		formattedDate: getFormattedDate
	};
} 