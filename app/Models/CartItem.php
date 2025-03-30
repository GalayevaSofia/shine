<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'cart_id',
        'product_id',
        'quantity',
    ];

    protected $casts = [
        'quantity' => 'integer',
    ];

    protected $appends = [
        'subtotal',
    ];

    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Получить общую стоимость товара (цена со скидкой * количество).
     */
    public function getSubtotalAttribute()
    {
        // Получаем best_price из продукта, если она доступна
        if ($this->product && $this->product->best_price !== null) {
            $price = $this->product->best_price;
        } else {
            $price = $this->product->price;
        }

        return $price * $this->quantity;
    }
}
