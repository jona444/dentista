import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index() {
    const { solicitudes, flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar esta solicitud?')) {
            router.delete(route('solicitudes-radiograficas.destroy', id));
        }
    };

    return (
        <>
            <Head title="Solicitudes Radiográficas" />

            <div className="container mt-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Solicitudes Radiográficas</h1>
                    <Link href={route('solicitudes-radiograficas.create')} className="btn btn-primary">
                        Nueva Solicitud
                    </Link>
                </div>

                {flash?.success && (
                    <div className="alert alert-success alert-dismissible fade show">
                        {flash.success}
                    </div>
                )}

                <div className="card">
                    <div className="card-body">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Paciente</th>
                                    <th>Fecha</th>
                                    <th>Doctor</th>
                                    <th>Teléfono</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {solicitudes.data.map((s) => (
                                    <tr key={s.id}>
                                        <td>{s.id}</td>
                                        <td>{s.nombre} {s.apellido_paterno} {s.apellido_materno}</td>
                                        <td>{s.fecha}</td>
                                        <td>{s.doctor_solicitante ?? '—'}</td>
                                        <td>{s.telefono ?? '—'}</td>
                                        <td>
                                            <Link
                                                href={route('solicitudes-radiograficas.show', s.id)}
                                                className="btn btn-sm btn-info me-1"
                                            >
                                                Ver
                                            </Link>
                                            <Link
                                                href={route('solicitudes-radiograficas.edit', s.id)}
                                                className="btn btn-sm btn-warning me-1"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(s.id)}
                                                className="btn btn-sm btn-danger"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {solicitudes.data.length === 0 && (
                            <p className="text-center text-muted">No hay solicitudes registradas.</p>
                        )}

                        {solicitudes.links && solicitudes.links.length > 3 && (
                            <nav className="d-flex justify-content-center mt-4">
                                <ul className="pagination">
                                    {solicitudes.links.map((link, i) => (
                                        <li key={i} className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}>
                                            <Link
                                                href={link.url || '#'}
                                                className="page-link"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
