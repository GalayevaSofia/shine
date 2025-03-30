import React from 'react';
import CheckoutStyles from './CheckoutStyles';

/**
 * Компонент для ввода комментария к заказу
 * 
 * @param {Object} data - Данные формы
 * @param {Function} handleInputChange - Обработчик изменения полей
 */
export default function CommentForm({ data, handleInputChange }) {
    const { INPUT_STYLE } = CheckoutStyles();
    
    return (
        <>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Комментарий к заказу</h2>
            <textarea
                id="comment"
                name="comment"
                value={data.comment}
                onChange={handleInputChange}
                rows={3}
                className={INPUT_STYLE}
                placeholder="Дополнительная информация к заказу"
            />
        </>
    );
} 