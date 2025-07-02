<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Create32ioPumpSettingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('32io_pump_setting', function (Blueprint $table) {
            $table->id();
            $table->string('device_id');
            $table->string('pump_name');
            $table->string('pump_id');
            $table->string('switchonoff');
            $table->string('status');
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
        Schema::dropIfExists('32io_pump_setting');
    }
}
