<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TypeDocument;

class TypeDocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Typedocument::create([
            'typedocument_ID' => 1,
            'typedocument_Name' => 'Documento Nacional de Identidad',
            'typedocument_Initial' => 'D.N.I.',
            'typedocument_StatusID' => '1'
        ]);


        Typedocument::create([
            'typedocument_ID' => 2,
            'typedocument_Name' => 'Carnet de Extranjeria',
            'typedocument_Initial' => 'C.E.',
            'typedocument_StatusID' => '1'
        ]);
        Typedocument::create([
            'typedocument_ID' => 3,
            'typedocument_Name' => 'Registro Unico de Contribuyentes',
            'typedocument_Initial' => 'R.U.C',
            'typedocument_StatusID' => '1'
        ]);
    }
}
