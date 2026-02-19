<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserApiController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Rutas públicas para móviles
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Rutas protegidas con token Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // CRUD de usuarios (solo Super Su)
    Route::get('/users', [UserApiController::class, 'index']);
    Route::post('/users', [UserApiController::class, 'store']);
    Route::put('/users/{user}', [UserApiController::class, 'update']);
    Route::delete('/users/{user}', [UserApiController::class, 'destroy']);
    Route::post('/users/{user}/activate', [UserApiController::class, 'activate']);
});
