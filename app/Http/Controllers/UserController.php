<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

// ============================================
// CONTROLADOR CRUD - USUARIOS
// ============================================
// Un CRUD tiene 7 métodos estándar:
// 1. index   → Listar todos los registros
// 2. create  → Mostrar formulario para crear
// 3. store   → Guardar nuevo registro (POST)
// 4. show    → Mostrar un registro (no lo usamos aquí)
// 5. edit    → Mostrar formulario para editar
// 6. update  → Actualizar registro (PUT/PATCH)
// 7. destroy → Eliminar registro (DELETE)

class UserController extends Controller
{
    // ============================================
    // CONSTRUCTOR - Proteger rutas con permisos
    // ============================================
    public function __construct()
    {
        // Solo usuarios con rol "Super Su" pueden acceder
        $this->middleware('role:Super Su');
    }

    // ============================================
    // INDEX - Listar todos los usuarios
    // ============================================
    // GET /usuarios
    // Obtiene todos los usuarios de la BD y los envía a React
    public function index()
    {
        // paginate(10) trae de 10 en 10
        // Devuelve: { data: [...], links: [...], current_page, last_page, etc. }
        $usuarios = User::paginate(10);

        // Enviamos los usuarios a React como "prop"
        // En React lo recibes como: const { usuarios } = usePage().props
        return Inertia::render('Usuarios/Index', [
            'usuarios' => $usuarios
        ]);
    }

    // ============================================
    // CREATE - Mostrar formulario de creación
    // ============================================
    // GET /usuarios/create
    // Solo muestra el formulario vacío
    public function create()
    {
        return Inertia::render('Usuarios/Create');
    }

    // ============================================
    // STORE - Guardar nuevo usuario
    // ============================================
    // POST /usuarios
    // Recibe los datos del formulario y los guarda en la BD
    public function store(Request $request)
    {
        // 1. Validar los datos que llegan
        // Si falla, Laravel automáticamente devuelve los errores a React
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',  // unique:users = no repetir email
            'password' => 'required|confirmed|min:8',   // confirmed = debe coincidir con password_confirmation
            'active' => 'boolean',
        ]);

        // 2. Hashear el password (NUNCA guardar en texto plano)
        $validated['password'] = Hash::make($validated['password']);

        // 3. Crear el usuario en la BD
        User::create($validated);

        // 4. Redireccionar al listado
        // route('usuarios.index') genera la URL /usuarios
        return redirect()->route('usuarios.index');
    }

    // ============================================
    // EDIT - Mostrar formulario de edición
    // ============================================
    // GET /usuarios/{user}/edit
    // El {user} en la ruta hace "Route Model Binding"
    // Laravel automáticamente busca el User con ese ID
    public function edit(User $user)
    {
        // Enviamos el usuario a editar como prop
        return Inertia::render('Usuarios/Edit', [
            'usuario' => $user
        ]);
    }

    // ============================================
    // UPDATE - Actualizar usuario existente
    // ============================================
    // PUT /usuarios/{user}
    // Recibe los datos y actualiza el registro
    public function update(Request $request, User $user)
    {
        // 1. Validar
        // El unique debe ignorar el usuario actual (para que pueda mantener su email)
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,  // ignora el ID actual
            'password' => 'nullable|confirmed|min:8',  // nullable = opcional en edición
            'active' => 'boolean',
        ]);

        // 2. Solo hashear si se envió un nuevo password
        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            // Si no se envió password, lo quitamos para no sobrescribir
            unset($validated['password']);
        }

        // 3. Actualizar el usuario
        $user->update($validated);

        // 4. Redireccionar al listado
        return redirect()->route('usuarios.index');
    }

    // ============================================
    // DESTROY - Desactivar usuario (soft delete lógico)
    // ============================================
    // DELETE /usuarios/{user}
    // En lugar de eliminar, solo cambiamos active a 0
    public function destroy(User $user)
    {
        // Cambiar active a false (0) en lugar de eliminar
        $user->update(['active' => false]);

        // Redireccionar al listado
        return redirect()->route('usuarios.index');
    }
}
