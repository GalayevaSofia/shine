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
        Schema::table('promotion_products', function (Blueprint $table) {
            if (!Schema::hasColumn('promotion_products', 'promotional_price')) {
                $table->decimal('promotional_price', 10, 2)->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('promotion_products', function (Blueprint $table) {
            if (Schema::hasColumn('promotion_products', 'promotional_price')) {
                $table->dropColumn('promotional_price');
            }
        });
    }
};
