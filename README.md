# Shine E-commerce Application

Shine is a modern e-commerce platform built with Laravel and React. The application includes product catalog, shopping cart, checkout, and user management features.

## Features

- Product catalog with categories and filters
- User authentication and registration
- Shopping cart functionality
- Order processing and history
- Admin panel for product/order management
- Promotions and discount codes

## Tech Stack

- **Backend**: Laravel 12, PHP 8.2+
- **Frontend**: React, Inertia.js
- **Styling**: Tailwind CSS
- **Database**: MySQL/PostgreSQL

## Requirements

- PHP 8.2+
- Composer
- Node.js and npm
- MySQL or PostgreSQL database

## Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/shine.git
cd shine
```

2. Install PHP dependencies:
```
composer install
```

3. Install JavaScript dependencies:
```
npm install
```

4. Create an environment file:
```
cp .env.example .env
```

5. Generate application key:
```
php artisan key:generate
```

6. Configure your database in the `.env` file:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=shine
DB_USERNAME=root
DB_PASSWORD=
```

7. Run the migrations and seed the database:
```
php artisan migrate --seed
```

8. Create a symbolic link for storage:
```
php artisan storage:link
```

9. Build assets:
```
npm run build
```

## Running the Application

1. For development:
```
composer dev
```
This will concurrently run the Laravel server, queue worker, logs, and Vite dev server.

2. For production:
```
npm run build
php artisan serve
```

## Default Credentials

**Admin User**:
- Email: admin@example.com
- Password: password

**Test User**:
- Email: test@example.com
- Password: password

## API Endpoints

### Public

- `GET /api/home` - Home page data (featured products, categories, promotions)
- `GET /api/categories` - List all categories
- `GET /api/products` - Product catalog with filters
- `GET /api/products/featured` - Featured products
- `GET /api/products/{id}` - Product details
- `GET /api/promotions/active` - Active promotions
- `POST /api/promotions/apply` - Apply promotion code

### Cart

- `GET /api/cart` - View cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/items/{id}` - Update cart item
- `DELETE /api/cart/items/{id}` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Authentication Required

- `GET /api/orders` - List user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/{id}` - Order details
- `POST /api/orders/{id}/cancel` - Cancel order

### Admin Only

- `GET /api/admin/categories` - List categories (admin)
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/{id}` - Update category
- `DELETE /api/admin/categories/{id}` - Delete category

- `GET /api/admin/products` - List products (admin)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/{id}` - Update product
- `DELETE /api/admin/products/{id}` - Delete product

- `GET /api/admin/orders` - List all orders
- `GET /api/admin/orders/{id}` - Order details (admin)
- `PUT /api/admin/orders/{id}` - Update order status

- `GET /api/admin/promotions` - List promotions
- `POST /api/admin/promotions` - Create promotion
- `PUT /api/admin/promotions/{id}` - Update promotion
- `DELETE /api/admin/promotions/{id}` - Delete promotion

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
