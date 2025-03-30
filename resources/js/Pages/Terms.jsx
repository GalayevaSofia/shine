import React from 'react';
import InfoPage from '@/Components/UI/InfoPage';
import InfoAlert from '@/Components/UI/InfoAlert';
import icons from '@/utils/icons';

export default function Terms() {
    const sections = [
        {
            content: (
                <p>
                    Данные Условия использования определяют правила пользования интернет-магазином Shine. 
                    Регистрируясь на сайте или совершая покупки, вы соглашаетесь с настоящими условиями.
                </p>
            )
        },
        {
            title: "Основные определения",
            icon: icons.settings,
            content: (
                <>
                    <p>
                        В настоящих Условиях использования применяются следующие термины:
                    </p>
                    <ul className="ml-6 list-disc space-y-1">
                        <li><span className="font-medium">Сайт</span> – интернет-магазин Shine, расположенный по адресу www.shine.ru</li>
                        <li><span className="font-medium">Пользователь</span> – физическое лицо, использующее Сайт</li>
                        <li><span className="font-medium">Продавец</span> – ООО "Сияй", владелец интернет-магазина Shine</li>
                        <li><span className="font-medium">Товар</span> – продукция, представленная на Сайте для продажи</li>
                        <li><span className="font-medium">Заказ</span> – оформленный Пользователем запрос на приобретение Товара</li>
                    </ul>
                </>
            )
        },
        {
            title: "Регистрация и аккаунт",
            icon: icons.user,
            content: (
                <>
                    <p>
                        Для совершения покупок на Сайте вы можете зарегистрировать аккаунт или оформить заказ без регистрации.
                    </p>
                    <p>
                        При регистрации вы обязуетесь предоставить достоверную информацию о себе. 
                        Вы несете ответственность за сохранность ваших учетных данных и за все действия, 
                        совершенные под вашей учетной записью.
                    </p>
                    <InfoAlert>
                        Мы рекомендуем использовать сложные пароли и не передавать доступ к вашему аккаунту третьим лицам.
                    </InfoAlert>
                </>
            )
        },
        {
            title: "Оформление заказа",
            icon: icons.bag,
            content: (
                <>
                    <p>
                        Оформление заказа осуществляется путем добавления товаров в корзину и заполнения формы заказа.
                    </p>
                    <p>
                        Договор купли-продажи считается заключенным с момента подтверждения заказа Продавцом 
                        посредством отправки уведомления на указанный Пользователем email.
                    </p>
                    <p>
                        Цены на товары указаны в рублях и включают в себя НДС. 
                        Продавец оставляет за собой право изменять цены на товары, однако это не распространяется 
                        на уже оформленные заказы.
                    </p>
                </>
            )
        },
        {
            title: "Доставка и получение",
            icon: icons.truck,
            content: (
                <>
                    <p>
                        Доставка осуществляется в соответствии с условиями, указанными на странице <a href="/delivery" className="text-[#8072DB] hover:text-[#6C60C9] underline">Доставка</a>.
                    </p>
                    <p>
                        При получении товара Пользователь обязан проверить комплектность и внешний вид товара.
                        В случае обнаружения недостатков, Пользователь вправе отказаться от товара или составить акт о выявленных недостатках.
                    </p>
                </>
            )
        },
        {
            title: "Возврат и обмен",
            icon: icons.book,
            content: (
                <>
                    <p>
                        Возврат товара надлежащего качества возможен в течение 14 дней с момента получения, 
                        если товар не был в употреблении, сохранены его товарный вид, потребительские свойства, 
                        пломбы, фабричные ярлыки и оригинальная упаковка.
                    </p>
                    <p>
                        Возврат товара ненадлежащего качества осуществляется в соответствии с Законом РФ 
                        "О защите прав потребителей".
                    </p>
                    <p>
                        Для оформления возврата необходимо связаться с нашим отделом поддержки клиентов.
                    </p>
                </>
            )
        },
        {
            title: "Интеллектуальная собственность",
            icon: icons.shield,
            content: (
                <>
                    <p>
                        Все материалы, размещенные на Сайте (включая тексты, изображения, логотипы, элементы дизайна) 
                        являются объектами интеллектуальной собственности Продавца или третьих лиц.
                    </p>
                    <p>
                        Любое использование материалов Сайта без письменного разрешения правообладателя запрещено 
                        и может повлечь ответственность, предусмотренную законодательством РФ.
                    </p>
                </>
            )
        },
        {
            title: "Ограничение ответственности",
            icon: icons.warning,
            content: (
                <p>
                    Продавец не несет ответственности за любые убытки, возникшие в результате использования 
                    или невозможности использования Сайта.
                </p>
            )
        }
    ];

    return (
        <InfoPage 
            title="Условия использования"
            heading="Условия использования"
            sections={sections}
        />
    );
} 