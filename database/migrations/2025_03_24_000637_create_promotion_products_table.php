<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Сначала проверяем, существует ли таблица promotions 
        if (!Schema::hasTable('promotions')) {
            Schema::create('promotions', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('slug')->unique();
                $table->text('description')->nullable();
                $table->string('image')->nullable();
                $table->string('code')->nullable();
                $table->integer('discount_percentage')->nullable();
                $table->decimal('discount_amount', 10, 2)->nullable();
                $table->timestamp('start_date');
                $table->timestamp('end_date');
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        // Check if promotion_products table exists before creating it
        if (!Schema::hasTable('promotion_products')) {
            Schema::create('promotion_products', function (Blueprint $table) {
                $table->id();
                $table->foreignId('promotion_id')->constrained('promotions')->onDelete('cascade');
                $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
                $table->decimal('promotional_price', 10, 2)->nullable();
                $table->timestamps();
                // Add a unique constraint to prevent duplicate entries
                $table->unique(['promotion_id', 'product_id']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotion_products');
    }
};
