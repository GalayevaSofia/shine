<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ShowCartMigration extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'show:cart-migration';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Show the cart migration file';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $migrationFiles = File::glob(database_path('migrations/*_create_carts_table.php'));
        
        if (empty($migrationFiles)) {
            $this->error('Cart migration file not found!');
            return 1;
        }
        
        $this->info('Cart migration file:');
        $this->line(File::get($migrationFiles[0]));
        
        return 0;
    }
}
