<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create( [
            'role_ID'=>1,
            'role_Name'=>'ASESOR COMERCIAL',
            'role_StatusID'=>'1'
        ] );

        Role::create( [
            'role_ID'=>2,
            'role_Name'=>'CONTABILIDAD',
            'role_StatusID'=>'1'
        ] );

        Role::create( [
            'role_ID'=>3,
            'role_Name'=>'ALMACEN',
            'role_StatusID'=>'1'
        ] );

        Role::create( [
            'role_ID'=>4,
            'role_Name'=>'ADMINISTRADOR',
            'role_StatusID'=>'1'
        ] );

        Role::create( [
            'role_ID'=>5,
            'role_Name'=>'ANALISTA',
            'role_StatusID'=>'1'
        ] );

        Role::create( [
            'role_ID'=>6,
            'role_Name'=>'AUDITOR',
            'role_StatusID'=>'1'
        ] );

        Role::create( [
            'role_ID'=>7,
            'role_Name'=>'ASISTENTA PERSONAL',
            'role_StatusID'=>'1'
        ] );

        Role::create( [
            'role_ID'=>8,
            'role_Name'=>'VENDEDORES SUPERVISOR',
            'role_StatusID'=>'1'
        ] );

        Role::create( [
            'role_ID'=>9,
            'role_Name'=>'CREDITOS COBRANZAS',
            'role_StatusID'=>'1'
        ] );

        Role::create( [
            'role_ID'=>10,
            'role_Name'=>'PRACTICANTE',
            'role_StatusID'=>'1'
        ] );

        Role::create( [
            'role_ID'=>11,
            'role_Name'=>'ASISTENTE CONTABLE',
            'role_StatusID'=>'1'
        ] );

        Role::create( [
            'role_ID'=>12,
            'role_Name'=>'BELLOTA',
            'role_StatusID'=>'1'
        ] );

        Role::create( [
            'role_ID'=>13,
            'role_Name'=>'SUB GERENTE',
            'role_StatusID'=>'1'
        ] );

        Role::create( [
            'role_ID'=>14,
            'role_Name'=>'VENDEDOR NORTE',
            'role_StatusID'=>'1'
        ] );

        Role::create( [
            'role_ID'=>15,
            'role_Name'=>'GERENTE DE OPERACIONES',
            'role_StatusID'=>'1'
        ] );

        Role::create( [
            'role_ID'=>16,
            'role_Name'=>'OPERACIONES',
            'role_StatusID'=>'1'
        ] );
    }
}
