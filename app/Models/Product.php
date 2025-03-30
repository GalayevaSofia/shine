<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'ingredients',
        'weight',
        'volume',
        'manufacturer',
        'usage_instructions',
        'price',
        'image',
        'stock',
        'category_id',
        'featured',
        'status',
        'rating',
        'reviews_count',
        'popularity',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'featured' => 'boolean',
        'stock' => 'integer',
    ];

    protected $appends = [
        'average_rating',
        'best_price',
        'discount_percentage'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'order_items')
            ->withPivot('quantity', 'price')
            ->withTimestamps();
    }

    public function wishlists(): HasMany
    {
        return $this->hasMany(Wishlist::class);
    }

    public function wishlistUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'wishlists');
    }

    /**
     * Связь с моделью Promotion через промежуточную таблицу promotion_products
     */
    public function promotions(): BelongsToMany
    {
        return $this->belongsToMany(Promotion::class, 'promotion_products')
            ->withPivot('promotional_price')
            ->withTimestamps();
    }

    public function getAverageRatingAttribute()
    {
        // Since reviews table is removed, we'll use the rating field directly
        return $this->rating ?: 0;
    }
    
    /**
     * Получить лучшую цену с учетом скидок
     */
    public function getBestPriceAttribute()
    {
        // Проверяем наличие промоцены в pivot таблице
        if ($this->relationLoaded('promotions') && $this->promotions->isNotEmpty()) {
            // Выбираем минимальную цену из всех промоакций
            $bestPromoPrice = $this->promotions->min('pivot.promotional_price');
            if ($bestPromoPrice && $bestPromoPrice > 0) {
                return $bestPromoPrice;
            }
        }
        
        // Если нет промоцены из promotion_products, используем стандартную цену
        return $this->price;
    }
    
    /**
     * Получить процент скидки
     */
    public function getDiscountPercentageAttribute()
    {
        // Проверяем наличие промоцены в pivot таблице
        if ($this->relationLoaded('promotions') && $this->promotions->isNotEmpty()) {
            // Выбираем минимальную цену из всех промоакций
            $bestPromoPrice = $this->promotions->min('pivot.promotional_price');
            
            if ($bestPromoPrice && $bestPromoPrice > 0) {
                $originalPrice = $this->price;
                if ($originalPrice > 0) {
                    return round(($originalPrice - $bestPromoPrice) / $originalPrice * 100);
                }
            }
        }
        
        return 0;
    }
}
