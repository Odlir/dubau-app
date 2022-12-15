<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Ubigeous;

class UbigeousSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Ubigeous::create( [
            'ubigeous_ID'=>1,
            'ubigeous_DepartmentID'=>'BOUVET ISLAND',
            'ubigeous_ProvinceID'=>'1'
        ] );
    }
}
