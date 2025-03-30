import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';

// Создаем контекст аутентификации
const AuthContext = createContext();

// Хук для использования контекста аутентификации
export const useAuth = () => {
    return useContext(AuthContext);
};

// Провайдер контекста аутентификации
export const AuthProvider = ({ children, initialUser = null }) => {
    // Состояние аутентификации пользователя
    const [authStatus, setAuthStatus] = useState({
        checked: false,
        authenticated: !!initialUser,
    });
    
    // Текущий пользователь
    const [user, setUser] = useState(initialUser);
    
    // Проверка состояния аутентификации при загрузке
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/api/auth/check');
                setAuthStatus({
                    checked: true,
                    authenticated: response.data.authenticated,
                });
                
                if (response.data.authenticated && response.data.user) {
                    setUser(response.data.user);
                }
            } catch (error) {
                // Ошибка 401 это нормально для неавторизованных пользователей
                if (error.response && error.response.status === 401) {
                    // Тихо обрабатываем 401 ошибку - пользователь просто не авторизован
                    setAuthStatus({
                        checked: true,
                        authenticated: false,
                    });
                } else {
                    // Только для других ошибок выводим в консоль
                    console.error('Ошибка при проверке аутентификации:', error);
                    setAuthStatus({
                        checked: true,
                        authenticated: false,
                    });
                }
            }
        };
        
        if (!authStatus.checked) {
            checkAuth();
        }
    }, []);
    
    // Функция входа пользователя
    const login = async (credentials) => {
        try {
            // Получаем CSRF токен
            await axios.get('/sanctum/csrf-cookie');
            
            // Отправляем запрос на вход
            const response = await axios.post('/login', credentials);
            
            // Обновляем состояние аутентификации
            setAuthStatus({
                checked: true,
                authenticated: true,
            });
            
            // Если сервер вернул пользователя, обновляем состояние
            if (response.data.user) {
                setUser(response.data.user);
            }
            
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            console.error('Ошибка при входе:', error);
            
            return {
                success: false,
                error: error.response?.data?.message || 'Ошибка при входе',
            };
        }
    };
    
    // Функция выхода пользователя
    const logout = async () => {
        try {
            // Отправляем запрос на выход
            await axios.post('/logout');
            
            // Обновляем состояние аутентификации
            setAuthStatus({
                checked: true,
                authenticated: false,
            });
            
            // Очищаем данные пользователя
            setUser(null);
            
            // Перенаправляем на главную страницу
            router.visit('/');
            
            return { success: true };
        } catch (error) {
            console.error('Ошибка при выходе:', error);
            
            return {
                success: false,
                error: error.response?.data?.message || 'Ошибка при выходе',
            };
        }
    };
    
    // Функция регистрации пользователя
    const register = async (userData) => {
        try {
            // Получаем CSRF токен
            await axios.get('/sanctum/csrf-cookie');
            
            // Отправляем запрос на регистрацию
            const response = await axios.post('/register', userData);
            
            // Обновляем состояние аутентификации
            setAuthStatus({
                checked: true,
                authenticated: true,
            });
            
            // Если сервер вернул пользователя, обновляем состояние
            if (response.data.user) {
                setUser(response.data.user);
            }
            
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            
            return {
                success: false,
                error: error.response?.data?.message || 'Ошибка при регистрации',
                errors: error.response?.data?.errors,
            };
        }
    };
    
    // Предоставляем контекст аутентификации
    const value = {
        authStatus,
        user,
        login,
        logout,
        register,
    };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 