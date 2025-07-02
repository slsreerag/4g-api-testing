<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTable32ioPumpSettingColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('32io_pump_setting', function (Blueprint $table) {
            $table->string('P21')->nullable();
            $table->string('P22')->nullable();
            $table->string('P23')->nullable();
            $table->string('P24')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('32io_pump_setting', function (Blueprint $table) {
            $table->string('P21')->nullable();
            $table->string('P22')->nullable();
            $table->string('P23')->nullable();
            $table->string('P24')->nullable();
        });
    }
}
