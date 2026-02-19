import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Registro" />

            <h4 className="card-title text-center mb-4">Crear Cuenta</h4>

            <form onSubmit={submit}>
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

                <div className="mb-3">
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <TextInput
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="mb-3">
                    <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                <div className="d-grid gap-2">
                    <PrimaryButton disabled={processing}>
                        {processing ? 'Registrando...' : 'Registrarse'}
                    </PrimaryButton>
                </div>

                <div className="text-center mt-3">
                    <span className="text-muted">¿Ya tienes cuenta? </span>
                    <Link href={route('login')} className="text-decoration-none">
                        Inicia Sesión
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
