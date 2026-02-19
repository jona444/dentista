<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

// ============================================
// API CONTROLLER - GESTIÓN DE USUARIOS
// ============================================
// Este controlador maneja el CRUD de usuarios desde React Native
// Solo usuarios con rol "Super Su" pueden acceder

class UserApiController extends Controller
{
    // ============================================
    // CONSTRUCTOR - Proteger con middleware
    // ============================================
    public function __construct()
    {
        // Requiere autenticación con Sanctum
        $this->middleware('auth:sanctum');

        // Requiere rol "Super Su"
        $this->middleware('role:Super Su');
    }

    // ============================================
    // INDEX - Listar todos los usuarios
    // ============================================
    // GET /api/users
    public function index(): JsonResponse
    {
        $users = User::with('roles', 'permissions')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'active' => $user->active,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                    'role_names' => $user->getRoleNames()->toArray(),
                    'permission_names' => $user->getAllPermissions()->pluck('name')->toArray(),
                ];
            });

        return response()->json([
            'users' => $users,
        ]);
    }

    // ============================================
    // STORE - Crear nuevo usuario
    // ============================================
    // POST /api/users
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:6',
            'active' => 'boolean',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['active'] = $validated['active'] ?? true;

        $user = User::create($validated);

        return response()->json([
            'message' => 'Usuario creado exitosamente',
            'user' => $user,
        ], 201);
    }

    // ============================================
    // UPDATE - Actualizar usuario
    // ============================================
    // PUT /api/users/{id}
    public function update(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            'password' => 'nullable|confirmed|min:6',
            'active' => 'boolean',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return response()->json([
            'message' => 'Usuario actualizado exitosamente',
            'user' => $user,
        ]);
    }

    // ============================================
    // DESTROY - Desactivar usuario
    // ============================================
    // DELETE /api/users/{id}
    public function destroy(User $user): JsonResponse
    {
        // No permitir que el usuario se desactive a sí mismo
        if ($user->id === auth()->id()) {
            return response()->json([
                'message' => 'No puedes desactivarte a ti mismo',
            ], 403);
        }

        $user->update(['active' => false]);

        return response()->json([
            'message' => 'Usuario desactivado exitosamente',
        ]);
    }

    // ============================================
    // ACTIVATE - Activar usuario
    // ============================================
    // POST /api/users/{id}/activate
    public function activate(User $user): JsonResponse
    {
        $user->update(['active' => true]);

        return response()->json([
            'message' => 'Usuario activado exitosamente',
        ]);
    }
}
