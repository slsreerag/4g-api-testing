<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableDoserDetails extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doser_details', function (Blueprint $table) {
            $table->id();
            $table->string('machine_id');
            $table->string('macro_id');
            $table->string('growth_stage');
            $table->string('date');
            $table->string('time');
            $table->string('pre_tds');
            $table->string('post_tds');
            $table->string('pre_ph');
            $table->string('post_ph');
            $table->string('motor_a_time');
            $table->string('motor_b_time');
            $table->string('motor_acd_time');
            $table->string('motor_alk_time');
            $table->string('motor_cmg_time');
            $table->string('ph_update');
            $table->string('tds_update');
            $table->string('cal_mg_update');
            $table->string('report_id');
            $table->string('plant_name');
            $table->string('gp_1');
            $table->string('time_since_last_update');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('doser_details');
    }
}
