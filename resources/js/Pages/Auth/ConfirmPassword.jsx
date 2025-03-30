import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import Navigation from '@/Components/Navigation';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head>
                <title>Подтверждение пароля - Сияй</title>
                <meta name="description" content="Подтверждение пароля для продолжения" />
            </Head>

            <div className="min-h-screen bg-white">
                <Navigation />
                
                <main className="max-w-md mx-auto px-4 sm:px-6 pt-32 pb-16">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Подтверждение <span className="bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] bg-clip-text text-transparent animate-gradient bg-size-200">пароля</span>
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Это защищенная область приложения. Пожалуйста, подтвердите ваш пароль для продолжения.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 relative overflow-hidden">
                        {/* Декоративные градиентные элементы */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#B86FBF]/10 via-[#8072DB]/10 to-[#5A8BEA]/10 rounded-full blur-xl opacity-70"></div>
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-[#B86FBF]/10 via-[#8072DB]/10 to-[#5A8BEA]/10 rounded-full blur-xl opacity-70"></div>
                        
                        <form onSubmit={submit} className="space-y-6 relative z-10">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Пароль
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8072DB]/30 focus:border-[#8072DB] transition-all"
                                    required
                                    autoFocus
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] text-white py-3 rounded-full font-semibold hover:opacity-95 transition-all animate-gradient bg-size-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md disabled:opacity-50"
                            >
                                Подтвердить
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}
