// ============================================
// EJEMPLO DE USO EN REACT NATIVE
// ============================================
// Este archivo muestra cómo integrar la API
// en tu aplicación React Native

import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================
// CONFIGURACIÓN
// ============================================
const API_URL = 'http://192.168.1.100:8000/api'; // Cambia a tu IP local
// Para Android emulator usa: http://10.0.2.2:8000/api

// ============================================
// SERVICIO DE AUTENTICACIÓN
// ============================================
class AuthService {

  // -------- REGISTER --------
  static async register(name, email, password, passwordConfirmation) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
          device_name: 'React Native App', // O usa un identificador único
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro');
      }

      // Guardar token
      await AsyncStorage.setItem('auth_token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));

      return data;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }

  // -------- LOGIN --------
  static async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          device_name: 'React Native App',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Credenciales incorrectas');
      }

      // Guardar token y usuario
      await AsyncStorage.setItem('auth_token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));

      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  // -------- LOGOUT --------
  static async logout() {
    try {
      const token = await AsyncStorage.getItem('auth_token');

      if (token) {
        await fetch(`${API_URL}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
      }

      // Limpiar storage
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user');

      return true;
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  }

  // -------- GET USER --------
  static async getUser() {
    try {
      const token = await AsyncStorage.getItem('auth_token');

      if (!token) {
        throw new Error('No hay token');
      }

      const response = await fetch(`${API_URL}/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener usuario');
      }

      await AsyncStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
    }
  }

  // -------- CHECK AUTH --------
  static async isAuthenticated() {
    const token = await AsyncStorage.getItem('auth_token');
    return !!token;
  }

  // -------- GET TOKEN --------
  static async getToken() {
    return await AsyncStorage.getItem('auth_token');
  }

  // -------- GET CACHED USER --------
  static async getCachedUser() {
    const userJson = await AsyncStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }
}

// ============================================
// EJEMPLO DE COMPONENTE LOGIN
// ============================================
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);

    try {
      const data = await AuthService.login(email, password);

      Alert.alert('Éxito', `Bienvenido ${data.user.name}!`);

      // Navegar a la pantalla principal
      navigation.replace('Home');

    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
        }}
      />

      <Button
        title={loading ? 'Cargando...' : 'Iniciar Sesión'}
        onPress={handleLogin}
        disabled={loading}
      />

      <Button
        title="¿No tienes cuenta? Regístrate"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

// ============================================
// EJEMPLO DE COMPONENTE REGISTER
// ============================================
export const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !passwordConfirmation) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== passwordConfirmation) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const data = await AuthService.register(
        name,
        email,
        password,
        passwordConfirmation
      );

      Alert.alert('Éxito', '¡Cuenta creada exitosamente!');
      navigation.replace('Home');

    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Registro</Text>

      <TextInput
        placeholder="Nombre completo"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }}
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }}
      />

      <TextInput
        placeholder="Confirmar contraseña"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 }}
      />

      <Button
        title={loading ? 'Cargando...' : 'Registrarse'}
        onPress={handleRegister}
        disabled={loading}
      />

      <Button
        title="Ya tengo cuenta"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

// ============================================
// EJEMPLO DE HOME SCREEN (PROTEGIDA)
// ============================================
export const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AuthService.getUser();
      setUser(userData);
    } catch (error) {
      Alert.alert('Error', 'Sesión expirada');
      navigation.replace('Login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      Alert.alert('Éxito', 'Sesión cerrada');
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Bienvenido!</Text>

      {user && (
        <View>
          <Text>Nombre: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <Text>ID: {user.id}</Text>
        </View>
      )}

      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
};

// ============================================
// EJEMPLO DE NAVEGACIÓN (React Navigation)
// ============================================
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ============================================
// INSTALACIÓN DE DEPENDENCIAS
// ============================================
/*
npm install @react-native-async-storage/async-storage
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
*/
