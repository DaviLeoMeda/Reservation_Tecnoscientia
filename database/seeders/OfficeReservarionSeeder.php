<?php

namespace Database\Seeders;

use App\Models\OfficeReservation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OfficeReservarionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $office_reservations = [
            'reservation_day' => '2024-05-15',
            'morning_busy' => false,
            'afternoon_busy' => false,
        ];

        $new_or = new OfficeReservation();
    }
}
