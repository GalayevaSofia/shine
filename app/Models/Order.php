<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_number',
        'status',
        'subtotal',
        'delivery_fee',
        'total',
        'delivery_method',
        'payment_method',
        'customer_name',
        'customer_email',
        'customer_phone',
        'delivery_address',
        'comment'
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'delivery_fee' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'order_items')
            ->withPivot('quantity', 'price')
            ->withTimestamps();
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public static function generateOrderNumber(): string
    {
        $prefix = 'SH';
        $timestamp = now()->format('ymd');
        $random = str_pad(random_int(1, 9999), 4, '0', STR_PAD_LEFT);
        return $prefix . $timestamp . $random;
    }

    public function getStatusTextAttribute(): string
    {
        return match($this->status) {
            'pending' => 'В обработке',
            'processing' => 'Обрабатывается',
            'shipped' => 'Отправлен',
            'delivered' => 'Доставлен',
            'cancelled' => 'Отменён',
            default => 'Неизвестно'
        };
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($order) {
            // Проверяем значения перед сохранением
            if (isset($order->subtotal)) {
                $order->subtotal = (float)$order->subtotal;
            }
            
            if (isset($order->delivery_fee)) {
                $order->delivery_fee = (float)$order->delivery_fee;
            }
            
            if (isset($order->total)) {
                $order->total = (float)$order->total;
            } else if (isset($order->subtotal) && isset($order->delivery_fee)) {
                $order->total = (float)$order->subtotal + (float)$order->delivery_fee;
            }
            
            \Illuminate\Support\Facades\Log::info('Значения заказа перед сохранением (boot)', [
                'subtotal' => $order->subtotal,
                'delivery_fee' => $order->delivery_fee,
                'total' => $order->total,
                'subtotal_type' => gettype($order->subtotal),
                'total_type' => gettype($order->total)
            ]);
        });
        
        static::updating(function ($order) {
            // Проверяем значения перед обновлением
            if (isset($order->subtotal)) {
                $order->subtotal = (float)$order->subtotal;
            }
            
            if (isset($order->delivery_fee)) {
                $order->delivery_fee = (float)$order->delivery_fee;
            }
            
            if (isset($order->total)) {
                $order->total = (float)$order->total;
            } else if (isset($order->subtotal) && isset($order->delivery_fee)) {
                $order->total = (float)$order->subtotal + (float)$order->delivery_fee;
            }
            
            \Illuminate\Support\Facades\Log::info('Значения заказа перед обновлением (boot)', [
                'subtotal' => $order->subtotal,
                'delivery_fee' => $order->delivery_fee,
                'total' => $order->total
            ]);
        });
    }
} 