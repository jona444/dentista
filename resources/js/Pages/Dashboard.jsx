import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Dashboard</h5>
                        </div>
                        <div className="card-body">
                            <p className="mb-0">
                                ¡Bienvenido, <strong>{auth.user.name}</strong>! Has iniciado sesión correctamente.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
