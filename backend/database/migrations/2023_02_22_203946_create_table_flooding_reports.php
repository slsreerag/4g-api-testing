<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableFloodingReports extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flooding_reports', function (Blueprint $table) {
            $table->id();
            $table->string('machine_id');
            $table->string('card_id');
            $table->string('macro_id');
            $table->string('flood_status');
            $table->string('duration');
            $table->string('date');
            $table->string('time');
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
        Schema::dropIfExists('flooding_reports');
    }
}
