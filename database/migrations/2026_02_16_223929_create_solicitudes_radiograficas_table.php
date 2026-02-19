<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('solicitudes_radiograficas', function (Blueprint $table) {
            $table->id();

            // ── DATOS DEL PACIENTE ──
            $table->string('nombre');
            $table->string('apellido_paterno');
            $table->string('apellido_materno')->nullable();
            $table->date('fecha');
            $table->string('doctor_solicitante')->nullable();
            $table->string('telefono')->nullable();

            // ── TOMOGRAFÍAS CBCT ──
            $table->string('cbct_4x4_od')->nullable();
            $table->boolean('cbct_8x5_maxilar')->default(false);
            $table->boolean('cbct_8x5_mandibula')->default(false);
            $table->boolean('cbct_8x8_maxilar_mandibula')->default(false);
            $table->boolean('cbct_atm_derecha')->default(false);
            $table->boolean('cbct_atm_izquierda')->default(false);
            $table->boolean('cbct_atm_ambas')->default(false);
            $table->boolean('cbct_atm_oclusion')->default(false);
            $table->boolean('cbct_atm_apertura')->default(false);
            $table->boolean('cbct_atm_ambas_pos')->default(false);
            $table->boolean('cbct_12x85_oclusion')->default(false);
            $table->boolean('cbct_12x85_mordedera')->default(false);
            $table->boolean('cbct_12x14_oclusion')->default(false);
            $table->boolean('cbct_12x14_mordedera')->default(false);
            $table->json('cbct_fov_seleccionados')->nullable();

            // ── ZONA DE INTERÉS ──
            $table->text('cbct_zona_interes_obs')->nullable();

            // ── RADIOGRAFÍAS ──
            $table->boolean('rx_panoramica')->default(false);
            $table->boolean('rx_lateral_craneo')->default(false);
            $table->boolean('rx_lateral_completa')->default(false);
            $table->boolean('rx_lateral_solo_perfil')->default(false);
            $table->boolean('rx_atm_lat')->default(false);
            $table->boolean('rx_atm_ap')->default(false);
            $table->boolean('rx_senos_lat_waters_pa')->default(false);
            $table->boolean('rx_caldwell')->default(false);
            $table->boolean('rx_hirtz')->default(false);
            $table->boolean('rx_waters')->default(false);
            $table->boolean('rx_waters_boca_abierta')->default(false);
            $table->boolean('rx_waters_boca_cerrada')->default(false);
            $table->boolean('rx_pa')->default(false);
            $table->boolean('rx_digito_palmar')->default(false);
            $table->boolean('rx_digito_palmar_izq')->default(false);
            $table->boolean('rx_digito_palmar_der')->default(false);
            $table->boolean('rx_ap')->default(false);

            // ── INTRAORALES ──
            $table->string('intra_periapical_od')->nullable();
            $table->string('intra_periapical_tipo')->nullable();
            $table->string('intra_serie_tipo')->nullable();
            $table->boolean('intra_oclusal_superior')->default(false);
            $table->boolean('intra_oclusal_inferior')->default(false);

            // ── ESTUDIO ORTODÓNTICO ──
            $table->boolean('orto_panoramica')->default(false);
            $table->boolean('orto_lateral_craneo')->default(false);
            $table->boolean('orto_lateral_completa')->default(false);
            $table->boolean('orto_lateral_perfil')->default(false);
            $table->string('orto_trazado_tecnica')->nullable();
            $table->boolean('orto_fotografia')->default(false);
            $table->boolean('orto_modelos_resina')->default(false);

            // ── ESTUDIO ORTODÓNTICO + TOMOGRAFÍA 3D ──
            $table->boolean('orto3d_panoramica')->default(false);
            $table->boolean('orto3d_lateral_craneo')->default(false);
            $table->boolean('orto3d_lateral_completa')->default(false);
            $table->boolean('orto3d_lateral_perfil')->default(false);
            $table->string('orto3d_trazado_tecnica')->nullable();
            $table->boolean('orto3d_fotografia')->default(false);
            $table->boolean('orto3d_modelos_resina')->default(false);
            $table->string('orto3d_tomo_fov')->nullable();

            // ── ANÁLISIS CEFALOMÉTRICOS ──
            $table->boolean('cefalo_steiner')->default(false);
            $table->boolean('cefalo_jarabak')->default(false);
            $table->boolean('cefalo_ricketts')->default(false);
            $table->string('cefalo_tecnica')->nullable();

            // ── ESTUDIOS ADICIONALES ──
            $table->boolean('adic_modelos_resina')->default(false);
            $table->boolean('adic_fotografia')->default(false);
            $table->boolean('adic_escaneo_intraoral')->default(false);
            $table->boolean('adic_escaneo_facial')->default(false);

            // ── OBSERVACIONES ──
            $table->text('observaciones')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('solicitudes_radiograficas');
    }
};
