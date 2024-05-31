<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Locale;
use App\Http\Controllers\API\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/set-locale', [Locale::class, 'setLocale'])->middleware('auth:sanctum');

Route::prefix('users')->middleware('auth:sanctum')->group(function () {
    Route::post('/create', [UserController::class, 'create']);
    Route::get('/read', [UserController::class, 'read']);
    Route::post('/update', [UserController::class, 'update']);
    Route::post('/delete', [UserController::class, 'delete']);
});
