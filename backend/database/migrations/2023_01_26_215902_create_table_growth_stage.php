<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableGrowthStage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('growth_stage', function (Blueprint $table) {
            $table->id();
            $table->string('machine_id');
            $table->bigInteger('plant_id')->unsigned();
            $table->integer('status');
            $table->integer('response_status');
            $table->bigInteger('created_by')->unsigned()->nullable();
            $table->bigInteger('updated_by')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('growth_stage', function (Blueprint $table) {
            $table->foreign('plant_id')->references('id')->on('plant_details');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('growth_stage');
    }
}
