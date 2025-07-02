<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableGrowthStage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('growth_stage', function (Blueprint $table) {
            $table->string('card_id')->nullable();
            $table->string('macro_id')->nullable();  
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('growth_stage', function (Blueprint $table) {
            $table->string('card_id')->nullable();  
            $table->string('macro_id')->nullable();
        });
    }
}
