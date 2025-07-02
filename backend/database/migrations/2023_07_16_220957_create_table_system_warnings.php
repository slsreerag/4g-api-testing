<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableSystemWarnings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('system_warnings', function (Blueprint $table) {
            $table->id();
            $table->string('machine_id');
            $table->string('message')->nullable();
            $table->string('reporting_date')->nullable();
            $table->string('reporting_time')->nullable();
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
        Schema::dropIfExists('system_warnings');
    }
}
