<?php

namespace Database\Seeders;

use App\Models\Office;
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

        foreach($offices as $o) {
            $office = new Office($o);
            $office->save();
        }
    }
}
