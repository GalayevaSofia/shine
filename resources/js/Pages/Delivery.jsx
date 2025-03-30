import React from 'react';
import InfoPage from '@/Components/UI/InfoPage';
import InfoAlert from '@/Components/UI/InfoAlert';
import ContactLink from '@/Components/UI/ContactLink';
import icons from '@/utils/icons';

export default function Delivery() {
    const sections = [
        {
            content: (
                <p>
                    Мы предлагаем несколько способов доставки вашего заказа. Выберите наиболее удобный для вас вариант при оформлении заказа.
                </p>
            )
        },
        {
            title: "Курьерская доставка",
            icon: icons.lightning,
            content: (
                <>
                    <p>
                        Доставка курьером осуществляется в течение 1-3 рабочих дней в зависимости от вашего местоположения. 
                        Стоимость доставки курьером составляет <span className="font-semibold text-[#8072DB]">300 рублей</span>.
                    </p>
                    <p>
                        Курьер свяжется с вами по телефону перед доставкой для уточнения времени. 
                        После доставки у вас будет возможность проверить товар перед оплатой (при выборе оплаты наличными).
                    </p>
                </>
            )
        },
        {
            title: "Самовывоз",
            icon: icons.location,
            content: (
                <>
                    <p>
                        Вы можете <span className="font-semibold text-[#8072DB]">бесплатно</span> забрать ваш заказ в нашем магазине по адресу: 
                        г. Москва, ул. Тверская, д. 10.
                    </p>
                    <p>
                        Часы работы пункта самовывоза:
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Понедельник - Пятница:</div>
                            <div>10:00 - 20:00</div>
                            <div className="font-medium">Суббота - Воскресенье:</div>
                            <div>11:00 - 19:00</div>
                        </div>
                    </div>
                    <p>
                        После оформления заказа вы получите уведомление, когда заказ будет готов к выдаче. 
                        Обычно это занимает не более 24 часов.
                    </p>
                </>
            )
        },
        {
            title: "Сроки доставки",
            icon: icons.clock,
            content: (
                <p>
                    Среднее время обработки заказа составляет 1-2 рабочих дня. 
                    После подтверждения заказа вы получите электронное письмо с деталями доставки.
                </p>
            )
        },
        {
            title: "Вопросы по доставке",
            icon: icons.question,
            content: (
                <>
                    <p>
                        Если у вас есть вопросы по доставке вашего заказа, 
                        пожалуйста, свяжитесь с нашей службой поддержки:
                    </p>
                    <div className="mt-4 space-y-2">
                        <div>
                            <ContactLink type="phone" value="+79991234567">
                                Позвоните нам: +7 (999) 123-45-67
                            </ContactLink>
                        </div>
                        <div>
                            <ContactLink type="email" value="info@shine.ru">
                                info@shine.ru
                            </ContactLink>
                        </div>
                    </div>
                </>
            )
        }
    ];

    return (
        <InfoPage 
            title="Доставка"
            heading="Доставка"
            sections={sections}
        />
    );
}