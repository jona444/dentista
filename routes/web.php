<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\SolicitudRadiograficaController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ── PÚBLICA ───────────────────────────────────────────────────────────────────
Route::get('/', fn () => Inertia::render('Welcome'));

// ── INVITADOS (guest) ─────────────────────────────────────────────────────────
Route::middleware('guest')->group(function () {
    Route::get('register',  [RegisteredUserController::class,      'create'])->name('register');
    Route::post('register', [RegisteredUserController::class,      'store']);
    Route::get('login',     [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login',    [AuthenticatedSessionController::class, 'store']);
});

// ── AUTENTICADOS ──────────────────────────────────────────────────────────────
Route::middleware('auth')->group(function () {

    // Dashboard
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

    // Logout
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    // ── Usuarios (solo Super Su) ──────────────────────────────────────────────
    Route::resource('usuarios', UserController::class)
        ->except(['show'])
        ->names('usuarios');

    // ── Solicitudes Radiográficas ─────────────────────────────────────────────
    Route::resource('solicitudes-radiograficas', SolicitudRadiograficaController::class)
        ->parameters(['solicitudes-radiograficas' => 'solicitudesRadiografica'])
        ->names('solicitudes-radiograficas');
});
