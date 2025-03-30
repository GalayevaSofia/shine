<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Don't truncate to avoid foreign key constraint issues
        // We'll just directly add the users
        
        // Check if admin user exists
        if (!User::where('email', 'admin@shine.ru')->exists()) {
            // Создаем администратора
            User::create([
                'name' => 'Администратор',
                'email' => 'admin@shine.ru',
                'email_verified_at' => null,
                'password' => '$2y$12$NFW6U/rHIJS7E6wdXeQYX.OKxXogXqzJwr2GIqGOjxa/4BGBdEZ5a', // password
                'remember_token' => null,
                'phone' => '79999999999',
                'address' => null,
                'city' => null,
                'zip' => null,
                'country' => null,
                'is_admin' => true,
                'created_at' => '2025-03-23 15:53:37',
                'updated_at' => '2025-03-23 15:53:37',
            ]);
        }

        // Check if test user exists
        if (!User::where('email', 'user@shine.ru')->exists()) {
            // Создаем тестового пользователя
            User::create([
                'name' => 'Тестовый Пользователь',
                'email' => 'user@shine.ru',
                'email_verified_at' => null,
                'password' => '$2y$12$VY5pvzkWnYb95okhjFWBze0THaDyHLOTkh54W59SiKbCMbxJW7cca', // password
                'remember_token' => null,
                'phone' => '79111111111',
                'address' => null,
                'city' => null,
                'zip' => null,
                'country' => null,
                'is_admin' => false,
                'created_at' => '2025-03-23 15:53:37',
                'updated_at' => '2025-03-23 15:53:37',
            ]);
        }
        
        // Check if Sofya exists
        if (!User::where('email', 'galayeva.04@bk.ru')->exists()) {
            // Создаем пользователя Софья
            User::create([
                'name' => 'Софья Галаева',
                'email' => 'galayeva.04@bk.ru',
                'email_verified_at' => null,
                'password' => '$2y$12$R/lKDFpv4o19WYyjDD0v7e9e6dRX34aydT8rv6l9xzJTnONxc8DmS', // password
                'remember_token' => '4nJYTGWSWVeAnWaw1GX2sVComMmTc9LUen4TR7Pg7tDJGx3BWAasSvG5LoVk',
                'phone' => '79684092900',
                'address' => null,
                'city' => null,
                'zip' => null,
                'country' => null,
                'is_admin' => false,
                'created_at' => '2025-03-23 15:55:51',
                'updated_at' => '2025-03-26 22:36:40',
            ]);
        }
        
        // Check if Arkady exists
        if (!User::where('email', 'home@mail.ru')->exists()) {
            // Создаем пользователя Аркадий
            User::create([
                'name' => 'Аркадий',
                'email' => 'home@mail.ru',
                'email_verified_at' => null,
                'password' => '$2y$12$pdjqlVkcmGtnplCu98II.e4u7EjJpmfSSi8G/vFR.oJA.QEEu8cIy', // password
                'remember_token' => null,
                'phone' => null,
                'address' => null,
                'city' => null,
                'zip' => null,
                'country' => null,
                'is_admin' => false,
                'created_at' => '2025-03-27 02:17:09',
                'updated_at' => '2025-03-27 02:17:09',
            ]);
        }
    }
} 