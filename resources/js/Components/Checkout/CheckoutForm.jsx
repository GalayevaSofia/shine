import React from 'react';
import CustomerForm from './CustomerForm';
import DeliveryForm from './DeliveryForm';
import PaymentForm from './PaymentForm';
import CommentForm from './CommentForm';
import SubmitButton from './SubmitButton';
import OrderSummary from './OrderSummary';
import CheckoutStyles from './CheckoutStyles';

/**
 * Компонент формы оформления заказа, объединяющий все компоненты
 */
export default function CheckoutForm({
    data,
    errors,
    processing,
    handleSubmit,
    handleInputChange,
    cartItems,
    cartTotal,
    discount,
    delivery,
    total,
    formatPrice
}) {
    const { 
        CARD_STYLE
    } = CheckoutStyles();

    return (
        <div className="mx-auto max-w-5xl">
            <h1 className="mb-8 text-2xl font-bold text-gray-900">Оформление заказа</h1>
            
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Данные покупателя */}
                        <div className={CARD_STYLE}>
                            <CustomerForm 
                                data={data}
                                errors={errors}
                                handleInputChange={handleInputChange}
                            />
                        </div>

                        {/* Доставка */}
                        <div className={CARD_STYLE}>
                            <DeliveryForm 
                                data={data}
                                errors={errors}
                                handleInputChange={handleInputChange}
                                deliveryPrice={300}
                                formatPrice={formatPrice}
                            />
                        </div>

                        {/* Оплата */}
                        <div className={CARD_STYLE}>
                            <PaymentForm 
                                data={data}
                                handleInputChange={handleInputChange}
                            />
                        </div>

                        {/* Комментарий */}
                        <div className={CARD_STYLE}>
                            <CommentForm 
                                data={data}
                                handleInputChange={handleInputChange}
                            />
                        </div>

                        {/* Кнопка подтверждения */}
                        <SubmitButton processing={processing} />
                    </form>
                </div>

                {/* Сводка заказа */}
                <div className="lg:col-span-1">
                    <div className={`${CARD_STYLE} sticky top-4`}>
                        <OrderSummary
                            cartItems={cartItems}
                            cartTotal={cartTotal}
                            discount={discount}
                            delivery={delivery}
                            total={total}
                            formatPrice={formatPrice}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
} 