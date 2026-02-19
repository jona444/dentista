import { useState } from 'react';
import { Link } from '@inertiajs/react';

// ─────────────────────────────────────────────────────────────────────────────
// ESTILOS
// ─────────────────────────────────────────────────────────────────────────────
const CSS = `
  :root {
    --sr-primary:       #1a5276;
    --sr-primary-light: #2980b9;
    --sr-accent:        #c0392b;
    --sr-text:          #2c3e50;
    --sr-muted:         #7f8c8d;
    --sr-border:        #d5dbe0;
    --sr-bg:            #f7f8f9;
    --sr-card:          #ffffff;
    --sr-active-bg:     rgba(26,82,118,0.05);
    --sr-active-border: rgba(26,82,118,0.25);
    --sr-radius:        8px;
    --sr-shadow:        0 1px 4px rgba(0,0,0,0.07);
  }

  /* ── STEPPER ── */
  .sr-stepper {
    display: flex;
    align-items: center;
    padding: 20px 28px;
    background: white;
    border: 1px solid var(--sr-border);
    border-top: none;
    overflow-x: auto;
    gap: 0;
  }
  .sr-step {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
  }
  .sr-step-inner {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 6px 8px;
    border-radius: var(--sr-radius);
    transition: background .15s;
    white-space: nowrap;
  }
  .sr-step-inner:hover { background: var(--sr-bg); }
  .sr-step-dot {
    width: 32px; height: 32px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; flex-shrink: 0;
    border: 2px solid var(--sr-border);
    background: white; color: var(--sr-muted);
    transition: all .25s;
  }
  .sr-step.done   .sr-step-dot { background: #d4efdf; border-color: #1e8449; color: #1e8449; }
  .sr-step.active .sr-step-dot { background: var(--sr-primary); border-color: var(--sr-primary); color: white; box-shadow: 0 0 0 4px rgba(26,82,118,0.15); }
  .sr-step-label {
    display: flex; flex-direction: column;
    line-height: 1.2;
  }
  .sr-step-num   { font-size: 9px; font-weight: 600; color: var(--sr-muted); text-transform: uppercase; letter-spacing: .5px; }
  .sr-step-title { font-size: 12.5px; font-weight: 600; color: var(--sr-text); }
  .sr-step.active .sr-step-title { color: var(--sr-primary); }
  .sr-step.done   .sr-step-title { color: #1e8449; }
  .sr-step-line {
    flex: 1; height: 2px; margin: 0 6px;
    background: var(--sr-border);
    min-width: 20px; transition: background .25s;
  }
  .sr-step-line.done { background: #1e8449; }

  /* ── STEP CONTENT ── */
  .sr-step-body {
    background: var(--sr-card);
    border: 1px solid var(--sr-border);
    border-top: none;
    padding: 24px 28px;
    min-height: 360px;
  }

  /* ── STEP TITLE ── */
  .sr-step-heading {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 22px;
  }
  .sr-step-heading-ico {
    width: 40px; height: 40px;
    background: linear-gradient(135deg, var(--sr-primary), var(--sr-primary-light));
    border-radius: 10px; color: white;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
    box-shadow: 0 3px 10px rgba(26,82,118,0.25);
  }
  .sr-step-heading h2 { font-size: 17px; font-weight: 700; color: var(--sr-text); margin: 0; }
  .sr-step-heading p  { font-size: 12px; color: var(--sr-muted); margin: 2px 0 0; }

  /* ── SECCIÓN DENTRO DEL PASO ── */
  .sr-section-title {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 12px; padding-bottom: 6px;
    border-bottom: 2px solid var(--sr-primary);
  }
  .sr-section-title-left {
    display: flex; align-items: center; gap: 6px;
    font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .7px;
    color: var(--sr-primary);
  }
  .sr-section-ico {
    width: 20px; height: 20px; background: var(--sr-primary); color: white;
    border-radius: 4px; display: flex; align-items: center; justify-content: center;
    font-size: 10px; flex-shrink: 0;
  }
  .sr-badge-count {
    font-size: 9px; font-weight: 700;
    background: var(--sr-primary); color: white;
    border-radius: 10px; padding: 2px 8px;
    opacity: 0; transition: opacity .2s;
  }
  .sr-badge-count.vis { opacity: 1; }

  /* ── 2 COLUMNAS DENTRO DE UN PASO ── */
  .sr-two-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: start;
  }

  /* ── SUB ── */
  .sr-sub {
    margin-bottom: 10px; padding: 10px 12px;
    background: var(--sr-bg); border-radius: var(--sr-radius);
    border: 1px solid transparent; transition: background .2s, border-color .2s;
    box-shadow: var(--sr-shadow);
  }
  .sr-sub:last-child { margin-bottom: 0; }
  .sr-sub:hover { border-color: var(--sr-border); }
  .sr-sub.active { background: var(--sr-active-bg); border-color: var(--sr-active-border); }
  .sr-sub-title { font-size: 11px; font-weight: 600; color: var(--sr-text); margin-bottom: 7px; }

  /* ── CHECKBOXES / RADIO ── */
  .sr-check-group { display: flex; flex-wrap: wrap; gap: 6px 14px; align-items: center; }
  .sr-check-group.v { flex-direction: column; align-items: flex-start; gap: 6px; }
  .sr-ci {
    display: flex; align-items: center; gap: 6px;
    font-size: 13px; cursor: pointer; padding: 2px 0;
  }
  .sr-ci.sm { font-size: 11.5px; }
  .sr-ci input[type=checkbox],
  .sr-ci input[type=radio] {
    width: 16px; height: 16px;
    accent-color: var(--sr-primary); cursor: pointer; flex-shrink: 0;
  }

  /* ── FIELD ROW ── */
  .sr-fr { display: flex; align-items: center; gap: 8px; font-size: 13px; margin-bottom: 6px; }
  .sr-fr:last-child { margin-bottom: 0; }
  .sr-fr input[type=text] {
    flex: 1; padding: 5px 9px; border: 1px solid var(--sr-border);
    border-radius: 4px; font-size: 13px; background: white;
    min-width: 0; transition: border-color .2s;
  }
  .sr-fr input[type=text]:focus { outline: none; border-color: var(--sr-primary-light); box-shadow: 0 0 0 3px rgba(41,128,185,.12); }

  /* ── PATIENT GRID ── */
  .sr-patient-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
  }
  .sr-field label {
    display: block; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .6px;
    color: var(--sr-muted); margin-bottom: 5px;
  }
  .sr-field input {
    width: 100%; padding: 8px 11px; font-size: 13px;
    border: 1px solid var(--sr-border); border-radius: 6px;
    background: var(--sr-bg); transition: border-color .2s, box-shadow .2s;
    font-family: inherit;
  }
  .sr-field input:focus { outline: none; border-color: var(--sr-primary-light); box-shadow: 0 0 0 3px rgba(41,128,185,.12); }
  .sr-field input.err { border-color: var(--sr-accent); }
  .sr-field-err { color: var(--sr-accent); font-size: 11px; margin-top: 3px; }

  /* ── FOV ── */
  .sr-fov-cards { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
  .sr-fov-card {
    border: 2px solid var(--sr-border); border-radius: var(--sr-radius);
    padding: 8px 10px; text-align: center; cursor: pointer;
    transition: all .2s; background: white; flex: 1; min-width: 58px;
  }
  .sr-fov-card:hover { border-color: var(--sr-primary-light); transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,.08); }
  .sr-fov-card.sel { border-color: var(--sr-primary); background: var(--sr-active-bg); }
  .sr-fov-card .fs { font-size: 13px; font-weight: 700; color: var(--sr-primary); }
  .sr-fov-card .fl { font-size: 8px; color: var(--sr-muted); margin-top: 2px; }

  /* ── RESUMEN ── */
  .sr-summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 14px; margin-bottom: 20px;
  }
  .sr-summary-card {
    background: var(--sr-bg); border: 1px solid var(--sr-border);
    border-radius: var(--sr-radius); padding: 14px;
    box-shadow: var(--sr-shadow);
  }
  .sr-summary-card h4 {
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .6px; color: var(--sr-primary);
    margin: 0 0 10px; padding-bottom: 6px;
    border-bottom: 1px solid var(--sr-border);
  }
  .sr-summary-empty { font-size: 12px; color: var(--sr-muted); font-style: italic; }
  .sr-chip {
    display: inline-flex; align-items: center; gap: 4px;
    background: #d4efdf; color: #1e8449;
    font-size: 11px; font-weight: 600;
    padding: 3px 9px; border-radius: 12px;
    margin: 2px 3px 2px 0;
  }

  /* ── NAVEGACIÓN ── */
  .sr-nav {
    display: flex; justify-content: space-between; align-items: center;
    padding: 16px 28px;
    background: white; border: 1px solid var(--sr-border); border-top: none;
    border-radius: 0 0 12px 12px;
  }
  .sr-nav-progress { font-size: 11px; color: var(--sr-muted); }
  .sr-nav-progress span { font-weight: 700; color: var(--sr-primary); }
  .sr-nav-buttons { display: flex; gap: 10px; }
  .sr-btn {
    padding: 9px 22px; border-radius: 8px;
    font-size: 13px; font-weight: 600; cursor: pointer;
    transition: all .2s; border: none; display: inline-flex; align-items: center; gap: 6px;
    text-decoration: none; font-family: inherit;
  }
  .sr-btn-sec { background: white; border: 1px solid var(--sr-border); color: var(--sr-text); }
  .sr-btn-sec:hover { background: var(--sr-bg); }
  .sr-btn-pri { background: var(--sr-primary); color: white; box-shadow: 0 2px 8px rgba(26,82,118,.3); }
  .sr-btn-pri:hover { background: #154360; transform: translateY(-1px); }
  .sr-btn-pri:disabled { opacity: .65; cursor: not-allowed; transform: none; }
  .sr-btn-success { background: #1e8449; color: white; box-shadow: 0 2px 8px rgba(30,132,73,.3); }
  .sr-btn-success:hover { background: #196f3d; }

  /* ── TEXTAREA ── */
  .sr-textarea {
    width: 100%; padding: 10px 12px; border: 1px solid var(--sr-border);
    border-radius: 6px; font-size: 13px; resize: vertical;
    min-height: 80px; background: white;
    transition: border-color .2s, box-shadow .2s; font-family: inherit;
  }
  .sr-textarea:focus { outline: none; border-color: var(--sr-primary-light); box-shadow: 0 0 0 3px rgba(41,128,185,.12); }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .sr-two-cols { grid-template-columns: 1fr; }
    .sr-step-label { display: none; }
    .sr-step-body, .sr-nav { padding-left: 16px; padding-right: 16px; }
    .sr-stepper { padding: 14px 16px; }
    .sr-ci { font-size: 14px; }
    .sr-ci input[type=checkbox], .sr-ci input[type=radio] { width: 18px; height: 18px; }
  }
  @media (max-width: 480px) {
    .sr-patient-grid { grid-template-columns: 1fr; }
    .sr-btn { padding: 9px 14px; font-size: 12px; }
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  .sr-step-body { animation: fadeIn .2s ease; }
`;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const Checkbox = ({ label, field, data, setData, sm }) => (
    <label className={`sr-ci${sm ? ' sm' : ''}`}>
        <input type="checkbox" checked={!!data[field]} onChange={e => setData(field, e.target.checked)} />
        {label}
    </label>
);
const Radio = ({ label, field, value, data, setData, sm }) => (
    <label className={`sr-ci${sm ? ' sm' : ''}`}>
        <input type="radio" checked={data[field] === value} onChange={() => setData(field, value)} />
        {label}
    </label>
);
const TextBox = ({ field, placeholder, data, setData }) => (
    <input type="text" value={data[field] ?? ''} onChange={e => setData(field, e.target.value)}
        placeholder={placeholder}
        style={{ flex: 1, padding: '5px 9px', border: '1px solid #d5dbe0', borderRadius: 4, fontSize: 13, background: 'white', minWidth: 0 }} />
);
const Sub = ({ children, active }) => (
    <div className={`sr-sub${active ? ' active' : ''}`}>{children}</div>
);
const SubTitle = ({ children }) => <div className="sr-sub-title">{children}</div>;
const SectionTitle = ({ icon, children, count = 0 }) => (
    <div className="sr-section-title">
        <div className="sr-section-title-left">
            <span className="sr-section-ico">{icon}</span>
            {children}
        </div>
        <span className={`sr-badge-count${count > 0 ? ' vis' : ''}`}>{count}</span>
    </div>
);
const Chip = ({ label }) => <span className="sr-chip">✓ {label}</span>;
const cnt = (data, fields) => fields.filter(f => !!data[f]).length;

const FOV_OPTIONS = [
    { key: '4x4',   label: '4×4',    desc: '1–5 dientes' },
    { key: '8x5',   label: '8×5',    desc: 'Max. o Mand.' },
    { key: '8x8',   label: '8×8',    desc: 'Max. y Mand.' },
    { key: '12x85', label: '12×8.5', desc: 'Hasta 3° mol.' },
    { key: '12x14', label: '12×14',  desc: 'Completo' },
];

const STEPS = [
    { label: 'Paciente',         icon: '👤' },
    { label: 'CBCT + Rx',        icon: '☢' },
    { label: 'Intraoral / Orto', icon: '🦷' },
    { label: 'Resumen',          icon: '✓'  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PASOS
// ─────────────────────────────────────────────────────────────────────────────

// ── PASO 1: DATOS DEL PACIENTE ────────────────────────────────────────────────
function Step1({ data, setData, errors }) {
    const fields = [
        { key: 'nombre',            label: 'Nombre(s)',          placeholder: 'Nombre(s)',        type: 'text', req: true  },
        { key: 'apellido_paterno',   label: 'Apellido Paterno',   placeholder: 'Apellido paterno', type: 'text', req: true  },
        { key: 'apellido_materno',   label: 'Apellido Materno',   placeholder: 'Apellido materno', type: 'text', req: false },
        { key: 'fecha',             label: 'Fecha',              placeholder: '',                 type: 'date', req: true  },
        { key: 'doctor_solicitante', label: 'Doctor solicitante', placeholder: 'Dr. / Dra.',       type: 'text', req: false },
        { key: 'telefono',          label: 'Teléfono',           placeholder: '(55) 0000-0000',   type: 'tel',  req: false },
    ];
    return (
        <>
            <div className="sr-step-heading">
                <div className="sr-step-heading-ico">👤</div>
                <div>
                    <h2>Datos del Paciente</h2>
                    <p>Información básica del paciente y doctor solicitante</p>
                </div>
            </div>
            <div className="sr-patient-grid">
                {fields.map(({ key, label, placeholder, type, req }) => (
                    <div className="sr-field" key={key}>
                        <label>{label}{req && ' *'}</label>
                        <input
                            type={type}
                            value={data[key] ?? ''}
                            onChange={e => setData(key, e.target.value)}
                            placeholder={placeholder}
                            className={errors[key] ? 'err' : ''}
                        />
                        {errors[key] && <p className="sr-field-err">{errors[key]}</p>}
                    </div>
                ))}
            </div>
        </>
    );
}

// ── PASO 2: CBCT + RADIOGRAFÍAS ───────────────────────────────────────────────
function Step2({ data, setData }) {
    const fovSelected = data.cbct_fov_seleccionados ?? [];
    const toggleFov = key => {
        setData('cbct_fov_seleccionados',
            fovSelected.includes(key) ? fovSelected.filter(k => k !== key) : [...fovSelected, key]);
    };

    const cntCbct = cnt(data, [
        'cbct_8x5_maxilar','cbct_8x5_mandibula','cbct_8x8_maxilar_mandibula',
        'cbct_atm_derecha','cbct_atm_izquierda','cbct_atm_ambas',
        'cbct_atm_oclusion','cbct_atm_apertura','cbct_atm_ambas_pos',
        'cbct_12x85_oclusion','cbct_12x85_mordedera','cbct_12x14_oclusion','cbct_12x14_mordedera',
    ]) + (data.cbct_4x4_od ? 1 : 0) + fovSelected.length;

    const cntRx = cnt(data, [
        'rx_panoramica','rx_lateral_craneo','rx_lateral_completa','rx_lateral_solo_perfil',
        'rx_atm_lat','rx_atm_ap','rx_senos_lat_waters_pa','rx_caldwell','rx_hirtz',
        'rx_waters','rx_waters_boca_abierta','rx_waters_boca_cerrada',
        'rx_pa','rx_digito_palmar','rx_digito_palmar_izq','rx_digito_palmar_der','rx_ap',
    ]);

    return (
        <>
            <div className="sr-step-heading">
                <div className="sr-step-heading-ico">☢</div>
                <div>
                    <h2>Tomografías CBCT y Radiografías</h2>
                    <p>Selecciona los estudios de imagen necesarios</p>
                </div>
            </div>
            <div className="sr-two-cols">

                {/* CBCT */}
                <div>
                    <SectionTitle icon="☢" count={cntCbct}>Tomografías Cone Beam (CBCT)</SectionTitle>

                    <Sub active={!!data.cbct_4x4_od}>
                        <SubTitle>Tomografía (FOV 4×4)</SubTitle>
                        <div className="sr-fr">
                            <span>Indicar O.D.:</span>
                            <TextBox field="cbct_4x4_od" placeholder="Órgano dentario" data={data} setData={setData} />
                        </div>
                    </Sub>

                    <Sub active={data.cbct_8x5_maxilar || data.cbct_8x5_mandibula}>
                        <SubTitle>Tomografía (FOV 8×5)</SubTitle>
                        <div className="sr-check-group">
                            <Checkbox label="Maxilar"   field="cbct_8x5_maxilar"   data={data} setData={setData} />
                            <Checkbox label="Mandíbula" field="cbct_8x5_mandibula" data={data} setData={setData} />
                        </div>
                    </Sub>

                    <Sub active={data.cbct_8x8_maxilar_mandibula}>
                        <SubTitle>Tomografía (FOV 8×8)</SubTitle>
                        <Checkbox label="Maxilar y mandíbula hasta 2° molares" field="cbct_8x8_maxilar_mandibula" data={data} setData={setData} />
                    </Sub>

                    <Sub active={data.cbct_atm_derecha || data.cbct_atm_izquierda || data.cbct_atm_ambas || data.cbct_atm_oclusion || data.cbct_atm_apertura || data.cbct_atm_ambas_pos}>
                        <SubTitle>Tomografía ATM</SubTitle>
                        <div className="sr-check-group" style={{ marginBottom: 6 }}>
                            <Checkbox label="Derecha"   field="cbct_atm_derecha"   data={data} setData={setData} />
                            <Checkbox label="Izquierda" field="cbct_atm_izquierda" data={data} setData={setData} />
                            <Checkbox label="Ambas"     field="cbct_atm_ambas"     data={data} setData={setData} />
                        </div>
                        <div className="sr-check-group">
                            <Checkbox label="Oclusión" field="cbct_atm_oclusion"  data={data} setData={setData} />
                            <Checkbox label="Apertura" field="cbct_atm_apertura"  data={data} setData={setData} />
                            <Checkbox label="Ambas"    field="cbct_atm_ambas_pos" data={data} setData={setData} />
                        </div>
                    </Sub>

                    <Sub active={data.cbct_12x85_oclusion || data.cbct_12x85_mordedera}>
                        <SubTitle>Tomografía (FOV 12×8.5)</SubTitle>
                        <div className="sr-check-group">
                            <Checkbox label="Oclusión"      field="cbct_12x85_oclusion"  data={data} setData={setData} />
                            <Checkbox label="Con mordedera" field="cbct_12x85_mordedera" data={data} setData={setData} />
                        </div>
                    </Sub>

                    <Sub active={data.cbct_12x14_oclusion || data.cbct_12x14_mordedera}>
                        <SubTitle>Tomografía (FOV 12×14)</SubTitle>
                        <div className="sr-check-group">
                            <Checkbox label="Oclusión"      field="cbct_12x14_oclusion"  data={data} setData={setData} />
                            <Checkbox label="Con mordedera" field="cbct_12x14_mordedera" data={data} setData={setData} />
                        </div>
                    </Sub>

                    <div style={{ marginTop: 12 }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--sr-muted)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 }}>
                            Selección rápida de FOV
                        </div>
                        <div className="sr-fov-cards">
                            {FOV_OPTIONS.map(({ key, label, desc }) => (
                                <div key={key} className={`sr-fov-card${fovSelected.includes(key) ? ' sel' : ''}`} onClick={() => toggleFov(key)}>
                                    <div className="fs">{label}</div>
                                    <div className="fl">{desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RADIOGRAFÍAS */}
                <div>
                    <SectionTitle icon="◎" count={data.cbct_zona_interes_obs ? 1 : 0}>Zona de interés</SectionTitle>
                    <Sub active={!!data.cbct_zona_interes_obs}>
                        <SubTitle>Observaciones</SubTitle>
                        <textarea className="sr-textarea" rows={3}
                            value={data.cbct_zona_interes_obs ?? ''}
                            onChange={e => setData('cbct_zona_interes_obs', e.target.value)}
                            placeholder="Indicar zona o hallazgo de interés..." />
                    </Sub>

                    <div style={{ marginTop: 18 }}>
                        <SectionTitle icon="📋" count={cntRx}>Radiografías</SectionTitle>

                        <Sub active={data.rx_panoramica || data.rx_lateral_craneo}>
                            <div className="sr-check-group v">
                                <Checkbox label="Panorámica (Ortopantomografía)" field="rx_panoramica" data={data} setData={setData} />
                                <div className="sr-check-group">
                                    <Checkbox label="Lateral de Cráneo"  field="rx_lateral_craneo"      data={data} setData={setData} />
                                    <Checkbox label="Completa"           field="rx_lateral_completa"    data={data} setData={setData} sm />
                                    <Checkbox label="Solo perfil"        field="rx_lateral_solo_perfil" data={data} setData={setData} sm />
                                </div>
                            </div>
                        </Sub>

                        <Sub active={data.rx_atm_lat || data.rx_atm_ap}>
                            <SubTitle>ATM</SubTitle>
                            <div className="sr-check-group v">
                                <Checkbox label="ATM Boca abierta/cerrada Lateral" field="rx_atm_lat" data={data} setData={setData} />
                                <Checkbox label="ATM Boca abierta/cerrada AP"      field="rx_atm_ap"  data={data} setData={setData} />
                            </div>
                        </Sub>

                        <Sub active={data.rx_caldwell || data.rx_hirtz || data.rx_waters || data.rx_pa || data.rx_digito_palmar || data.rx_ap}>
                            <SubTitle>Senos Paranasales</SubTitle>
                            <div className="sr-check-group v">
                                <Checkbox label="Senos Paranasales (Lat, Waters, PA)" field="rx_senos_lat_waters_pa" data={data} setData={setData} />
                                <Checkbox label="Caldwell"           field="rx_caldwell" data={data} setData={setData} />
                                <Checkbox label="Hirtz"              field="rx_hirtz"    data={data} setData={setData} />
                                <div className="sr-check-group">
                                    <Checkbox label="Waters"       field="rx_waters"             data={data} setData={setData} />
                                    <Checkbox label="Boca abierta" field="rx_waters_boca_abierta" data={data} setData={setData} sm />
                                    <Checkbox label="Boca cerrada" field="rx_waters_boca_cerrada" data={data} setData={setData} sm />
                                </div>
                                <Checkbox label="P-A" field="rx_pa" data={data} setData={setData} />
                                <div className="sr-check-group">
                                    <Checkbox label="Dígito Palmar" field="rx_digito_palmar"     data={data} setData={setData} />
                                    <Checkbox label="Izq."          field="rx_digito_palmar_izq" data={data} setData={setData} sm />
                                    <Checkbox label="Der."          field="rx_digito_palmar_der" data={data} setData={setData} sm />
                                </div>
                                <Checkbox label="A-P" field="rx_ap" data={data} setData={setData} />
                            </div>
                        </Sub>
                    </div>
                </div>
            </div>
        </>
    );
}

// ── PASO 3: INTRAORAL + ORTODÓNTICO + CEFALOMÉTRICO + ADICIONALES ─────────────
function Step3({ data, setData }) {
    const cntIntra   = cnt(data, ['intra_oclusal_superior','intra_oclusal_inferior']) + (data.intra_periapical_od ? 1 : 0) + (data.intra_periapical_tipo ? 1 : 0) + (data.intra_serie_tipo ? 1 : 0);
    const cntOrto    = cnt(data, ['orto_panoramica','orto_lateral_craneo','orto_fotografia','orto_modelos_resina']) + (data.orto_trazado_tecnica ? 1 : 0);
    const cntOrto3d  = cnt(data, ['orto3d_panoramica','orto3d_lateral_craneo','orto3d_fotografia','orto3d_modelos_resina']) + (data.orto3d_tomo_fov ? 1 : 0);
    const cntCefalo  = cnt(data, ['cefalo_steiner','cefalo_jarabak','cefalo_ricketts']) + (data.cefalo_tecnica ? 1 : 0);
    const cntAdic    = cnt(data, ['adic_modelos_resina','adic_fotografia','adic_escaneo_intraoral','adic_escaneo_facial']);

    return (
        <>
            <div className="sr-step-heading">
                <div className="sr-step-heading-ico">🦷</div>
                <div>
                    <h2>Intraoral, Ortodóntico y Adicionales</h2>
                    <p>Radiografías intraorales, estudios ortodónticos y servicios complementarios</p>
                </div>
            </div>
            <div className="sr-two-cols">
                {/* COLUMNA IZQUIERDA */}
                <div>
                    <SectionTitle icon="🦷" count={cntIntra}>Radiografías Intraorales</SectionTitle>

                    <Sub active={!!data.intra_periapical_od || !!data.intra_periapical_tipo}>
                        <SubTitle>Periapical</SubTitle>
                        <div className="sr-fr"><span>O.D.:</span><TextBox field="intra_periapical_od" placeholder="Órgano dentario" data={data} setData={setData} /></div>
                        <div className="sr-check-group" style={{ marginTop: 6 }}>
                            <Radio label="Digital" field="intra_periapical_tipo" value="digital" data={data} setData={setData} />
                            <Radio label="Análoga" field="intra_periapical_tipo" value="analoga" data={data} setData={setData} />
                        </div>
                    </Sub>

                    <Sub active={!!data.intra_serie_tipo}>
                        <SubTitle>Serie Periapical Completa</SubTitle>
                        <div className="sr-check-group">
                            <Radio label="Digital" field="intra_serie_tipo" value="digital" data={data} setData={setData} />
                            <Radio label="Análoga" field="intra_serie_tipo" value="analoga" data={data} setData={setData} />
                        </div>
                    </Sub>

                    <Sub active={data.intra_oclusal_superior || data.intra_oclusal_inferior}>
                        <SubTitle>Oclusal</SubTitle>
                        <div className="sr-check-group">
                            <Checkbox label="Superior" field="intra_oclusal_superior" data={data} setData={setData} />
                            <Checkbox label="Inferior" field="intra_oclusal_inferior" data={data} setData={setData} />
                        </div>
                    </Sub>

                    <div style={{ marginTop: 18 }}>
                        <SectionTitle icon="📐" count={cntCefalo}>Análisis Cefalométricos</SectionTitle>
                        <Sub active={cntCefalo > 0}>
                            <div className="sr-check-group v">
                                <Checkbox label="Steiner"  field="cefalo_steiner"  data={data} setData={setData} />
                                <Checkbox label="Jarabak"  field="cefalo_jarabak"  data={data} setData={setData} />
                                <Checkbox label="Ricketts" field="cefalo_ricketts" data={data} setData={setData} />
                                <div className="sr-fr" style={{ marginBottom: 0 }}>
                                    <span>Técnica:</span>
                                    <TextBox field="cefalo_tecnica" placeholder="Especificar" data={data} setData={setData} />
                                </div>
                            </div>
                        </Sub>
                    </div>

                    <div style={{ marginTop: 18 }}>
                        <SectionTitle icon="+" count={cntAdic}>Estudios Adicionales</SectionTitle>
                        <Sub active={data.adic_modelos_resina}>
                            <SubTitle>Modelos de Estudio</SubTitle>
                            <Checkbox label="Resina" field="adic_modelos_resina" data={data} setData={setData} />
                        </Sub>
                        <Sub active={data.adic_fotografia}>
                            <SubTitle>Fotografía Extra e Intraoral</SubTitle>
                            <Checkbox label="Solicitar" field="adic_fotografia" data={data} setData={setData} />
                        </Sub>
                        <Sub active={data.adic_escaneo_intraoral}>
                            <SubTitle>Escaneo Intraoral</SubTitle>
                            <Checkbox label="Solicitar" field="adic_escaneo_intraoral" data={data} setData={setData} />
                        </Sub>
                        <Sub active={data.adic_escaneo_facial}>
                            <SubTitle>Escaneo Facial</SubTitle>
                            <Checkbox label="Solicitar" field="adic_escaneo_facial" data={data} setData={setData} />
                        </Sub>
                    </div>
                </div>

                {/* COLUMNA DERECHA */}
                <div>
                    <SectionTitle icon="✦" count={cntOrto}>Estudio Ortodóntico Completo</SectionTitle>
                    <Sub active={cntOrto > 0}>
                        <div className="sr-check-group v">
                            <Checkbox label="Rx. Panorámica" field="orto_panoramica" data={data} setData={setData} />
                            <div className="sr-check-group">
                                <Checkbox label="Rx. Lateral de cráneo" field="orto_lateral_craneo"   data={data} setData={setData} />
                                <Checkbox label="Completa"              field="orto_lateral_completa" data={data} setData={setData} sm />
                                <Checkbox label="Solo Perfil"           field="orto_lateral_perfil"   data={data} setData={setData} sm />
                            </div>
                            <div className="sr-fr" style={{ marginBottom: 0 }}>
                                <Checkbox label="Trazado cefalométrico:" field="orto_trazado_tecnica" data={data} setData={setData} />
                                <TextBox field="orto_trazado_tecnica" placeholder="Técnica" data={data} setData={setData} />
                            </div>
                            <Checkbox label="Fotografía intraoral y extraoral" field="orto_fotografia"    data={data} setData={setData} />
                            <Checkbox label="Modelos de estudio — Resina"      field="orto_modelos_resina" data={data} setData={setData} />
                        </div>
                    </Sub>

                    <div style={{ marginTop: 18 }}>
                        <SectionTitle icon="3D" count={cntOrto3d}>Estudio Ortodóntico con Tomografía 3D</SectionTitle>
                        <Sub active={cntOrto3d > 0}>
                            <div className="sr-check-group v">
                                <Checkbox label="Rx. Panorámica" field="orto3d_panoramica" data={data} setData={setData} />
                                <div className="sr-check-group">
                                    <Checkbox label="Rx. Lateral de cráneo" field="orto3d_lateral_craneo"   data={data} setData={setData} />
                                    <Checkbox label="Completa"              field="orto3d_lateral_completa" data={data} setData={setData} sm />
                                    <Checkbox label="Solo Perfil"           field="orto3d_lateral_perfil"   data={data} setData={setData} sm />
                                </div>
                                <div className="sr-fr" style={{ marginBottom: 0 }}>
                                    <Checkbox label="Trazado cefalométrico:" field="orto3d_trazado_tecnica" data={data} setData={setData} />
                                    <TextBox field="orto3d_trazado_tecnica" placeholder="Técnica" data={data} setData={setData} />
                                </div>
                                <Checkbox label="Fotografía intraoral y extraoral" field="orto3d_fotografia"    data={data} setData={setData} />
                                <Checkbox label="Modelos de estudio — Resina"      field="orto3d_modelos_resina" data={data} setData={setData} />
                                <div className="sr-check-group">
                                    <span style={{ fontSize: 13 }}>Tomografía:</span>
                                    <Radio label="FOV 12×14"  field="orto3d_tomo_fov" value="12x14"  data={data} setData={setData} sm />
                                    <Radio label="FOV 12×8.5" field="orto3d_tomo_fov" value="12x8.5" data={data} setData={setData} sm />
                                </div>
                            </div>
                        </Sub>
                    </div>
                </div>
            </div>
        </>
    );
}

// ── PASO 4: RESUMEN + OBSERVACIONES ──────────────────────────────────────────
function Step4({ data, setData }) {
    const fovSelected = data.cbct_fov_seleccionados ?? [];

    const sections = [
        {
            title: '👤 Paciente',
            items: [
                data.nombre && `${data.nombre} ${data.apellido_paterno} ${data.apellido_materno ?? ''}`.trim(),
                data.fecha && `Fecha: ${data.fecha}`,
                data.doctor_solicitante && `Dr. ${data.doctor_solicitante}`,
                data.telefono && `Tel: ${data.telefono}`,
            ].filter(Boolean),
        },
        {
            title: '☢ Tomografías CBCT',
            items: [
                data.cbct_4x4_od          && `FOV 4×4 — ${data.cbct_4x4_od}`,
                data.cbct_8x5_maxilar     && 'FOV 8×5 Maxilar',
                data.cbct_8x5_mandibula   && 'FOV 8×5 Mandíbula',
                data.cbct_8x8_maxilar_mandibula && 'FOV 8×8',
                data.cbct_atm_derecha     && 'ATM Derecha',
                data.cbct_atm_izquierda   && 'ATM Izquierda',
                data.cbct_atm_ambas       && 'ATM Ambas',
                data.cbct_12x85_oclusion  && 'FOV 12×8.5 Oclusión',
                data.cbct_12x85_mordedera && 'FOV 12×8.5 Mordedera',
                data.cbct_12x14_oclusion  && 'FOV 12×14 Oclusión',
                data.cbct_12x14_mordedera && 'FOV 12×14 Mordedera',
                ...fovSelected.map(f => `FOV Rápido: ${f}`),
            ].filter(Boolean),
        },
        {
            title: '📋 Radiografías',
            items: [
                data.rx_panoramica        && 'Panorámica',
                data.rx_lateral_craneo    && 'Lateral de Cráneo',
                data.rx_atm_lat           && 'ATM Lateral',
                data.rx_atm_ap            && 'ATM AP',
                data.rx_caldwell          && 'Caldwell',
                data.rx_hirtz             && 'Hirtz',
                data.rx_waters            && 'Waters',
                data.rx_pa                && 'P-A',
                data.rx_ap                && 'A-P',
                data.rx_digito_palmar     && 'Dígito Palmar',
            ].filter(Boolean),
        },
        {
            title: '🦷 Intraorales',
            items: [
                data.intra_periapical_od   && `Periapical — ${data.intra_periapical_od}`,
                data.intra_periapical_tipo && `Tipo: ${data.intra_periapical_tipo}`,
                data.intra_serie_tipo      && `Serie: ${data.intra_serie_tipo}`,
                data.intra_oclusal_superior && 'Oclusal Superior',
                data.intra_oclusal_inferior && 'Oclusal Inferior',
            ].filter(Boolean),
        },
        {
            title: '✦ Ortodóntico / 3D',
            items: [
                data.orto_panoramica      && 'Orto: Panorámica',
                data.orto_fotografia      && 'Orto: Fotografía',
                data.orto_modelos_resina  && 'Orto: Modelos Resina',
                data.orto3d_panoramica    && 'Orto3D: Panorámica',
                data.orto3d_tomo_fov      && `Orto3D: FOV ${data.orto3d_tomo_fov}`,
                data.cefalo_steiner       && 'Cefalométrico: Steiner',
                data.cefalo_jarabak       && 'Cefalométrico: Jarabak',
                data.cefalo_ricketts      && 'Cefalométrico: Ricketts',
            ].filter(Boolean),
        },
        {
            title: '+ Adicionales',
            items: [
                data.adic_modelos_resina    && 'Modelos Resina',
                data.adic_fotografia        && 'Fotografía',
                data.adic_escaneo_intraoral && 'Escaneo Intraoral',
                data.adic_escaneo_facial    && 'Escaneo Facial',
            ].filter(Boolean),
        },
    ];

    return (
        <>
            <div className="sr-step-heading">
                <div className="sr-step-heading-ico">✓</div>
                <div>
                    <h2>Resumen de la solicitud</h2>
                    <p>Revisa los estudios seleccionados antes de enviar</p>
                </div>
            </div>

            <div className="sr-summary-grid">
                {sections.map((sec) => (
                    <div className="sr-summary-card" key={sec.title}>
                        <h4>{sec.title}</h4>
                        {sec.items.length === 0
                            ? <span className="sr-summary-empty">Sin selección</span>
                            : sec.items.map((item, i) => <Chip key={i} label={item} />)
                        }
                    </div>
                ))}
            </div>

            <div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: 'var(--sr-muted)', marginBottom: 6 }}>
                    Observaciones generales
                </div>
                <textarea
                    className="sr-textarea"
                    rows={4}
                    value={data.observaciones ?? ''}
                    onChange={e => setData('observaciones', e.target.value)}
                    placeholder="Escriba aquí cualquier indicación adicional..."
                />
            </div>
        </>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────
export default function FormSolicitud({ data, setData, errors, processing, onSubmit, isEdit = false }) {
    const [step, setStep] = useState(0);

    // Validación mínima paso 1
    const canNext = () => {
        if (step === 0) return data.nombre && data.apellido_paterno && data.fecha;
        return true;
    };

    const goNext = () => { if (canNext()) setStep(s => s + 1); };
    const goPrev = () => setStep(s => s - 1);

    const stepComponents = [
        <Step1 key={0} data={data} setData={setData} errors={errors} />,
        <Step2 key={1} data={data} setData={setData} />,
        <Step3 key={2} data={data} setData={setData} />,
        <Step4 key={3} data={data} setData={setData} />,
    ];

    return (
        <>
            <style>{CSS}</style>

            <form onSubmit={onSubmit}>

                {/* ════ HEADER ════ */}
                <div style={{
                    background: 'linear-gradient(135deg, #1a5276 0%, #163a55 100%)',
                    color: 'white', padding: '26px 32px',
                    borderRadius: '12px 12px 0 0', position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', top: '-40%', right: '-5%', width: 220, height: 220, background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
                    <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700 }}>
                        Solicitud de Estudios Radiográficos
                    </h1>
                    <p style={{ fontSize: 12, opacity: 0.65, marginTop: 4 }}>
                        Formulario de solicitud — Imagen dental y maxilofacial
                    </p>
                    <div style={{ position: 'absolute', top: 22, right: 28, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', padding: '5px 14px', borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                        Odontología
                    </div>
                </div>

                {/* ════ STEPPER ════ */}
                <div className="sr-stepper">
                    {STEPS.map((s, i) => {
                        const isDone   = i < step;
                        const isActive = i === step;
                        return (
                            <div key={i} className="sr-step" style={{ flex: i < STEPS.length - 1 ? '1' : 'none' }}>
                                <div
                                    className={`sr-step-inner`}
                                    onClick={() => { if (isDone || isActive) setStep(i); }}
                                    style={{ cursor: isDone ? 'pointer' : isActive ? 'default' : 'not-allowed', opacity: !isDone && !isActive ? 0.45 : 1 }}
                                >
                                    <div className={`sr-step-dot ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}
                                        style={{ background: isDone ? '#d4efdf' : isActive ? '#1a5276' : 'white',
                                                 borderColor: isDone ? '#1e8449' : isActive ? '#1a5276' : '#d5dbe0',
                                                 color: isDone ? '#1e8449' : isActive ? 'white' : '#7f8c8d' }}>
                                        {isDone ? '✓' : i + 1}
                                    </div>
                                    <div className="sr-step-label">
                                        <span className="sr-step-num">Paso {i + 1}</span>
                                        <span className="sr-step-title">{s.label}</span>
                                    </div>
                                </div>
                                {i < STEPS.length - 1 && (
                                    <div className="sr-step-line" style={{ background: isDone ? '#1e8449' : '#d5dbe0' }} />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* ════ CONTENIDO DEL PASO ════ */}
                <div className="sr-step-body" key={step}>
                    {stepComponents[step]}
                </div>

                {/* ════ NAVEGACIÓN ════ */}
                <div className="sr-nav">
                    <div className="sr-nav-progress">
                        Paso <span>{step + 1}</span> de <span>{STEPS.length}</span>
                    </div>
                    <div className="sr-nav-buttons">
                        {step === 0 ? (
                            <Link href={route('solicitudes-radiograficas.index')} className="sr-btn sr-btn-sec">
                                Cancelar
                            </Link>
                        ) : (
                            <button type="button" onClick={goPrev} className="sr-btn sr-btn-sec">
                                ← Anterior
                            </button>
                        )}

                        {step < STEPS.length - 1 ? (
                            <button
                                type="button"
                                onClick={goNext}
                                className="sr-btn sr-btn-pri"
                                disabled={!canNext()}
                                title={!canNext() ? 'Completa los campos requeridos' : ''}
                            >
                                Siguiente →
                            </button>
                        ) : (
                            <button type="submit" disabled={processing} className="sr-btn sr-btn-success">
                                {processing ? '⏳ Guardando...' : (isEdit ? '💾 Actualizar' : '✓ Enviar Solicitud')}
                            </button>
                        )}
                    </div>
                </div>

            </form>
        </>
    );
}
