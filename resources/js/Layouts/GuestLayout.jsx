import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
            <div className="mb-4">
                <Link href="/">
                    <h1 className="text-primary fw-bold">Mi App</h1>
                </Link>
            </div>

            <div className="card shadow-sm" style={{ width: '100%', maxWidth: '420px' }}>
                <div className="card-body p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
