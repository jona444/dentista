<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ============================================
        // REINICIAR CACHE DE PERMISOS
        // ============================================
        // Importante: Esto limpia el caché de permisos
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // ============================================
        // CREAR PERMISOS
        // ============================================
        $permissions = [
            'listar_usuarios',    // Ver el listado de usuarios
            'crear_usuarios',     // Crear nuevos usuarios
            'editar_usuarios',    // Editar usuarios existentes
            'eliminar_usuarios',  // Eliminar (desactivar) usuarios
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        echo "✅ Permisos creados: " . implode(', ', $permissions) . "\n";

        // ============================================
        // CREAR ROL "SUPER SU"
        // ============================================
        $superSuRole = Role::create(['name' => 'Super Su']);

        echo "✅ Rol creado: Super Su\n";

        // ============================================
        // ASIGNAR TODOS LOS PERMISOS AL ROL
        // ============================================
        $superSuRole->givePermissionTo($permissions);

        echo "✅ Permisos asignados al rol Super Su\n";

        // ============================================
        // CREAR USUARIO JONATHAN (SUPER USUARIO)
        // ============================================
        $jonathan = User::create([
            'name' => 'Jonathan',
            'email' => 'jona@correo.com',
            'password' => Hash::make('123456'),
            'active' => true,
        ]);

        echo "✅ Usuario creado: Jonathan (jona@correo.com)\n";

        // ============================================
        // ASIGNAR ROL "SUPER SU" A JONATHAN
        // ============================================
        $jonathan->assignRole('Super Su');

        echo "✅ Rol 'Super Su' asignado a Jonathan\n";

        // ============================================
        // CREAR USUARIO NORMAL (PARA PROBAR)
        // ============================================
        $normalUser = User::create([
            'name' => 'Usuario Normal',
            'email' => 'usuario@correo.com',
            'password' => Hash::make('123456'),
            'active' => true,
        ]);

        echo "✅ Usuario normal creado: usuario@correo.com (sin rol)\n";

        // ============================================
        // RESUMEN
        // ============================================
        echo "\n";
        echo "==========================================\n";
        echo "CONFIGURACIÓN COMPLETADA\n";
        echo "==========================================\n";
        echo "Roles creados: 1\n";
        echo "Permisos creados: " . count($permissions) . "\n";
        echo "Usuarios creados: 2\n";
        echo "\n";
        echo "CREDENCIALES:\n";
        echo "----------\n";
        echo "Super Usuario:\n";
        echo "  Email: jona@correo.com\n";
        echo "  Password: 123456\n";
        echo "  Rol: Super Su\n";
        echo "\n";
        echo "Usuario Normal:\n";
        echo "  Email: usuario@correo.com\n";
        echo "  Password: 123456\n";
        echo "  Rol: Ninguno\n";
        echo "==========================================\n";
    }
}
