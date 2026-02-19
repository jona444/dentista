<?php

namespace App\Http\Controllers;

use App\Models\SolicitudRadiografica;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SolicitudRadiograficaController extends Controller
{
    // ── INDEX ─────────────────────────────────────────────────────────────────
    // GET /solicitudes-radiograficas
    public function index()
    {
        $solicitudes = SolicitudRadiografica::orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('SolicitudesRadiograficas/Index', [
            'solicitudes' => $solicitudes,
        ]);
    }

    // ── CREATE ────────────────────────────────────────────────────────────────
    // GET /solicitudes-radiograficas/create
    public function create()
    {
        return Inertia::render('SolicitudesRadiograficas/Create');
    }

    // ── STORE ─────────────────────────────────────────────────────────────────
    // POST /solicitudes-radiograficas
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre'              => 'required|string|max:100',
            'apellido_paterno'    => 'required|string|max:100',
            'apellido_materno'    => 'nullable|string|max:100',
            'fecha'               => 'required|date',
            'doctor_solicitante'  => 'nullable|string|max:150',
            'telefono'            => 'nullable|string|max:20',

            // CBCT
            'cbct_4x4_od'               => 'nullable|string|max:100',
            'cbct_8x5_maxilar'          => 'boolean',
            'cbct_8x5_mandibula'        => 'boolean',
            'cbct_8x8_maxilar_mandibula'=> 'boolean',
            'cbct_atm_derecha'          => 'boolean',
            'cbct_atm_izquierda'        => 'boolean',
            'cbct_atm_ambas'            => 'boolean',
            'cbct_atm_oclusion'         => 'boolean',
            'cbct_atm_apertura'         => 'boolean',
            'cbct_atm_ambas_pos'        => 'boolean',
            'cbct_12x85_oclusion'       => 'boolean',
            'cbct_12x85_mordedera'      => 'boolean',
            'cbct_12x14_oclusion'       => 'boolean',
            'cbct_12x14_mordedera'      => 'boolean',
            'cbct_fov_seleccionados'    => 'nullable|array',
            'cbct_zona_interes_obs'     => 'nullable|string',

            // Radiografías
            'rx_panoramica'             => 'boolean',
            'rx_lateral_craneo'         => 'boolean',
            'rx_lateral_completa'       => 'boolean',
            'rx_lateral_solo_perfil'    => 'boolean',
            'rx_atm_lat'                => 'boolean',
            'rx_atm_ap'                 => 'boolean',
            'rx_senos_lat_waters_pa'    => 'boolean',
            'rx_caldwell'               => 'boolean',
            'rx_hirtz'                  => 'boolean',
            'rx_waters'                 => 'boolean',
            'rx_waters_boca_abierta'    => 'boolean',
            'rx_waters_boca_cerrada'    => 'boolean',
            'rx_pa'                     => 'boolean',
            'rx_digito_palmar'          => 'boolean',
            'rx_digito_palmar_izq'      => 'boolean',
            'rx_digito_palmar_der'      => 'boolean',
            'rx_ap'                     => 'boolean',

            // Intraorales
            'intra_periapical_od'       => 'nullable|string|max:100',
            'intra_periapical_tipo'     => 'nullable|in:digital,analoga',
            'intra_serie_tipo'          => 'nullable|in:digital,analoga',
            'intra_oclusal_superior'    => 'boolean',
            'intra_oclusal_inferior'    => 'boolean',

            // Ortodóntico
            'orto_panoramica'           => 'boolean',
            'orto_lateral_craneo'       => 'boolean',
            'orto_lateral_completa'     => 'boolean',
            'orto_lateral_perfil'       => 'boolean',
            'orto_trazado_tecnica'      => 'nullable|string|max:150',
            'orto_fotografia'           => 'boolean',
            'orto_modelos_resina'       => 'boolean',

            // Ortodóntico 3D
            'orto3d_panoramica'         => 'boolean',
            'orto3d_lateral_craneo'     => 'boolean',
            'orto3d_lateral_completa'   => 'boolean',
            'orto3d_lateral_perfil'     => 'boolean',
            'orto3d_trazado_tecnica'    => 'nullable|string|max:150',
            'orto3d_fotografia'         => 'boolean',
            'orto3d_modelos_resina'     => 'boolean',
            'orto3d_tomo_fov'           => 'nullable|string|max:20',

            // Cefalométrico
            'cefalo_steiner'            => 'boolean',
            'cefalo_jarabak'            => 'boolean',
            'cefalo_ricketts'           => 'boolean',
            'cefalo_tecnica'            => 'nullable|string|max:150',

            // Adicionales
            'adic_modelos_resina'       => 'boolean',
            'adic_fotografia'           => 'boolean',
            'adic_escaneo_intraoral'    => 'boolean',
            'adic_escaneo_facial'       => 'boolean',

            'observaciones'             => 'nullable|string',
        ]);

        SolicitudRadiografica::create($validated);

        return redirect()->route('solicitudes-radiograficas.index')
            ->with('success', 'Solicitud creada correctamente.');
    }

    // ── SHOW ──────────────────────────────────────────────────────────────────
    // GET /solicitudes-radiograficas/{solicitud}
    public function show(SolicitudRadiografica $solicitudesRadiografica)
    {
        return Inertia::render('SolicitudesRadiograficas/Show', [
            'solicitud' => $solicitudesRadiografica,
        ]);
    }

    // ── EDIT ──────────────────────────────────────────────────────────────────
    // GET /solicitudes-radiograficas/{solicitud}/edit
    public function edit(SolicitudRadiografica $solicitudesRadiografica)
    {
        return Inertia::render('SolicitudesRadiograficas/Edit', [
            'solicitud' => $solicitudesRadiografica,
        ]);
    }

    // ── UPDATE ────────────────────────────────────────────────────────────────
    // PUT /solicitudes-radiograficas/{solicitud}
    public function update(Request $request, SolicitudRadiografica $solicitudesRadiografica)
    {
        $validated = $request->validate([
            'nombre'              => 'required|string|max:100',
            'apellido_paterno'    => 'required|string|max:100',
            'apellido_materno'    => 'nullable|string|max:100',
            'fecha'               => 'required|date',
            'doctor_solicitante'  => 'nullable|string|max:150',
            'telefono'            => 'nullable|string|max:20',
            'cbct_4x4_od'               => 'nullable|string|max:100',
            'cbct_8x5_maxilar'          => 'boolean',
            'cbct_8x5_mandibula'        => 'boolean',
            'cbct_8x8_maxilar_mandibula'=> 'boolean',
            'cbct_atm_derecha'          => 'boolean',
            'cbct_atm_izquierda'        => 'boolean',
            'cbct_atm_ambas'            => 'boolean',
            'cbct_atm_oclusion'         => 'boolean',
            'cbct_atm_apertura'         => 'boolean',
            'cbct_atm_ambas_pos'        => 'boolean',
            'cbct_12x85_oclusion'       => 'boolean',
            'cbct_12x85_mordedera'      => 'boolean',
            'cbct_12x14_oclusion'       => 'boolean',
            'cbct_12x14_mordedera'      => 'boolean',
            'cbct_fov_seleccionados'    => 'nullable|array',
            'cbct_zona_interes_obs'     => 'nullable|string',
            'rx_panoramica'             => 'boolean',
            'rx_lateral_craneo'         => 'boolean',
            'rx_lateral_completa'       => 'boolean',
            'rx_lateral_solo_perfil'    => 'boolean',
            'rx_atm_lat'                => 'boolean',
            'rx_atm_ap'                 => 'boolean',
            'rx_senos_lat_waters_pa'    => 'boolean',
            'rx_caldwell'               => 'boolean',
            'rx_hirtz'                  => 'boolean',
            'rx_waters'                 => 'boolean',
            'rx_waters_boca_abierta'    => 'boolean',
            'rx_waters_boca_cerrada'    => 'boolean',
            'rx_pa'                     => 'boolean',
            'rx_digito_palmar'          => 'boolean',
            'rx_digito_palmar_izq'      => 'boolean',
            'rx_digito_palmar_der'      => 'boolean',
            'rx_ap'                     => 'boolean',
            'intra_periapical_od'       => 'nullable|string|max:100',
            'intra_periapical_tipo'     => 'nullable|in:digital,analoga',
            'intra_serie_tipo'          => 'nullable|in:digital,analoga',
            'intra_oclusal_superior'    => 'boolean',
            'intra_oclusal_inferior'    => 'boolean',
            'orto_panoramica'           => 'boolean',
            'orto_lateral_craneo'       => 'boolean',
            'orto_lateral_completa'     => 'boolean',
            'orto_lateral_perfil'       => 'boolean',
            'orto_trazado_tecnica'      => 'nullable|string|max:150',
            'orto_fotografia'           => 'boolean',
            'orto_modelos_resina'       => 'boolean',
            'orto3d_panoramica'         => 'boolean',
            'orto3d_lateral_craneo'     => 'boolean',
            'orto3d_lateral_completa'   => 'boolean',
            'orto3d_lateral_perfil'     => 'boolean',
            'orto3d_trazado_tecnica'    => 'nullable|string|max:150',
            'orto3d_fotografia'         => 'boolean',
            'orto3d_modelos_resina'     => 'boolean',
            'orto3d_tomo_fov'           => 'nullable|string|max:20',
            'cefalo_steiner'            => 'boolean',
            'cefalo_jarabak'            => 'boolean',
            'cefalo_ricketts'           => 'boolean',
            'cefalo_tecnica'            => 'nullable|string|max:150',
            'adic_modelos_resina'       => 'boolean',
            'adic_fotografia'           => 'boolean',
            'adic_escaneo_intraoral'    => 'boolean',
            'adic_escaneo_facial'       => 'boolean',
            'observaciones'             => 'nullable|string',
        ]);

        $solicitudesRadiografica->update($validated);

        return redirect()->route('solicitudes-radiograficas.index')
            ->with('success', 'Solicitud actualizada correctamente.');
    }

    // ── DESTROY ───────────────────────────────────────────────────────────────
    // DELETE /solicitudes-radiograficas/{solicitud}
    public function destroy(SolicitudRadiografica $solicitudesRadiografica)
    {
        $solicitudesRadiografica->delete();

        return redirect()->route('solicitudes-radiograficas.index')
            ->with('success', 'Solicitud eliminada correctamente.');
    }
}
