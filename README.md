# Интернет-магазин Shine

Shine — это современная платформа электронной коммерции, созданная с использованием Laravel и React. Приложение включает в себя каталог товаров, корзину покупок, оформление заказа и функции управления пользователями.

## Возможности

- Каталог товаров с категориями и фильтрами
- Аутентификация и регистрация пользователей
- Функционал корзины покупок
- Обработка заказов и история
- Панель администратора для управления товарами/заказами
- Акции и скидочные коды

## Технологический стек

- **Бэкенд**: Laravel 12, PHP 8.2+
- **Фронтенд**: React, Inertia.js
- **Стилизация**: Tailwind CSS
- **База данных**: MySQL/PostgreSQL

## Требования

- PHP 8.2+
- Composer
- Node.js и npm
- База данных MySQL или PostgreSQL

## Установка

1. Клонировать репозиторий:
```
git clone https://github.com/yourusername/shine.git
cd shine
```

2. Установить PHP-зависимости:
```
composer install
```

3. Установить JavaScript-зависимости:
```
npm install
```

4. Создать файл окружения:
```
cp .env.example .env
```

5. Сгенерировать ключ приложения:
```
php artisan key:generate
```

6. Настроить базу данных в файле `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=shine
DB_USERNAME=root
DB_PASSWORD=
```

7. Выполнить миграции и заполнить базу данных:
```
php artisan migrate --seed
```

8. Создать символическую ссылку для хранилища:
```
php artisan storage:link
```

9. Собрать ресурсы:
```
npm run build
```

## Запуск приложения

1. Для разработки:
```
composer dev
```
Это запустит одновременно сервер Laravel, обработчик очередей, логи и сервер разработки Vite.

2. Для производственной среды:
```
npm run build
php artisan serve
```

## Учетные данные по умолчанию

**Администратор**:
- Email: admin@example.com
- Пароль: password

**Тестовый пользователь**:
- Email: test@example.com
- Пароль: password

## API-эндпоинты

### Публичные

- `GET /api/home` - Данные главной страницы (популярные товары, категории, акции)
- `GET /api/categories` - Список всех категорий
- `GET /api/products` - Каталог товаров с фильтрами
- `GET /api/products/featured` - Популярные товары
- `GET /api/products/{id}` - Детали товара
- `GET /api/promotions/active` - Активные акции
- `POST /api/promotions/apply` - Применить промокод

### Корзина

- `GET /api/cart` - Просмотр корзины
- `POST /api/cart/add` - Добавить товар в корзину
- `PUT /api/cart/items/{id}` - Обновить позицию в корзине
- `DELETE /api/cart/items/{id}` - Удалить позицию из корзины
- `DELETE /api/cart/clear` - Очистить корзину

### Требуют аутентификации

- `GET /api/orders` - Список заказов пользователя
- `POST /api/orders` - Создать новый заказ
- `GET /api/orders/{id}` - Детали заказа
- `POST /api/orders/{id}/cancel` - Отменить заказ

### Только для администратора

- `GET /api/admin/categories` - Список категорий (админ)
- `POST /api/admin/categories` - Создать категорию
- `PUT /api/admin/categories/{id}` - Обновить категорию
- `DELETE /api/admin/categories/{id}` - Удалить категорию

- `GET /api/admin/products` - Список товаров (админ)
- `POST /api/admin/products` - Создать товар
- `PUT /api/admin/products/{id}` - Обновить товар
- `DELETE /api/admin/products/{id}` - Удалить товар

- `GET /api/admin/orders` - Список всех заказов
- `GET /api/admin/orders/{id}` - Детали заказа (админ)
- `PUT /api/admin/orders/{id}` - Обновить статус заказа

- `GET /api/admin/promotions` - Список акций
- `POST /api/admin/promotions` - Создать акцию
- `PUT /api/admin/promotions/{id}` - Обновить акцию
- `DELETE /api/admin/promotions/{id}` - Удалить акцию

## Лицензия

Фреймворк Laravel является программным обеспечением с открытым исходным кодом, лицензированным в соответствии с [лицензией MIT](https://opensource.org/licenses/MIT).
