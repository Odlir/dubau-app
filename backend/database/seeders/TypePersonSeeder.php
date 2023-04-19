<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TypePerson;

class TypePersonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TypePerson::create([
            'type_person_ID' => 1,
            'type_person_Name' => 'P. Natural',
            'type_person_Initial' => '',
            'type_person_StatusID' => '1'
        ]);


        TypePerson::create([
            'type_person_ID' => 2,
            'type_person_Name' => 'P. Juridica',
            'type_person_Description' => '',
            'type_person_StatusID' => '1'
        ]);



    }
}
