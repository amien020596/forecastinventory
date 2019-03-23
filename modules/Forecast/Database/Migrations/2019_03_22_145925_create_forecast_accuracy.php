<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateForecastAccuracy extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('forecast_accuracy', function (Blueprint $table) {
            $table->increments('id');
            $table->string('method');
            $table->float('error', 8, 2);
            $table->float('error_abs', 8, 2);
            $table->float('error_square', 8, 2);
            $table->float('error_percentage', 8, 2);
            $table->float('error_abs_percent', 8, 2);
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
        Schema::dropIfExists('');
    }
}
