<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableSystemSetting extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('system_setting', function (Blueprint $table) {
            $table->string('flooding_duration')->nullable();
            $table->string('draining_duration')->nullable();
            $table->string('system_shutdown_waiting_time')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('system_setting', function (Blueprint $table) {
            $table->string('flooding_duration')->nullable();
            $table->string('draining_duration')->nullable();
            $table->string('system_shutdown_waiting_time')->nullable();
        });
    }
}
