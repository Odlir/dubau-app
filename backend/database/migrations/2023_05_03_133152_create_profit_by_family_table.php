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
        Schema::create('profit_by_family', function (Blueprint $table) {
            $table->id('profit_by_family_id');
            $table->unsignedBigInteger('family_id');
            $table->unsignedBigInteger('category_id');
            $table->integer('coin_id')->comment('0 SOLES, 1 DOLARES')->nullable();
            $table->integer('percentage');
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
        Schema::dropIfExists('profit_by_family');
    }
};
