<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ubigeous', function (Blueprint $table) {
            $table->id('ubigeous_ID');
            $table->string('ubigeous_DepartmentID')->nullable();
            $table->string('ubigeous_ProvinceID')->nullable();
            $table->string('ubigeous_DistrictID')->nullable();
            $table->string('ubigeous_Description')->nullable();
            $table->dateTime('ubigeous_CreationDate')->nullable();
            $table->string('ubigeous_CreationUser')->nullable();
            $table->dateTime('ubigeous_ModificationDate')->nullable();
            $table->string('ubigeous_ModificationUser')->nullable();
            $table->integer('ubigeous_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ubigeous');
    }
};
