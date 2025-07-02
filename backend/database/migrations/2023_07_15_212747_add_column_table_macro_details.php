<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnTableMacroDetails extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('macro_details', function (Blueprint $table) {
            $table->string('reservoir_mixing_duration')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('macro_details', function (Blueprint $table) {
            $table->string('reservoir_mixing_duration')->nullable();
        });
    }
}
