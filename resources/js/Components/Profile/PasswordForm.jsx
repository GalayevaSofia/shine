import React from 'react';

// Styles
const INPUT_CLASS = "w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-800 transition-all focus:border-[#8072DB] focus:outline-none focus:ring-2 focus:ring-[#8072DB]/30";
const SUBMIT_BUTTON = "bg-size-200 transform animate-gradient rounded-full bg-gradient-to-r from-[#B86FBF] via-[#8072DB] to-[#5A8BEA] px-8 py-3 font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:opacity-95 active:scale-[0.98] disabled:opacity-50";

export default function PasswordForm({ 
    data, 
    setData, 
    errors, 
    processing,
    showSuccessMessage,
    handlePasswordSubmit 
}) {
    const renderInput = (id, label, type = 'text', value, onChange, error) => (
        <div>
            <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className={INPUT_CLASS}
            />
            {error && <div className="mt-1 text-sm text-red-600">{error}</div>}
        </div>
    );

    return (
        <div className="mx-auto max-w-3xl mt-8">
            <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
                {/* Decorative gradient elements */}
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#B86FBF]/10 via-[#8072DB]/10 to-[#5A8BEA]/10 opacity-70 blur-xl"></div>
                <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#B86FBF]/10 via-[#8072DB]/10 to-[#5A8BEA]/10 opacity-70 blur-xl"></div>

                <form
                    onSubmit={handlePasswordSubmit}
                    className="relative z-10 space-y-6"
                >
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        Изменение пароля
                    </h3>
                    
                    {showSuccessMessage && (
                        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4">
                            <div className="flex items-center">
                                <svg
                                    className="h-5 w-5 text-green-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">
                                        Пароль успешно обновлен
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        {renderInput('current_password', 'Текущий пароль', 'password', 
                            data.current_password,
                            (e) => setData('current_password', e.target.value),
                            errors.current_password)}
                        
                        {renderInput('new_password', 'Новый пароль', 'password', 
                            data.new_password,
                            (e) => setData('new_password', e.target.value),
                            errors.new_password)}
                        
                        {renderInput('new_password_confirmation', 'Подтверждение нового пароля', 'password',
                            data.new_password_confirmation,
                            (e) => setData('new_password_confirmation', e.target.value),
                            errors.new_password_confirmation)}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className={SUBMIT_BUTTON}
                        >
                            Обновить пароль
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 