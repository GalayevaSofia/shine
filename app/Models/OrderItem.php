<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id',
        'product_name',
        'price',
        'quantity',
        'subtotal'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'subtotal' => 'decimal:2',
        'quantity' => 'integer',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    // protected static function boot()
    // {
    //     parent::boot();

    //     static::creating(function ($item) {
    //         // Проверяем, установлен ли subtotal, если нет - вычисляем его
    //         if (empty($item->subtotal) || $item->subtotal <= 0) {
    //             $itemPrice = (float)$item->price;
    //             $itemQuantity = (int)$item->quantity;
    //             $item->subtotal = $itemPrice * $itemQuantity;
                
    //             \Illuminate\Support\Facades\Log::info('Рассчитан subtotal для элемента заказа в boot методе', [
    //                 'order_id' => $item->order_id,
    //                 'product_id' => $item->product_id,
    //                 'price' => $itemPrice,
    //                 'quantity' => $itemQuantity,
    //                 'subtotal' => $item->subtotal
    //             ]);
    //         }
    //     });

    //     static::updating(function ($item) {
    //         // Проверяем, установлен ли subtotal, если нет - вычисляем его
    //         if (empty($item->subtotal) || $item->subtotal <= 0) {
    //             $itemPrice = (float)$item->price;
    //             $itemQuantity = (int)$item->quantity;
    //             $item->subtotal = $itemPrice * $itemQuantity;
                
    //             \Illuminate\Support\Facades\Log::info('Обновлен subtotal для элемента заказа в boot методе', [
    //                 'order_id' => $item->order_id,
    //                 'product_id' => $item->product_id,
    //                 'price' => $itemPrice,
    //                 'quantity' => $itemQuantity,
    //                 'subtotal' => $item->subtotal
    //             ]);
    //         }
    //     });
    // }
} 