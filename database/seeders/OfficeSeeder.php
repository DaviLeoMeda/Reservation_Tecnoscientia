<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OfficeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $offices = [
            ['name' => 'Management'],
            ['name' => 'Development'],
            ['name' => 'Network'],
            ['name' => 'Commercial'],
        ];
    }
}
