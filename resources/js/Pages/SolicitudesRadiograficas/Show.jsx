import { Head, Link, router, usePage } from '@inertiajs/react';

const Badge = ({ active, label }) => (
    <span style={{
        display: 'inline-block', padding: '2px 10px', borderRadius: 12, fontSize: 10,
        fontWeight: 600, background: active ? '#d4efdf' : '#f2f3f4',
        color: active ? '#1e8449' : '#7f8c8d',
    }}>
        {active ? '✓ ' : ''}{label}
    </span>
);

const Row = ({ label, value }) => value ? (
    <div style={{ display: 'flex', gap: 8, marginBottom: 4, fontSize: 12 }}>
        <span style={{ color: '#7f8c8d', minWidth: 160 }}>{label}:</span>
        <span style={{ fontWeight: 500 }}>{value}</span>
    </div>
) : null;

const SectionTitle = ({ icon, children }) => (
    <div style={{
        fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.7px',
        color: '#1a5276', marginBottom: 10, paddingBottom: 5,
        borderBottom: '2px solid #1a5276', display: 'flex', alignItems: 'center', gap: 5,
    }}>
        <span style={{
            width: 18, height: 18, background: '#1a5276', color: 'white', borderRadius: 3,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, flexShrink: 0,
        }}>{icon}</span>
        {children}
    </div>
);

export default function Show() {
    const { solicitud } = usePage().props;
    const s = solicitud;

    const handleDelete = () => {
        if (confirm('¿Eliminar esta solicitud?')) {
            router.delete(route('solicitudes-radiograficas.destroy', s.id));
        }
    };

    return (
        <>
            <Head title={`Solicitud #${s.id}`} />

            <div className="container mt-4" style={{ maxWidth: 1340 }}>

                {/* HEADER */}
                <div style={{
                    background: 'linear-gradient(135deg, #1a5276 0%, #163a55 100%)',
                    color: 'white', padding: '24px 32px', borderRadius: '12px 12px 0 0',
                }}>
                    <h1 style={{ fontFamily: 'serif', fontSize: 22 }}>Solicitud de Estudios Radiográficos</h1>
                    <p style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>Folio #{s.id} — {s.fecha}</p>
                </div>

                {/* DATOS DEL PACIENTE */}
                <div style={{ background: 'white', border: '1px solid #d5dbe0', borderTop: 'none', padding: '16px 28px' }}>
                    <SectionTitle icon="👤">Datos del Paciente</SectionTitle>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
                        <Row label="Nombre"           value={`${s.nombre} ${s.apellido_paterno} ${s.apellido_materno ?? ''}`} />
                        <Row label="Fecha"            value={s.fecha} />
                        <Row label="Doctor solicitante" value={s.doctor_solicitante} />
                        <Row label="Teléfono"         value={s.telefono} />
                    </div>
                </div>

                {/* 3 COLUMNAS */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                    background: 'white', border: '1px solid #d5dbe0', borderTop: 'none',
                }}>
                    {/* COL 1 */}
                    <div style={{ borderRight: '1px solid #d5dbe0', padding: '14px 16px' }}>
                        <SectionTitle icon="☢">Tomografías CBCT</SectionTitle>
                        {s.cbct_4x4_od    && <Row label="FOV 4×4 — O.D." value={s.cbct_4x4_od} />}
                        {s.cbct_8x5_maxilar         && <Badge active label="FOV 8×5 — Maxilar" />}
                        {s.cbct_8x5_mandibula        && <><br/><Badge active label="FOV 8×5 — Mandíbula" /></>}
                        {s.cbct_8x8_maxilar_mandibula && <><br/><Badge active label="FOV 8×8 — Maxilar + Mandíbula" /></>}
                        {s.cbct_atm_derecha           && <><br/><Badge active label="ATM Derecha" /></>}
                        {s.cbct_atm_izquierda         && <><br/><Badge active label="ATM Izquierda" /></>}
                        {s.cbct_atm_ambas             && <><br/><Badge active label="ATM Ambas" /></>}
                        {s.cbct_atm_oclusion          && <><br/><Badge active label="ATM Oclusión" /></>}
                        {s.cbct_atm_apertura          && <><br/><Badge active label="ATM Apertura" /></>}
                        {s.cbct_12x85_oclusion        && <><br/><Badge active label="FOV 12×8.5 Oclusión" /></>}
                        {s.cbct_12x85_mordedera       && <><br/><Badge active label="FOV 12×8.5 Mordedera" /></>}
                        {s.cbct_12x14_oclusion        && <><br/><Badge active label="FOV 12×14 Oclusión" /></>}
                        {s.cbct_12x14_mordedera       && <><br/><Badge active label="FOV 12×14 Mordedera" /></>}
                        {s.cbct_fov_seleccionados?.length > 0 && (
                            <Row label="FOV seleccionados" value={s.cbct_fov_seleccionados.join(', ')} />
                        )}
                        {s.cbct_zona_interes_obs && <Row label="Zona de interés" value={s.cbct_zona_interes_obs} />}
                    </div>

                    {/* COL 2 */}
                    <div style={{ borderRight: '1px solid #d5dbe0', padding: '14px 16px' }}>
                        <SectionTitle icon="📋">Radiografías</SectionTitle>
                        {s.rx_panoramica          && <><Badge active label="Panorámica" /><br/></>}
                        {s.rx_lateral_craneo      && <><Badge active label="Lateral de Cráneo" /><br/></>}
                        {s.rx_lateral_completa    && <><Badge active label="Lateral Completa" /><br/></>}
                        {s.rx_lateral_solo_perfil && <><Badge active label="Solo Perfil" /><br/></>}
                        {s.rx_atm_lat             && <><Badge active label="ATM Lateral" /><br/></>}
                        {s.rx_atm_ap              && <><Badge active label="ATM AP" /><br/></>}
                        {s.rx_caldwell            && <><Badge active label="Caldwell" /><br/></>}
                        {s.rx_hirtz               && <><Badge active label="Hirtz" /><br/></>}
                        {s.rx_waters              && <><Badge active label="Waters" /><br/></>}
                        {s.rx_pa                  && <><Badge active label="P-A" /><br/></>}
                        {s.rx_ap                  && <><Badge active label="A-P" /><br/></>}
                        {s.rx_digito_palmar       && <><Badge active label="Dígito Palmar" /><br/></>}
                    </div>

                    {/* COL 3 */}
                    <div style={{ padding: '14px 16px' }}>
                        <SectionTitle icon="🦷">Intraorales</SectionTitle>
                        {s.intra_periapical_od   && <Row label="Periapical O.D."  value={s.intra_periapical_od} />}
                        {s.intra_periapical_tipo && <Row label="Tipo"              value={s.intra_periapical_tipo} />}
                        {s.intra_serie_tipo      && <Row label="Serie Periapical"  value={s.intra_serie_tipo} />}
                        {s.intra_oclusal_superior && <><Badge active label="Oclusal Superior" /><br/></>}
                        {s.intra_oclusal_inferior && <><Badge active label="Oclusal Inferior" /><br/></>}

                        <div style={{ marginTop: 12 }}>
                            <SectionTitle icon="✦">Ortodóntico</SectionTitle>
                            {s.orto_panoramica       && <><Badge active label="Panorámica" /><br/></>}
                            {s.orto_trazado_tecnica  && <Row label="Trazado cefalométrico" value={s.orto_trazado_tecnica} />}
                            {s.orto_fotografia       && <><Badge active label="Fotografía" /><br/></>}
                            {s.orto_modelos_resina   && <><Badge active label="Modelos Resina" /><br/></>}
                        </div>

                        <div style={{ marginTop: 12 }}>
                            <SectionTitle icon="3D">Ortodóntico 3D</SectionTitle>
                            {s.orto3d_panoramica     && <><Badge active label="Panorámica" /><br/></>}
                            {s.orto3d_tomo_fov       && <Row label="FOV" value={s.orto3d_tomo_fov} />}
                        </div>

                        <div style={{ marginTop: 12 }}>
                            <SectionTitle icon="📐">Cefalométrico</SectionTitle>
                            {s.cefalo_steiner   && <><Badge active label="Steiner" /><br/></>}
                            {s.cefalo_jarabak   && <><Badge active label="Jarabak" /><br/></>}
                            {s.cefalo_ricketts  && <><Badge active label="Ricketts" /><br/></>}
                            {s.cefalo_tecnica   && <Row label="Técnica" value={s.cefalo_tecnica} />}
                        </div>
                    </div>
                </div>

                {/* OBSERVACIONES */}
                {s.observaciones && (
                    <div style={{ background: 'white', border: '1px solid #d5dbe0', borderTop: 'none', padding: '14px 24px' }}>
                        <SectionTitle icon="✎">Observaciones generales</SectionTitle>
                        <p style={{ fontSize: 13, color: '#2c3e50' }}>{s.observaciones}</p>
                    </div>
                )}

                {/* BOTONES */}
                <div style={{ background: 'white', border: '1px solid #d5dbe0', borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '14px 24px', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                    <Link
                        href={route('solicitudes-radiograficas.index')}
                        style={{ padding: '8px 22px', borderRadius: 6, fontSize: 12, fontWeight: 600, background: 'white', border: '1px solid #d5dbe0', color: '#2c3e50', textDecoration: 'none' }}
                    >
                        ← Volver
                    </Link>
                    <button
                        onClick={() => window.print()}
                        style={{ padding: '8px 22px', borderRadius: 6, fontSize: 12, fontWeight: 600, background: 'white', border: '1px solid #d5dbe0', color: '#2c3e50', cursor: 'pointer' }}
                    >
                        Imprimir
                    </button>
                    <Link
                        href={route('solicitudes-radiograficas.edit', s.id)}
                        style={{ padding: '8px 22px', borderRadius: 6, fontSize: 12, fontWeight: 600, background: '#e67e22', color: 'white', textDecoration: 'none' }}
                    >
                        Editar
                    </Link>
                    <button
                        onClick={handleDelete}
                        style={{ padding: '8px 22px', borderRadius: 6, fontSize: 12, fontWeight: 600, background: 'white', border: '1px solid #c0392b', color: '#c0392b', cursor: 'pointer' }}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </>
    );
}
