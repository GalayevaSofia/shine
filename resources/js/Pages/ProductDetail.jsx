import { Head } from '@inertiajs/react';
import MainLayout from '@/Components/Layout/MainLayout';
import Breadcrumbs from '@/Components/UI/Breadcrumbs';
import ErrorState from '@/Components/UI/ErrorState';
import ProductImage from '@/Components/Product/ProductImage';
import ProductHeader from '@/Components/Product/ProductHeader';
import PromotionPrice from '@/Components/UI/PromotionPrice';
import AddToCartSection from '@/Components/Product/AddToCartSection';
import ProductTabs from '@/Components/Product/ProductTabs';
import useProductDetail from '@/hooks/useProductDetail';

export default function ProductDetail({ product, relatedProducts, error }) {
    const {
        quantity, 
        setQuantity, 
        isAddingToCart, 
        addToCartSuccess, 
        addToCartError, 
        handleAddToCart,
        breadcrumbItems 
    } = useProductDetail(product);

    // Show error state if product is not found or there's an error
    if (!product || error) {
        return (
            <MainLayout>
                <Head title="Товар не найден - Shine" />
                <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
                    <ErrorState 
                        title="Товар не найден"
                        message={error || 'Товар, который вы ищете, не существует или был удален.'}
                        retryText="Перейти в каталог"
                        onRetry={() => window.location.href = '/catalog'}
                    />
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Head title={product.name ? `${product.name} - Shine` : 'Товар - Shine'} />

            <main className="mx-auto max-w-[1440px] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
                <Breadcrumbs items={breadcrumbItems} className="mb-8" />

                <div className="flex flex-col gap-12 xl:flex-row">
                    {/* Product Image Section */}
                    <div className="xl:w-[48%]">
                        <ProductImage image={product.image} name={product.name} />
                    </div>

                    {/* Product Info Section */}
                    <div className="flex-1">
                        <ProductHeader product={product} />

                            <div className="mb-6">
                            <PromotionPrice product={product} size="large" />
                            </div>

                            <div className="mb-6 space-y-4">
                            <AddToCartSection 
                                product={product}
                                                quantity={quantity}
                                setQuantity={setQuantity}
                                isAddingToCart={isAddingToCart}
                                handleAddToCart={handleAddToCart}
                            />
                        </div>

                        <ProductTabs product={product} />
                    </div>
                </div>
            </main>
        </MainLayout>
    );
}
