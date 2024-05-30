<?php

namespace Database\Seeders;

use App\Models\Desk;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DeskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $desks = [
            ['name' => '1', 'office_id' => '1'],
            ['name' => '2', 'office_id' => '1'],
            ['name' => '3', 'office_id' => '1'],
            ['name' => '4', 'office_id' => '1'],
            ['name' => '5', 'office_id' => '1'],
            ['name' => '1', 'office_id' => '2'],
            ['name' => '2', 'office_id' => '2'],
            ['name' => '3', 'office_id' => '2'],
            ['name' => '4', 'office_id' => '2'],
            ['name' => '5', 'office_id' => '2'],
            ['name' => '1', 'office_id' => '3'],
            ['name' => '2', 'office_id' => '3'],
            ['name' => '3', 'office_id' => '3'],
            ['name' => '4', 'office_id' => '3'],
            ['name' => '5', 'office_id' => '3'],
            ['name' => '1', 'office_id' => '4'],
            ['name' => '2', 'office_id' => '4'],
            ['name' => '3', 'office_id' => '4'],
            ['name' => '4', 'office_id' => '4'],
            ['name' => '5', 'office_id' => '4'],
        ];

        foreach ($desks as $d) {
            $desk = new Desk($d);
            $desk->save();
        }
    }
}
