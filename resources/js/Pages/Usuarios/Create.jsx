// ============================================
// PASO 1: IMPORTACIONES
// ============================================

// Head: Permite cambiar el <title> de la página
// Link: Para navegar entre páginas
// useForm: Hook de Inertia para manejar formularios fácilmente
import { Head, Link, useForm } from '@inertiajs/react';

// Importamos nuestros componentes reutilizables
// El "@" es un alias que apunta a "resources/js/" (configurado en vite.config.js)
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function Create() {

    // ============================================
    // PASO 2: CONFIGURAR EL FORMULARIO CON useForm
    // ============================================
    // useForm nos devuelve varias cosas útiles:
    // - data: objeto con los valores actuales del formulario
    // - setData: función para actualizar un campo (setData('campo', valor))
    // - post: función para enviar el formulario por POST
    // - processing: boolean, es true mientras se envía (útil para deshabilitar botón)
    // - errors: objeto con errores de validación que devuelve Laravel
    const { data, setData, post, processing, errors } = useForm({
        // Aquí definimos los campos del formulario con sus valores iniciales
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        active: true,  // Checkbox marcado por defecto
    });

    // ============================================
    // PASO 3: FUNCIÓN PARA ENVIAR EL FORMULARIO
    // ============================================
    const submit = (e) => {
        // Prevenimos que la página se recargue (comportamiento por defecto del form)
        e.preventDefault();

        // Enviamos los datos por POST usando el nombre de la ruta
        // route('usuarios.store') genera la URL: /usuarios
        // Inertia se encarga de todo: enviar datos, manejar errores, redireccionar, etc.
        post(route('usuarios.store'));
    };

    // ============================================
    // PASO 4: EL JSX (LO QUE SE RENDERIZA)
    // ============================================
    return (
        <>
            {/* Cambia el título de la pestaña del navegador */}
            <Head title="Crear Usuario" />

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="mb-0">Crear Usuario</h4>
                            </div>
                            <div className="card-body">

                                {/* El formulario llama a submit() cuando se envía */}
                                <form onSubmit={submit}>

                                    {/* -------- CAMPO: NOMBRE -------- */}
                                    <div className="mb-3">
                                        {/* InputLabel: muestra el texto "Nombre" */}
                                        <InputLabel htmlFor="name" value="Nombre" />

                                        {/* TextInput: el input de texto */}
                                        <TextInput
                                            id="name"
                                            value={data.name}  // Valor actual del campo
                                            onChange={(e) => setData('name', e.target.value)}  // Actualiza al escribir
                                            isFocused={true}  // Este input tendrá el foco al cargar
                                        />

                                        {/* InputError: muestra el error si existe */}
                                        {/* Si errors.name no existe, no muestra nada */}
                                        <InputError message={errors.name} />
                                    </div>

                                    {/* -------- CAMPO: EMAIL -------- */}
                                    <div className="mb-3">
                                        <InputLabel htmlFor="email" value="Correo Electrónico" />
                                        <TextInput
                                            id="email"
                                            type="email"  // Tipo email para validación del navegador
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* -------- CAMPO: PASSWORD -------- */}
                                    <div className="mb-3">
                                        <InputLabel htmlFor="password" value="Contraseña" />
                                        <TextInput
                                            id="password"
                                            type="password"  // Oculta los caracteres
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    {/* -------- CAMPO: CONFIRMAR PASSWORD -------- */}
                                    <div className="mb-3">
                                        <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                        {/* No necesita InputError porque Laravel valida contra 'password' */}
                                    </div>

                                    {/* -------- CAMPO: CHECKBOX ACTIVO -------- */}
                                    <div className="mb-3 form-check">
                                        {/* Para checkbox usamos input normal de Bootstrap */}
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="active"
                                            checked={data.active}  // checked en vez de value para checkbox
                                            onChange={(e) => setData('active', e.target.checked)}  // e.target.checked para checkbox
                                        />
                                        <label className="form-check-label" htmlFor="active">
                                            Usuario Activo
                                        </label>
                                    </div>

                                    {/* -------- BOTONES -------- */}
                                    <div className="d-flex gap-2">
                                        {/* Se deshabilita mientras processing es true */}
                                        <PrimaryButton disabled={processing}>
                                            {/* Cambia el texto mientras se envía */}
                                            {processing ? 'Guardando...' : 'Guardar Usuario'}
                                        </PrimaryButton>

                                        {/* Link para volver al listado */}
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
