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
        Schema::create('person', function (Blueprint $table) {
            $table->id('person_ID');
            $table->unsignedBigInteger('nationality_ID');
            $table->foreign('nationality_ID')->references('nationality_ID')->on('nationality');
            $table->unsignedBigInteger('ubigeous_PlaceBirth');
            $table->foreign('ubigeous_PlaceBirth')->references('ubigeous_ID')->on('ubigeous');
            $table->unsignedBigInteger('ubigeous_Home');
            $table->foreign('ubigeous_Home')->references('ubigeous_ID')->on('ubigeous');
            $table->unsignedBigInteger('statusmarital_ID');
            $table->foreign('statusmarital_ID')->references('statusmarital_ID')->on('statusmarital');
            $table->unsignedBigInteger('typedocument_ID');
            $table->foreign('typedocument_ID')->references('typedocument_ID')->on('typedocument');
            $table->string('person_Name')->nullable();
            $table->string('person_LastNamePaternal')->nullable();
            $table->string('person_LastNameMaternal')->nullable();
            $table->string('person_Gender')->nullable();
            $table->string('person_RUC')->nullable();
            $table->string('person_NumberDocumentID')->nullable();
            $table->string('person_DateBirth')->nullable();
            $table->string('person_Direction')->nullable();
            $table->string('person_Phone')->nullable();
            $table->string('person_CellPhone')->nullable();
            $table->string('person_Email')->nullable();
            $table->string('person_Home')->nullable();
            $table->string('person_WebSite')->nullable();
            $table->string('person_TypeAccountSoles')->nullable();
            $table->string('person_TypeAccountDolares')->nullable();
            $table->string('person_AccountNumber')->nullable();
            $table->dateTime('person_CreationDate')->nullable();
            $table->string('person_CreationUser')->nullable();
            $table->dateTime('person_ModificationDate')->nullable();
            $table->string('person_ModificationUser')->nullable();
            $table->integer('person_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('person');
    }
};
