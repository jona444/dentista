import { Head, useForm, usePage } from '@inertiajs/react';
import FormSolicitud from './FormSolicitud';

export default function Edit() {
    const { solicitud } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        nombre:               solicitud.nombre              ?? '',
        apellido_paterno:     solicitud.apellido_paterno    ?? '',
        apellido_materno:     solicitud.apellido_materno    ?? '',
        fecha:                solicitud.fecha               ?? '',
        doctor_solicitante:   solicitud.doctor_solicitante  ?? '',
        telefono:             solicitud.telefono            ?? '',
        cbct_4x4_od:                solicitud.cbct_4x4_od               ?? '',
        cbct_8x5_maxilar:           solicitud.cbct_8x5_maxilar          ?? false,
        cbct_8x5_mandibula:         solicitud.cbct_8x5_mandibula        ?? false,
        cbct_8x8_maxilar_mandibula: solicitud.cbct_8x8_maxilar_mandibula ?? false,
        cbct_atm_derecha:           solicitud.cbct_atm_derecha          ?? false,
        cbct_atm_izquierda:         solicitud.cbct_atm_izquierda        ?? false,
        cbct_atm_ambas:             solicitud.cbct_atm_ambas            ?? false,
        cbct_atm_oclusion:          solicitud.cbct_atm_oclusion         ?? false,
        cbct_atm_apertura:          solicitud.cbct_atm_apertura         ?? false,
        cbct_atm_ambas_pos:         solicitud.cbct_atm_ambas_pos        ?? false,
        cbct_12x85_oclusion:        solicitud.cbct_12x85_oclusion       ?? false,
        cbct_12x85_mordedera:       solicitud.cbct_12x85_mordedera      ?? false,
        cbct_12x14_oclusion:        solicitud.cbct_12x14_oclusion       ?? false,
        cbct_12x14_mordedera:       solicitud.cbct_12x14_mordedera      ?? false,
        cbct_fov_seleccionados:     solicitud.cbct_fov_seleccionados    ?? [],
        cbct_zona_interes_obs:      solicitud.cbct_zona_interes_obs     ?? '',
        rx_panoramica:              solicitud.rx_panoramica             ?? false,
        rx_lateral_craneo:          solicitud.rx_lateral_craneo         ?? false,
        rx_lateral_completa:        solicitud.rx_lateral_completa       ?? false,
        rx_lateral_solo_perfil:     solicitud.rx_lateral_solo_perfil    ?? false,
        rx_atm_lat:                 solicitud.rx_atm_lat                ?? false,
        rx_atm_ap:                  solicitud.rx_atm_ap                 ?? false,
        rx_senos_lat_waters_pa:     solicitud.rx_senos_lat_waters_pa    ?? false,
        rx_caldwell:                solicitud.rx_caldwell               ?? false,
        rx_hirtz:                   solicitud.rx_hirtz                  ?? false,
        rx_waters:                  solicitud.rx_waters                 ?? false,
        rx_waters_boca_abierta:     solicitud.rx_waters_boca_abierta    ?? false,
        rx_waters_boca_cerrada:     solicitud.rx_waters_boca_cerrada    ?? false,
        rx_pa:                      solicitud.rx_pa                     ?? false,
        rx_digito_palmar:           solicitud.rx_digito_palmar          ?? false,
        rx_digito_palmar_izq:       solicitud.rx_digito_palmar_izq      ?? false,
        rx_digito_palmar_der:       solicitud.rx_digito_palmar_der      ?? false,
        rx_ap:                      solicitud.rx_ap                     ?? false,
        intra_periapical_od:        solicitud.intra_periapical_od       ?? '',
        intra_periapical_tipo:      solicitud.intra_periapical_tipo     ?? null,
        intra_serie_tipo:           solicitud.intra_serie_tipo          ?? null,
        intra_oclusal_superior:     solicitud.intra_oclusal_superior    ?? false,
        intra_oclusal_inferior:     solicitud.intra_oclusal_inferior    ?? false,
        orto_panoramica:            solicitud.orto_panoramica           ?? false,
        orto_lateral_craneo:        solicitud.orto_lateral_craneo       ?? false,
        orto_lateral_completa:      solicitud.orto_lateral_completa     ?? false,
        orto_lateral_perfil:        solicitud.orto_lateral_perfil       ?? false,
        orto_trazado_tecnica:       solicitud.orto_trazado_tecnica      ?? '',
        orto_fotografia:            solicitud.orto_fotografia           ?? false,
        orto_modelos_resina:        solicitud.orto_modelos_resina       ?? false,
        orto3d_panoramica:          solicitud.orto3d_panoramica         ?? false,
        orto3d_lateral_craneo:      solicitud.orto3d_lateral_craneo     ?? false,
        orto3d_lateral_completa:    solicitud.orto3d_lateral_completa   ?? false,
        orto3d_lateral_perfil:      solicitud.orto3d_lateral_perfil     ?? false,
        orto3d_trazado_tecnica:     solicitud.orto3d_trazado_tecnica    ?? '',
        orto3d_fotografia:          solicitud.orto3d_fotografia         ?? false,
        orto3d_modelos_resina:      solicitud.orto3d_modelos_resina     ?? false,
        orto3d_tomo_fov:            solicitud.orto3d_tomo_fov           ?? null,
        cefalo_steiner:             solicitud.cefalo_steiner            ?? false,
        cefalo_jarabak:             solicitud.cefalo_jarabak            ?? false,
        cefalo_ricketts:            solicitud.cefalo_ricketts           ?? false,
        cefalo_tecnica:             solicitud.cefalo_tecnica            ?? '',
        adic_modelos_resina:        solicitud.adic_modelos_resina       ?? false,
        adic_fotografia:            solicitud.adic_fotografia           ?? false,
        adic_escaneo_intraoral:     solicitud.adic_escaneo_intraoral    ?? false,
        adic_escaneo_facial:        solicitud.adic_escaneo_facial       ?? false,
        observaciones:              solicitud.observaciones             ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('solicitudes-radiograficas.update', solicitud.id));
    };

    return (
        <>
            <Head title="Editar Solicitud Radiográfica" />
            <div className="container mt-4">
                <FormSolicitud
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={submit}
                    isEdit={true}
                />
            </div>
        </>
    );
}
