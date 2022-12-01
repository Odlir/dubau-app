<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\StatusMarital;

class StatusMaritalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Statusmarital::create( [
            'statusmarital_ID'=>1,
            'statusmarital_Name'=>'SOLTERO',
            'statusmarital_StatusID'=>'1'
        ] );



        Statusmarital::create( [
            'statusmarital_ID'=>2,
            'statusmarital_Name'=>'CASADO',
            'statusmarital_StatusID'=>'1'
        ] );



        Statusmarital::create( [
            'statusmarital_ID'=>3,
            'statusmarital_Name'=>'VIUDO',
            'statusmarital_StatusID'=>'1'
        ] );



        Statusmarital::create( [
            'statusmarital_ID'=>4,
            'statusmarital_Name'=>'DIVORCIADO',
            'statusmarital_StatusID'=>'1'
        ] );



        Statusmarital::create( [
            'statusmarital_ID'=>5,
            'statusmarital_Name'=>'CONVIVIENTE',
            'statusmarital_StatusID'=>'1'
        ] );



        Statusmarital::create( [
            'statusmarital_ID'=>7,
            'statusmarital_Name'=>'NO REGISTRADO',
            'statusmarital_StatusID'=>'1'
        ] );


    }
}
