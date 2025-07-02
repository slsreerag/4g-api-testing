<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableClimateReport extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('climate_report', function (Blueprint $table) {
            $table->id();
            $table->string('machine_id');
            $table->string('ambient_temperature');
            $table->string('humidity');
            $table->string('light_intensity');
            $table->string('time_of_day');
            $table->string('water_temperature');
            $table->timestamps();
            $table->softDeletes();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('climate_report');
    }
}
