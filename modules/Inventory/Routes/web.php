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

Route::prefix('administrator/inventory')->group(function () {
    Route::group(['middleware' => ['role:administrator']], function () {
        Route::get('/forecast', 'InventoryController@forcasting');
    });
});
Route::prefix('production/inventory')->group(function () {
    Route::group(['middleware' => ['role:production']], function () {
        Route::get('/materialneeds', 'InventoryController@materialneeds');
        Route::get('/materialstock', 'MaterialController@materialstock');
        Route::get('/forcastingresult', 'InventoryController@forcastingresult');
    });
});
Route::prefix('logistic/inventory')->group(function () {
    Route::group(['middleware' => ['role:logistic']], function () {
        Route::get('/', 'MaterialController@purchasedata');
        Route::get('/materialneeds', 'InventoryController@materialneeds');
        Route::get('/materialstock', 'MaterialController@materialstock');
        Route::get('/purchasingmaterial', 'MaterialController@formpurchasingmaterial')->name('purchasingmaterial');
        Route::post('/savepurchase', 'MaterialController@savepurchase')->name('savepurchase');
        Route::get('/purchasedata', 'MaterialController@purchasedata')->name('purchasedata');
        Route::get('/editpurchase/{id}', 'MaterialController@editpurchase')->name('editpurchase');
        Route::patch('/updatepurchase/{id}', 'MaterialController@updatepurchase')->name('updatepurchase');
        Route::delete('/purchasedelete/{id}', 'MaterialController@purchasedelete')->name('purchasedelete');
    });
});
