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
        Schema::create('company', function (Blueprint $table) {
            $table->id('company_id');
            $table->unsignedBigInteger('type_document_id');
            //$table->foreign('type_document_id')->references('type_document_id')->on('type_document');
            $table->unsignedBigInteger('commercial_section_id');
            //$table->foreign('commercial_section_id')->references('commercial_section_id')->on('commercial_section');
            $table->string('ruc')->nullable();
            $table->string('business_name')->nullable();
            $table->dateTime('phone')->nullable();
            $table->dateTime('cellphone')->nullable();
            $table->dateTime('website')->nullable();
            $table->dateTime('email')->nullable();
            $table->dateTime('direction')->nullable();
            $table->string('created_by')->nullable();
            $table->dateTime('created_in')->nullable();
            $table->integer('status')->comment('0 deleted, 1 actived')->nullable();

       /*   $table->string('created_by')->nullable();
            $table->dateTime('created_in')->nullable();
            $table->string('updated_by')->nullable();
            $table->dateTime('updated_in')->nullable();
            $table->string('updated_by')->nullable();
            $table->dateTime('updated_in')->nullable();
            $table->dateTime('deleted_by')->nullable();
            $table->dateTime('deleted_in')->nullable();
            $table->integer('status')->comment('0 removed, 1 activated')->nullable();*/
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('company');
    }
};
