<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


    Route::group(['middleware' => ['role:production|administrator|logistic']], function () {
        Route::get('/getProductionData/{id}', 'ProductionController@getProductionPeriode')->name('getProductionData');
    });

Route::prefix('{role}/production')->group(function () {
    Route::group(['middleware' => ['role:production|administrator']], function () {
        Route::get('/dataproduction', 'ProductionController@production')->name('production');
        Route::get('/addproduction', 'ProductionController@addProduction')->name('addproduction');
        Route::post('/saveproduction', 'ProductionController@saveProduction')->name('saveproduction');
        Route::delete('/deleteproduction/{id}', 'ProductionController@deleteproduction')->name('deleteproduction');
        Route::get('/editproduction/{id}', 'ProductionController@editproduction')->name('editproduction');
        Route::patch('/updateproduction/{id}', 'ProductionController@updateproduction')->name('updateproduction');
        Route::get('/runningproduction', 'ProductionController@runningProduction')->name('runningproduction');
        Route::get('/finishproduction', 'ProductionController@finishProduction')->name('finishproduction');
        Route::patch('/productionstatus/{id}', 'ProductionController@changeProductionStatus')->name('productionstatus');
    });
});
Route::prefix('{role}/production')->group(function(){
    Route::group(['middleware' => ['role:administrator|logistic']], function () {
        Route::get('/productionneeds', 'ProductionController@runningProduction')->name('materialneeds.logistic');
    });
});