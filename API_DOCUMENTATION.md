# 📱 API REST - Documentación para React Native

## 🔗 Base URL
```
http://localhost:8000/api
```
*(Cambiar en producción)*

---

## 🌐 Endpoints Disponibles

### 1️⃣ **REGISTER** - Registrar nuevo usuario
```
POST /api/register
```

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Accept": "application/json"
}
```

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "device_name": "iPhone de Juan"
}
```

**Respuesta exitosa (201):**
```json
{
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "active": true,
    "created_at": "2024-01-24T10:00:00.000000Z",
    "updated_at": "2024-01-24T10:00:00.000000Z"
  },
  "token": "1|abc123xyz456..."
}
```

**Errores posibles (422):**
```json
{
  "message": "The email has already been taken.",
  "errors": {
    "email": ["The email has already been taken."]
  }
}
```

---

### 2️⃣ **LOGIN** - Iniciar sesión
```
POST /api/login
```

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Accept": "application/json"
}
```

**Body:**
```json
{
  "email": "juan@example.com",
  "password": "password123",
  "device_name": "iPhone de Juan"
}
```

**Respuesta exitosa (200):**
```json
{
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "active": true
  },
  "token": "2|def789ghi012..."
}
```

**Errores posibles (422):**
```json
{
  "message": "The provided credentials are incorrect.",
  "errors": {
    "email": ["These credentials do not match our records."]
  }
}
```

---

### 3️⃣ **USER** - Obtener usuario autenticado
```
GET /api/user
```

**Headers:**
```json
{
  "Authorization": "Bearer 2|def789ghi012...",
  "Accept": "application/json"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "active": true,
  "created_at": "2024-01-24T10:00:00.000000Z",
  "updated_at": "2024-01-24T10:00:00.000000Z"
}
```

**Error sin token (401):**
```json
{
  "message": "Unauthenticated."
}
```

---

### 4️⃣ **LOGOUT** - Cerrar sesión
```
POST /api/logout
```

**Headers:**
```json
{
  "Authorization": "Bearer 2|def789ghi012...",
  "Accept": "application/json"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

## 🔐 Autenticación con Tokens

### Flujo completo:

1. **Usuario se registra o inicia sesión**
   - Recibes un `token` en la respuesta

2. **Guardar el token en React Native**
   ```javascript
   import AsyncStorage from '@react-native-async-storage/async-storage';

   await AsyncStorage.setItem('auth_token', data.token);
   ```

3. **Usar el token en todas las peticiones protegidas**
   ```javascript
   const token = await AsyncStorage.getItem('auth_token');

   fetch('http://localhost:8000/api/user', {
     headers: {
       'Authorization': `Bearer ${token}`,
       'Accept': 'application/json'
     }
   });
   ```

4. **Al hacer logout**
   ```javascript
   await fetch('http://localhost:8000/api/logout', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${token}`
     }
   });

   await AsyncStorage.removeItem('auth_token');
   ```

---

## 🧪 Probar con cURL (terminal)

### Register:
```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "device_name": "My Device"
  }'
```

### Login:
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "device_name": "My Device"
  }'
```

### Get User (reemplaza TOKEN):
```bash
curl -X GET http://localhost:8000/api/user \
  -H "Authorization: Bearer TOKEN_AQUI" \
  -H "Accept: application/json"
```

### Logout:
```bash
curl -X POST http://localhost:8000/api/logout \
  -H "Authorization: Bearer TOKEN_AQUI" \
  -H "Accept: application/json"
```

---

## 🛠️ Probar con Postman o Insomnia

1. Importa la colección o crea las peticiones manualmente
2. Para rutas protegidas, ve a **Authorization** → **Bearer Token** → Pega el token
3. Asegúrate de agregar el header: `Accept: application/json`

---

## ⚙️ Configuración CORS (para React Native)

Si tu app móvil no puede conectarse, verifica el archivo `config/cors.php`:

```php
'paths' => ['api/*'],
'allowed_origins' => ['*'],  // En producción, especifica tu dominio
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
```

---

## 🚀 Siguiente paso: Roles y Permisos

Una vez que la API funcione correctamente, podemos agregar:
- Roles (admin, usuario, moderador)
- Permisos (crear_usuarios, editar_posts, etc.)
- Middleware para proteger rutas por rol

---

## 📝 Notas importantes

- ✅ El token **NO expira** por defecto (configurable en `sanctum.php`)
- ✅ Cada dispositivo genera un token diferente
- ✅ Los usuarios inactivos (`active = false`) **pueden** iniciar sesión (puedes bloquearlos si quieres)
- ✅ Las contraseñas se hashean automáticamente
- ✅ El campo `device_name` es obligatorio (identifica el dispositivo)
