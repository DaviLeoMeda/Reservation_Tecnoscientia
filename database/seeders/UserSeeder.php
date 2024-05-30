<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userData = [[
            'name' => 'Test User',
            'email' => 'test@example.com',
            'role' => 'Management',
            'password' => ''
        ], [
            'name' => 'Test User 2',
            'email' => 'test2@example.com',
            'role' => 'Employee',
            'password' => ''
        ], [
            'name' => 'Test User 3',
            'email' => 'test3@example.com',
            'role' => 'Employee',
            'password' => ''
        ]];

        foreach($userData as $user) {
            $new_user = new User($user);
            $new_user->save();
        }
    }
}
