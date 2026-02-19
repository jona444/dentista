import { Head, useForm } from '@inertiajs/react';
import FormSolicitud from './FormSolicitud';

// Valores iniciales vacíos para todos los campos del formulario
const INITIAL = {
    nombre: '', apellido_paterno: '', apellido_materno: '',
    fecha: new Date().toISOString().slice(0, 10),
    doctor_solicitante: '', telefono: '',
    cbct_4x4_od: '',
    cbct_8x5_maxilar: false, cbct_8x5_mandibula: false,
    cbct_8x8_maxilar_mandibula: false,
    cbct_atm_derecha: false, cbct_atm_izquierda: false, cbct_atm_ambas: false,
    cbct_atm_oclusion: false, cbct_atm_apertura: false, cbct_atm_ambas_pos: false,
    cbct_12x85_oclusion: false, cbct_12x85_mordedera: false,
    cbct_12x14_oclusion: false, cbct_12x14_mordedera: false,
    cbct_fov_seleccionados: [],
    cbct_zona_interes_obs: '',
    rx_panoramica: false, rx_lateral_craneo: false,
    rx_lateral_completa: false, rx_lateral_solo_perfil: false,
    rx_atm_lat: false, rx_atm_ap: false,
    rx_senos_lat_waters_pa: false, rx_caldwell: false, rx_hirtz: false,
    rx_waters: false, rx_waters_boca_abierta: false, rx_waters_boca_cerrada: false,
    rx_pa: false, rx_digito_palmar: false,
    rx_digito_palmar_izq: false, rx_digito_palmar_der: false, rx_ap: false,
    intra_periapical_od: '', intra_periapical_tipo: null, intra_serie_tipo: null,
    intra_oclusal_superior: false, intra_oclusal_inferior: false,
    orto_panoramica: false, orto_lateral_craneo: false,
    orto_lateral_completa: false, orto_lateral_perfil: false,
    orto_trazado_tecnica: '', orto_fotografia: false, orto_modelos_resina: false,
    orto3d_panoramica: false, orto3d_lateral_craneo: false,
    orto3d_lateral_completa: false, orto3d_lateral_perfil: false,
    orto3d_trazado_tecnica: '', orto3d_fotografia: false, orto3d_modelos_resina: false,
    orto3d_tomo_fov: null,
    cefalo_steiner: false, cefalo_jarabak: false, cefalo_ricketts: false,
    cefalo_tecnica: '',
    adic_modelos_resina: false, adic_fotografia: false,
    adic_escaneo_intraoral: false, adic_escaneo_facial: false,
    observaciones: '',
};

export default function Create() {
    const { data, setData, post, processing, errors } = useForm(INITIAL);

    const submit = (e) => {
        e.preventDefault();
        post(route('solicitudes-radiograficas.store'));
    };

    return (
        <>
            <Head title="Nueva Solicitud Radiográfica" />
            <div className="container mt-4">
                <FormSolicitud
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={submit}
                    isEdit={false}
                />
            </div>
        </>
    );
}
