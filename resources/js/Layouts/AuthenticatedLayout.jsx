import { Link, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    return (
        <div className="min-vh-100 bg-light">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand" href={route('dashboard')}>
                        Mi App
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    href={route('dashboard')}
                                >
                                    Dashboard
                                </Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    href={route('solicitudes-radiograficas')}
                                >
                                    Form
                                </Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item me-3">
                                <span className="nav-link text-light">
                                    {auth.user.name}
                                </span>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="btn btn-outline-light btn-sm"
                                    onClick={handleLogout}
                                >
                                    Cerrar Sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main className="py-4">
                <div className="container">
                    {children}
                </div>
            </main>
        </div>
    );
}
