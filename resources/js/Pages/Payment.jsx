import React from 'react';
import InfoPage from '@/Components/UI/InfoPage';
import InfoAlert from '@/Components/UI/InfoAlert';
import ContactLink from '@/Components/UI/ContactLink';
import icons from '@/utils/icons';

export default function Payment() {
    const sections = [
        {
            content: (
                <p>
                    Мы предлагаем несколько удобных способов оплаты вашего заказа. Выберите наиболее подходящий для вас вариант.
                </p>
            )
        },
        {
            title: "Банковские карты",
            icon: icons.creditCard,
            content: (
                <>
                    <p>
                        Вы можете оплатить заказ банковской картой при оформлении заказа на сайте. 
                        Мы принимаем карты Visa, MasterCard, Мир.
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                        <img src="/storage/assets/visa.svg" alt="Visa" className="h-8" />
                        <img src="/storage/assets/mastercard.svg" alt="MasterCard" className="h-8" />
                        <img src="/storage/assets/mir.svg" alt="Мир" className="h-8" />
                    </div>
                    <InfoAlert type="success">
                        Оплата банковской картой на сайте безопасна и защищена протоколом шифрования данных.
                    </InfoAlert>
                </>
            )
        },
        {
            title: "Оплата при получении",
            icon: icons.cash,
            content: (
                <>
                    <p>
                        Вы можете оплатить заказ при получении наличными или банковской картой курьеру.
                    </p>
                    <InfoAlert>
                        При оплате наличными, пожалуйста, подготовьте точную сумму – это ускорит процесс получения заказа.
                    </InfoAlert>
                </>
            )
        },
        {
            title: "Электронные кошельки",
            icon: icons.wallet,
            content: (
                <>
                    <p>
                        Мы поддерживаем следующие электронные платежные системы:
                    </p>
                    <ul className="ml-6 list-disc space-y-1">
                        <li>СБП (Система быстрых платежей)</li>
                        <li>ЮMoney</li>
                        <li>Qiwi Кошелек</li>
                    </ul>
                    <div className="flex items-center gap-3 mt-4">
                        <img src="/storage/assets/sbp.svg" alt="СБП" className="h-8" />
                        <img src="/storage/assets/yoomoney.svg" alt="ЮMoney" className="h-8" />
                        <img src="/storage/assets/qiwi.svg" alt="Qiwi" className="h-8" />
                    </div>
                </>
            )
        },
        {
            title: "Безопасность платежей",
            icon: icons.lock,
            content: (
                <>
                    <p>
                        Все платежи на нашем сайте защищены современными технологиями шифрования данных. 
                        Мы не храним данные ваших банковских карт.
                    </p>
                    <p>
                        После успешной оплаты вы получите подтверждение на указанный email.
                    </p>
                    <div className="mt-6">
                        <h3 className="mb-2 font-medium text-gray-800">Остались вопросы по оплате?</h3>
                        <ContactLink type="phone" value="+79991234567">
                            Позвоните нам: +7 (999) 123-45-67
                        </ContactLink>
                    </div>
                </>
            )
        }
    ];

    return (
        <InfoPage 
            title="Способы оплаты"
            heading="Оплата"
            sections={sections}
        />
    );
}