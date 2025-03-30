import { Head } from '@inertiajs/react';
import Navigation from '@/Components/Navigation';
import OrderNotFound from '@/Components/Order/OrderNotFound';
import OrderBreadcrumbs from '@/Components/Order/OrderBreadcrumbs';
import OrderStatusBadge from '@/Components/Order/OrderStatusBadge';
import OrderItemsList from '@/Components/Order/OrderItemsList';
import OrderDeliveryInfo from '@/Components/Order/OrderDeliveryInfo';
import OrderContactInfo from '@/Components/Order/OrderContactInfo';
import OrderSummary from '@/Components/Order/OrderSummary';
import useOrderDetail from '@/hooks/useOrderDetail';

export default function OrderDetail({ order }) {
    const orderDetail = useOrderDetail(order);

    if (!orderDetail.hasData) {
        return (
            <>
                <Head>
                    <title>Заказ не найден - Сияй</title>
                    <meta
                        name="description"
                        content="Заказ не найден в магазине косметики Сияй"
                    />
                </Head>

                <div className="min-h-screen bg-white">
                    <Navigation />

                    <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
                        <OrderNotFound />
                    </main>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Заказ №{orderDetail.orderNumber} - Сияй</title>
                <meta
                    name="description"
                    content={`Информация о заказе №${orderDetail.orderNumber} в магазине косметики Сияй`}
                />
            </Head>

            <div className="min-h-screen bg-white">
                <Navigation />

                <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <OrderBreadcrumbs orderNumber={orderDetail.orderNumber} />

                    {/* Заголовок и статус */}
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Заказ №{orderDetail.orderNumber}
                        </h1>
                        <OrderStatusBadge 
                            status={orderDetail.status}
                            statusText={orderDetail.statusText}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Левая колонка: товары и информация о заказе */}
                        <div className="space-y-4 lg:col-span-2">
                            <OrderItemsList items={orderDetail.items} />
                            <OrderDeliveryInfo 
                                deliveryMethod={orderDetail.deliveryMethod}
                                deliveryAddress={orderDetail.deliveryAddress}
                                paymentMethod={orderDetail.paymentMethod}
                            />
                            <OrderContactInfo 
                                customerName={orderDetail.customerName}
                                customerEmail={orderDetail.customerEmail}
                                customerPhone={orderDetail.customerPhone}
                                comment={orderDetail.comment}
                            />
                        </div>

                        {/* Правая колонка: итоговая информация */}
                        <div className="lg:col-span-1">
                            <OrderSummary 
                                subtotal={orderDetail.subtotal}
                                deliveryFee={orderDetail.deliveryFee}
                                total={orderDetail.total}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
