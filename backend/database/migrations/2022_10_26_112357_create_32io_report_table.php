<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Create32ioReportTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('32io_report', function (Blueprint $table) {
            $table->id();
            $table->string('device_id');
            $table->string('power_sts');
            $table->string('r_voltage');
            $table->string('y_voltage');
            $table->string('b_voltage');
            $table->string('r_presence');
            $table->string('y_presence');
            $table->string('b_presence');
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
        Schema::dropIfExists('32io_report');
    }
}
