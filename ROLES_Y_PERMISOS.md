# 🔐 Sistema de Roles y Permisos

## ✅ ¿Qué se implementó?

### **Backend (Laravel):**
1. ✅ Instalado **Spatie Laravel Permission**
2. ✅ Creado rol **"Super Su"** (Super Usuario)
3. ✅ Creados 4 permisos:
   - `listar_usuarios`
   - `crear_usuarios`
   - `editar_usuarios`
   - `eliminar_usuarios`
4. ✅ Usuario **Jonathan** creado con rol "Super Su"
5. ✅ Usuario **Normal** sin rol (para probar)
6. ✅ API protegida con middleware de roles
7. ✅ Endpoints API para gestionar usuarios

### **Frontend (React Native):**
1. ✅ AuthService actualizado para manejar roles y permisos
2. ✅ HomeScreen muestra botón "Gestión de Usuarios" **solo si es Super Su**
3. ✅ Pantalla de gestión de usuarios creada
4. ✅ Listado de usuarios con opción de desactivar

---

## 👥 Usuarios Creados

### **Super Usuario (Jonathan):**
```
Email: jona@correo.com
Password: 123456
Rol: Super Su
Permisos: Todos (crear, editar, eliminar, listar usuarios)
```

### **Usuario Normal:**
```
Email: usuario@correo.com
Password: 123456
Rol: Ninguno
Permisos: Ninguno
```

---

## 🎯 Cómo Funciona

### **1. Login con Super Usuario (Jonathan):**

```javascript
// React Native
Email: jona@correo.com
Password: 123456
```

**Resultado:**
- ✅ Inicia sesión correctamente
- ✅ En la pantalla Home verá: "Hola Jonathan"
- ✅ **Verá el botón** "👥 Gestión de Usuarios"
- ✅ Al presionarlo, abre la lista de usuarios
- ✅ Puede desactivar usuarios

---

### **2. Login con Usuario Normal:**

```javascript
// React Native
Email: usuario@correo.com
Password: 123456
```

**Resultado:**
- ✅ Inicia sesión correctamente
- ✅ En la pantalla Home verá: "Hola Usuario Normal"
- ❌ **NO verá el botón** "👥 Gestión de Usuarios"
- ✅ Solo podrá cerrar sesión

---

## 📡 Endpoints API (Solo para Super Su)

### **1. Listar usuarios:**
```
GET /api/users
Authorization: Bearer {token}
```

**Respuesta:**
```json
{
  "users": [
    {
      "id": 1,
      "name": "Jonathan",
      "email": "jona@correo.com",
      "active": true,
      "role_names": ["Super Su"]
    }
  ]
}
```

---

### **2. Crear usuario:**
```
POST /api/users
Authorization: Bearer {token}

Body:
{
  "name": "Nuevo Usuario",
  "email": "nuevo@correo.com",
  "password": "123456",
  "password_confirmation": "123456",
  "active": true
}
```

---

### **3. Actualizar usuario:**
```
PUT /api/users/{id}
Authorization: Bearer {token}

Body:
{
  "name": "Nombre Actualizado",
  "email": "email@correo.com",
  "active": true
}
```

---

### **4. Desactivar usuario:**
```
DELETE /api/users/{id}
Authorization: Bearer {token}
```

---

### **5. Activar usuario:**
```
POST /api/users/{id}/activate
Authorization: Bearer {token}
```

---

## 🧪 Cómo Probar

### **Paso 1: Ejecutar Laravel**
```bash
cd C:\Users\TMP48\Downloads\REACTLARAVEL-main
php artisan serve
```

### **Paso 2: Ejecutar React Native**
```bash
cd C:\Users\TMP48\Downloads\MiAppMovil
npx react-native run-android
```

### **Paso 3: Probar con Super Usuario**
1. Login con `jona@correo.com` / `123456`
2. Verás el botón "👥 Gestión de Usuarios"
3. Presiona el botón
4. Verás la lista de usuarios
5. Prueba desactivar un usuario

### **Paso 4: Probar con Usuario Normal**
1. Cierra sesión
2. Login con `usuario@correo.com` / `123456`
3. NO verás el botón "👥 Gestión de Usuarios"
4. Solo podrás ver "Hola Usuario Normal" y cerrar sesión

---

## 🔧 Verificar Roles en Laravel

### **Opción 1: Desde Tinker**
```bash
php artisan tinker
```

```php
// Ver roles de un usuario
$user = User::find(1);
$user->getRoleNames(); // ["Super Su"]

// Ver permisos
$user->getAllPermissions()->pluck('name');

// Asignar rol a un usuario
$user = User::find(2);
$user->assignRole('Super Su');

// Quitar rol
$user->removeRole('Super Su');

exit
```

### **Opción 2: Verificar en código**
```php
// En cualquier controlador o código
if (auth()->user()->hasRole('Super Su')) {
    // El usuario es Super Su
}

if (auth()->user()->can('listar_usuarios')) {
    // Tiene permiso para listar usuarios
}
```

---

## 📝 Archivos Modificados/Creados

### **Laravel:**
```
✅ app/Models/User.php                         → Agregado trait HasRoles
✅ app/Http/Controllers/Api/AuthController.php → Envía roles y permisos
✅ app/Http/Controllers/Api/UserApiController.php → Nuevo (CRUD usuarios)
✅ app/Http/Controllers/UserController.php     → Protegido con middleware
✅ routes/api.php                              → Nuevas rutas API
✅ database/seeders/RolesAndPermissionsSeeder.php → Nuevo
✅ ROLES_Y_PERMISOS.md                         → Este archivo
```

### **React Native:**
```
✅ src/services/AuthService.js            → Manejo de roles y permisos
✅ src/screens/HomeScreen.js              → Botón condicional
✅ src/screens/UserManagementScreen.js    → Nueva pantalla
✅ App.js                                 → Nueva ruta
```

---

## 🚀 Agregar Más Roles y Permisos

### **1. Crear nuevo rol:**
```bash
php artisan tinker
```
```php
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

// Crear rol
$role = Role::create(['name' => 'Moderador']);

// Crear permisos
Permission::create(['name' => 'editar_posts']);
Permission::create(['name' => 'eliminar_comentarios']);

// Asignar permisos al rol
$role->givePermissionTo(['editar_posts', 'eliminar_comentarios']);

// Asignar rol a usuario
$user = User::find(2);
$user->assignRole('Moderador');

exit
```

---

## 🛡️ Proteger Rutas por Permiso

### **En controladores Laravel:**
```php
public function __construct()
{
    // Por rol
    $this->middleware('role:Super Su');

    // Por permiso
    $this->middleware('permission:listar_usuarios')->only(['index']);
    $this->middleware('permission:crear_usuarios')->only(['store']);
}
```

### **En rutas:**
```php
Route::middleware(['auth:sanctum', 'role:Super Su'])->group(function () {
    Route::get('/users', [UserApiController::class, 'index']);
});
```

---

## 🎯 Siguiente Paso

Ahora puedes:
1. ✅ Agregar más roles (Moderador, Editor, etc.)
2. ✅ Crear permisos específicos
3. ✅ Proteger más rutas
4. ✅ Crear pantallas de gestión de roles en React Native
5. ✅ Asignar roles desde la app móvil

---

## 💡 Notas Importantes

- ✅ Solo usuarios con rol "Super Su" pueden gestionar usuarios
- ✅ El usuario no puede desactivarse a sí mismo
- ✅ Los roles y permisos se guardan en AsyncStorage
- ✅ Se verifican en cada request al backend
- ✅ Los usuarios sin rol solo ven el saludo "Hola [nombre]"

---

¡Todo listo! 🎉
