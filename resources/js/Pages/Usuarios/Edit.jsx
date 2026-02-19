// ============================================
// EDIT - FORMULARIO DE EDICIÓN
// ============================================
// Este componente es muy similar a Create, pero:
// 1. Recibe el usuario a editar desde Laravel
// 2. Usa PUT en lugar de POST
// 3. El password es opcional (solo se cambia si se llena)

import { Head, Link, useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit() {
    // ============================================
    // RECIBIR EL USUARIO DE LARAVEL
    // ============================================
    // El controlador envió: 'usuario' => $user
    // Lo recibimos con usePage().props
    const { usuario } = usePage().props;

    // ============================================
    // CONFIGURAR FORMULARIO CON DATOS EXISTENTES
    // ============================================
    // A diferencia de Create, aquí inicializamos con los datos del usuario
    const { data, setData, put, processing, errors } = useForm({
        name: usuario.name,           // Viene con el nombre actual
        email: usuario.email,         // Viene con el email actual
        password: '',                 // Vacío (solo se cambia si escribe algo)
        password_confirmation: '',
        active: usuario.active,       // Viene con el estado actual
    });

    // ============================================
    // FUNCIÓN PARA ENVIAR
    // ============================================
    const submit = (e) => {
        e.preventDefault();

        // Usamos PUT en lugar de POST para actualizar
        // route('usuarios.update', usuario.id) genera: /usuarios/{id}
        put(route('usuarios.update', usuario.id));
    };

    return (
        <>
            <Head title="Editar Usuario" />

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="mb-0">Editar Usuario</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submit}>

                                    {/* -------- CAMPO: NOMBRE -------- */}
                                    <div className="mb-3">
                                        <InputLabel htmlFor="name" value="Nombre" />
                                        <TextInput
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            isFocused={true}
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    {/* -------- CAMPO: EMAIL -------- */}
                                    <div className="mb-3">
                                        <InputLabel htmlFor="email" value="Correo Electrónico" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* -------- CAMPO: PASSWORD (OPCIONAL) -------- */}
                                    <div className="mb-3">
                                        <InputLabel htmlFor="password" value="Nueva Contraseña (opcional)" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        {/* Nota para el usuario */}
                                        <small className="text-muted">
                                            Dejar vacío para mantener la contraseña actual
                                        </small>
                                        <InputError message={errors.password} />
                                    </div>

                                    {/* -------- CAMPO: CONFIRMAR PASSWORD -------- */}
                                    <div className="mb-3">
                                        <InputLabel htmlFor="password_confirmation" value="Confirmar Nueva Contraseña" />
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                    </div>

                                    {/* -------- CAMPO: CHECKBOX ACTIVO -------- */}
                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="active"
                                            checked={data.active}
                                            onChange={(e) => setData('active', e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor="active">
                                            Usuario Activo
                                        </label>
                                    </div>

                                    {/* -------- BOTONES -------- */}
                                    <div className="d-flex gap-2">
                                        <PrimaryButton disabled={processing}>
                                            {processing ? 'Actualizando...' : 'Actualizar Usuario'}
                                        </PrimaryButton>

                                        <Link href={route('usuarios.index')} className="btn btn-secondary">
                                            Cancelar
                                        </Link>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
