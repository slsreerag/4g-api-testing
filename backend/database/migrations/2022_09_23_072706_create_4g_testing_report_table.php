<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Create4gTestingReportTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('4g_testing_report', function (Blueprint $table) {
            $table->id();
            $table->string('device_id');
            $table->bigInteger('count')->unsigned();
            $table->string('time_since_last_update');
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
        Schema::dropIfExists('4g_testing_report');
    }
}
