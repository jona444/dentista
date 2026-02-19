// ============================================
// INDEX - LISTADO DE USUARIOS
// ============================================

// Head: para el título de la pestaña
// Link: para navegar sin recargar página (como <a> pero mejor)
// router: para hacer peticiones (delete, post, etc.)
// usePage: para acceder a los props que envía Laravel
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index() {
    // ============================================
    // RECIBIR DATOS DE LARAVEL
    // ============================================
    // usePage().props contiene todo lo que Laravel envió con Inertia::render()
    // En el controlador enviamos: 'usuarios' => $usuarios

    // Aquí lo recibimos como: const { usuarios } = usePage().props
    const { usuarios } = usePage().props;

    // ============================================
    // FUNCIÓN PARA ELIMINAR
    // ============================================
    const handleDelete = (id) => {
        // Confirmar antes de eliminar
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            // router.delete() envía una petición DELETE
            // route('usuarios.destroy', id) genera: /usuarios/{id}
            router.delete(route('usuarios.destroy', id));
        }
    };

    return (
        <>
            <Head title="Usuarios" />

            <div className="container mt-5">
                {/* -------- ENCABEZADO -------- */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Usuarios</h1>
                    {/* Link usa route() para generar la URL */}
                    <Link href={route('usuarios.create')} className="btn btn-primary">
                        Nuevo Usuario
                    </Link>
                </div>

                {/* -------- TABLA DE USUARIOS -------- */}
                <div className="card">
                    <div className="card-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* -------- MAPEAR USUARIOS -------- */}
                                {/* Con paginación, los datos vienen en usuarios.data */}
                                {usuarios.data.map((usuario) => (
                                    // key={usuario.id} es obligatorio en React para listas
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.name}</td>
                                        <td>{usuario.email}</td>
                                        <td>
                                            {/* Mostrar badge según estado */}
                                            {usuario.active ? (
                                                <span className="badge bg-success">Activo</span>
                                            ) : (
                                                <span className="badge bg-danger">Inactivo</span>
                                            )}
                                        </td>
                                        <td>
                                            {/* Botón Editar */}
                                            <Link
                                                href={route('usuarios.edit', usuario.id)}
                                                className="btn btn-sm btn-warning me-2"
                                            >
                                                Editar
                                            </Link>

                                            {/* Botón Eliminar */}
                                            <button
                                                onClick={() => handleDelete(usuario.id)}
                                                className="btn btn-sm btn-danger"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* -------- MENSAJE SI NO HAY USUARIOS -------- */}
                        {usuarios.data.length === 0 && (
                            <p className="text-center text-muted">No hay usuarios registrados.</p>
                        )}

                        {/* -------- PAGINACIÓN -------- */}
                        {/* usuarios.links contiene los links de paginación */}
                        {usuarios.links && usuarios.links.length > 3 && (
                            <nav className="d-flex justify-content-center mt-4">
                                <ul className="pagination">
                                    {usuarios.links.map((link, index) => (
                                        <li
                                            key={index}
                                            className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                                        >
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
