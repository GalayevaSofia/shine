<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Disabling this migration as we're now creating the table without id from scratch
        // No need to modify an existing table
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Disabling down migration as well
    }
};
