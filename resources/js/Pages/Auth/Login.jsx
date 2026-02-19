import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Iniciar Sesión" />

            <h4 className="card-title text-center mb-4">Iniciar Sesión</h4>

            <form onSubmit={submit}>
                <div className="mb-3">
                    <InputLabel htmlFor="email" value="Correo Electrónico" />
                    <TextInput
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        isFocused={true}
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

                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="remember">
                        Recordarme
                    </label>
                </div>

                <div className="d-grid gap-2">
                    <PrimaryButton disabled={processing}>
                        {processing ? 'Iniciando...' : 'Iniciar Sesión'}
                    </PrimaryButton>
                </div>

                <div className="text-center mt-3">
                    <span className="text-muted">¿No tienes cuenta? </span>
                    <Link href={route('register')} className="text-decoration-none">
                        Regístrate
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
