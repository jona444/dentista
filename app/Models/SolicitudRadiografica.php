<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolicitudRadiografica extends Model
{
    use HasFactory;

    protected $table = 'solicitudes_radiograficas';

    protected $fillable = [
        // Datos del paciente
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'fecha',
        'doctor_solicitante',
        'telefono',

        // CBCT
        'cbct_4x4_od',
        'cbct_8x5_maxilar',
        'cbct_8x5_mandibula',
        'cbct_8x8_maxilar_mandibula',
        'cbct_atm_derecha',
        'cbct_atm_izquierda',
        'cbct_atm_ambas',
        'cbct_atm_oclusion',
        'cbct_atm_apertura',
        'cbct_atm_ambas_pos',
        'cbct_12x85_oclusion',
        'cbct_12x85_mordedera',
        'cbct_12x14_oclusion',
        'cbct_12x14_mordedera',
        'cbct_fov_seleccionados',
        'cbct_zona_interes_obs',

        // Radiografías
        'rx_panoramica',
        'rx_lateral_craneo',
        'rx_lateral_completa',
        'rx_lateral_solo_perfil',
        'rx_atm_lat',
        'rx_atm_ap',
        'rx_senos_lat_waters_pa',
        'rx_caldwell',
        'rx_hirtz',
        'rx_waters',
        'rx_waters_boca_abierta',
        'rx_waters_boca_cerrada',
        'rx_pa',
        'rx_digito_palmar',
        'rx_digito_palmar_izq',
        'rx_digito_palmar_der',
        'rx_ap',

        // Intraorales
        'intra_periapical_od',
        'intra_periapical_tipo',
        'intra_serie_tipo',
        'intra_oclusal_superior',
        'intra_oclusal_inferior',

        // Ortodóntico
        'orto_panoramica',
        'orto_lateral_craneo',
        'orto_lateral_completa',
        'orto_lateral_perfil',
        'orto_trazado_tecnica',
        'orto_fotografia',
        'orto_modelos_resina',

        // Ortodóntico 3D
        'orto3d_panoramica',
        'orto3d_lateral_craneo',
        'orto3d_lateral_completa',
        'orto3d_lateral_perfil',
        'orto3d_trazado_tecnica',
        'orto3d_fotografia',
        'orto3d_modelos_resina',
        'orto3d_tomo_fov',

        // Cefalométrico
        'cefalo_steiner',
        'cefalo_jarabak',
        'cefalo_ricketts',
        'cefalo_tecnica',

        // Adicionales
        'adic_modelos_resina',
        'adic_fotografia',
        'adic_escaneo_intraoral',
        'adic_escaneo_facial',

        // Observaciones
        'observaciones',
    ];

    protected $casts = [
        'fecha'                      => 'date',
        'cbct_fov_seleccionados'     => 'array',
        'cbct_8x5_maxilar'           => 'boolean',
        'cbct_8x5_mandibula'         => 'boolean',
        'cbct_8x8_maxilar_mandibula' => 'boolean',
        'cbct_atm_derecha'           => 'boolean',
        'cbct_atm_izquierda'         => 'boolean',
        'cbct_atm_ambas'             => 'boolean',
        'cbct_atm_oclusion'          => 'boolean',
        'cbct_atm_apertura'          => 'boolean',
        'cbct_atm_ambas_pos'         => 'boolean',
        'cbct_12x85_oclusion'        => 'boolean',
        'cbct_12x85_mordedera'       => 'boolean',
        'cbct_12x14_oclusion'        => 'boolean',
        'cbct_12x14_mordedera'       => 'boolean',
        'rx_panoramica'              => 'boolean',
        'rx_lateral_craneo'          => 'boolean',
        'rx_lateral_completa'        => 'boolean',
        'rx_lateral_solo_perfil'     => 'boolean',
        'rx_atm_lat'                 => 'boolean',
        'rx_atm_ap'                  => 'boolean',
        'rx_senos_lat_waters_pa'     => 'boolean',
        'rx_caldwell'                => 'boolean',
        'rx_hirtz'                   => 'boolean',
        'rx_waters'                  => 'boolean',
        'rx_waters_boca_abierta'     => 'boolean',
        'rx_waters_boca_cerrada'     => 'boolean',
        'rx_pa'                      => 'boolean',
        'rx_digito_palmar'           => 'boolean',
        'rx_digito_palmar_izq'       => 'boolean',
        'rx_digito_palmar_der'       => 'boolean',
        'rx_ap'                      => 'boolean',
        'intra_oclusal_superior'     => 'boolean',
        'intra_oclusal_inferior'     => 'boolean',
        'orto_panoramica'            => 'boolean',
        'orto_lateral_craneo'        => 'boolean',
        'orto_lateral_completa'      => 'boolean',
        'orto_lateral_perfil'        => 'boolean',
        'orto_fotografia'            => 'boolean',
        'orto_modelos_resina'        => 'boolean',
        'orto3d_panoramica'          => 'boolean',
        'orto3d_lateral_craneo'      => 'boolean',
        'orto3d_lateral_completa'    => 'boolean',
        'orto3d_lateral_perfil'      => 'boolean',
        'orto3d_fotografia'          => 'boolean',
        'orto3d_modelos_resina'      => 'boolean',
        'cefalo_steiner'             => 'boolean',
        'cefalo_jarabak'             => 'boolean',
        'cefalo_ricketts'            => 'boolean',
        'adic_modelos_resina'        => 'boolean',
        'adic_fotografia'            => 'boolean',
        'adic_escaneo_intraoral'     => 'boolean',
        'adic_escaneo_facial'        => 'boolean',
    ];

    // Nombre completo del paciente
    public function getNombreCompletoAttribute(): string
    {
        return trim("{$this->nombre} {$this->apellido_paterno} {$this->apellido_materno}");
    }
}
