<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('family', function (Blueprint $table) {
            $table->id('family_id');
            $table->string('name');
            $table->integer('internal_code');
            $table->integer('user_code');
            $table->integer('percentage');
            $table->string('type')->comment('P Producto, S Servicio')->nullable();
            $table->integer('created_by')->nullable();
            $table->dateTime('created_in')->nullable();
            $table->integer('updated_by')->nullable();
            $table->dateTime('updated_in')->nullable();
            $table->integer('status')->comment('0 deleted, 1 actived')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('family');
    }
};
