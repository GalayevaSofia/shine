import { useState, useEffect } from 'react';
import { useCart } from '@/Context/CartContext';
import { useAuth } from '@/Context/AuthContext';
import { useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';

/**
 * Форматирует телефонный номер в стандартный российский формат
 * 
 * @param {string} phone - Номер телефона в любом формате
 * @returns {string} - Форматированный номер телефона
 */
function formatPhoneNumber(phone) {
    if (!phone) return '+7';
    
    // Удаляем все символы кроме цифр
    const digits = phone.replace(/\D/g, '');
    
    // Обеспечиваем наличие кода страны
    const phoneDigits = digits.startsWith('7') ? digits : (digits.startsWith('8') ? '7' + digits.substring(1) : '7' + digits);
    
    // Проверяем длину и обрезаем до 11 цифр (российский формат)
    const trimmedDigits = phoneDigits.substring(0, 11);
    
    // Если после удаления нецифровых символов и обрезания осталось мало цифр
    if (trimmedDigits.length <= 1) {
        return '+7';
    }
    
    // Форматируем телефон
    let formattedPhone = '+7';
    
    if (trimmedDigits.length > 1) {
        formattedPhone += ' (' + trimmedDigits.substring(1, Math.min(4, trimmedDigits.length));
    }
    
    if (trimmedDigits.length > 4) {
        formattedPhone += ') ' + trimmedDigits.substring(4, Math.min(7, trimmedDigits.length));
    }
    
    if (trimmedDigits.length > 7) {
        formattedPhone += '-' + trimmedDigits.substring(7, Math.min(9, trimmedDigits.length));
    }
    
    if (trimmedDigits.length > 9) {
        formattedPhone += '-' + trimmedDigits.substring(9, Math.min(11, trimmedDigits.length));
    }
    
    return formattedPhone;
}

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
        customer_phone: formatPhoneNumber(user?.phone) || '+7',
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
                customer_phone: formatPhoneNumber(user.phone) || prevData.customer_phone || '+7',
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
        
        // Форматируем телефон перед отправкой
        setData(prevData => ({
            ...prevData,
            customer_phone: formatPhoneNumber(prevData.customer_phone)
        }));
        
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
        
        // Если изменяется поле телефона, применяем дополнительную валидацию
        if (name === 'customer_phone') {
            // Пусть форматирование происходит в компоненте CustomerForm
            setData(data => ({ ...data, [name]: value }));
        } else {
            setData(data => ({ ...data, [name]: value }));
        }
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
        formatPrice,
        formatPhoneNumber
    };
} 