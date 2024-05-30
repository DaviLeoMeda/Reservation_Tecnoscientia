<?php

namespace Database\Seeders;

use App\Models\OfficeReservation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OfficeReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $office_reservations = [
            ['user_id' => '1', 'desk_id' => '2','reservation_day' => '2024-05-15', 'morning_busy' => false, 'afternoon_busy' => true],
            ['user_id' => '2', 'desk_id' => '1','reservation_day' => '2024-05-14', 'morning_busy' => true, 'afternoon_busy' => false],
            ['user_id' => '3', 'desk_id' => '3','reservation_day' => '2024-05-13', 'morning_busy' => true, 'afternoon_busy' => false],
        ];

        foreach ($office_reservations as $elem) {
            $new_or = new OfficeReservation();
            $new_or->user_id = $elem['user_id'];
            $new_or->desk_id = $elem['desk_id'];
            $new_or->reservation_day = $elem['reservation_day'];
            $new_or->morning_busy = $elem['morning_busy'];
            $new_or->afternoon_busy = $elem['afternoon_busy'];
            $new_or->save();
        }
    }
}
