import { useState, useEffect } from 'react';
import { useCart } from '@/Context/CartContext';
import { useAuth } from '@/Context/AuthContext';
import { useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';

/**
 * Хук для управления состоянием и логикой оформления заказа
 * 
 * @returns {Object} Состояние и методы для работы с оформлением заказа
 */
export default function useCheckout() {
    const {
        cart,
        loading: cartLoading,
        error: cartError,
        getCartTotal,
        formatPrice,
        refreshCart,
        getCartDiscount,
        setCartWithCount,
    } = useCart();
    
    const { user } = useAuth();
    const [localLoading, setLocalLoading] = useState(false);

    // Инициализация формы
    const { data, setData, post, processing, errors } = useForm({
        customer_name: user?.name || '',
        customer_email: user?.email || '',
        customer_phone: user?.phone || '+7',
        delivery_method: 'pickup',
        delivery_address: user?.address || '',
        payment_method: 'card',
        comment: '',
        subtotal: 0,
        delivery_fee: 0,
        total: 0,
    });

    // Инициализация данных пользователя
    useEffect(() => {
        if (user) {
            setData(prevData => ({
                ...prevData,
                customer_name: user.name || prevData.customer_name,
                customer_email: user.email || prevData.customer_email,
                customer_phone: user.phone || prevData.customer_phone || '+7',
                delivery_address: user.address || prevData.delivery_address
            }));
        }
    }, [user]);

    // Загрузка корзины
    useEffect(() => {
        const loadCart = async () => {
            setLocalLoading(true);
            await refreshCart();
            setLocalLoading(false);
        };
        
        loadCart();
    }, []);

    // Расчет стоимости
    const delivery = data.delivery_method === 'courier' ? 300 : 0;
    const cartTotal = getCartTotal();
    const total = cartTotal + delivery;
    const discount = getCartDiscount ? getCartDiscount() : calculateDiscount();
    
    // Функция для расчета скидки, если getCartDiscount не доступен
    function calculateDiscount() {
        if (!cart.items?.length) return 0;
        
        return cart.items.reduce((total, item) => {
            const regularPrice = item.price || item.product?.price || 0;
            const salePrice = item.sale_price || 
                            item.product?.sale_price || 
                            item.discount_price || 
                            item.product?.discount_price || 
                            item.promo_price || 
                            item.product?.promo_price;
            
            if (salePrice && salePrice < regularPrice) {
                return total + ((regularPrice - salePrice) * item.quantity);
            }
            return total;
        }, 0);
    }
    
    // Обновление данных формы при изменении стоимости
    useEffect(() => {
        setData(prevData => ({
            ...prevData,
            subtotal: cartTotal,
            delivery_fee: delivery,
            total: total
        }));
    }, [cartTotal, delivery]);

    // Обработка отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('account.orders.store'), {
            preserveScroll: true,
            onSuccess: () => {
                // После успешного создания заказа обновляем корзину и счетчик
                setCartWithCount({ items: [] });
                
                // Дополнительно обнуляем счетчик в localStorage для гарантии
                localStorage.setItem('cartItemCount', '0');
                
                // Показываем уведомление пользователю
                toast.success('Заказ успешно оформлен');
            },
            onError: (errors) => {
                if (errors.message) {
                    toast.error(errors.message);
                } else {
                    toast.error('Произошла ошибка при оформлении заказа');
                }
            }
        });
    };

    // Обработчик изменения полей формы
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(data => ({ ...data, [name]: value }));
    };

    // Обработчик повторной загрузки корзины при ошибке
    const handleRetryLoading = async () => {
        setLocalLoading(true);
        await refreshCart();
        setLocalLoading(false);
    };

    return {
        cart,
        cartLoading: cartLoading || localLoading,
        cartError,
        cartTotal,
        discount,
        delivery,
        total,
        data,
        errors,
        processing,
        handleSubmit,
        handleInputChange,
        handleRetryLoading,
        formatPrice
    };
} 