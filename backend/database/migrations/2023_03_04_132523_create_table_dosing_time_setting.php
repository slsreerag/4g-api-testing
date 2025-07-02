<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableDosingTimeSetting extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dosing_time_settings', function (Blueprint $table) {
            $table->id();
            $table->string('machine_id');
            $table->string('testing_start_htime1');
            $table->string('testing_start_htime2');
            $table->string('testing_start_htime3');
            $table->string('testing_start_htime4');
            $table->string('testing_start_mtime1');
            $table->string('testing_start_mtime2');
            $table->string('testing_start_mtime3');
            $table->string('testing_start_mtime4');
            $table->integer('response_status');
            $table->integer('status');
            $table->bigInteger('created_by')->unsigned()->nullable();
            $table->bigInteger('updated_by')->unsigned()->nullable();
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
        Schema::dropIfExists('dosing_time_settings');
    }
}
