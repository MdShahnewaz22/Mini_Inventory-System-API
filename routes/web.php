<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });


Route::get('/{any}', function () {
    return view('welcome'); // This should match your Blade file name (app.blade.php)
})->where('any', '.*');





