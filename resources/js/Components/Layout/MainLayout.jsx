import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from '../Navigation';
import Footer from './Footer';

export default function MainLayout({
    children,
    hideNavigation = false,
    className = '',
    fullWidth = false,
}) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            {/* Навигация */}
            {!hideNavigation && <Navigation />}

            {/* Основной контент */}
            <main
                className={`flex flex-grow flex-col ${fullWidth ? '' : 'px-4 sm:px-6 lg:px-8'} pt-16 sm:pt-18 md:pt-20 ${className}`}
            >
                {children}
            </main>

            {/* Отступ перед футером */}
            <div className="mt-8 sm:mt-12 md:mt-16"></div>

            {/* Футер */}
            <Footer />

            {/* Контейнер для уведомлений */}
            <ToastContainer 
                position="bottom-right" 
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
                toastClassName="text-sm"
            />
        </div>
    );
}
