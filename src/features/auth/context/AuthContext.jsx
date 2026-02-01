import { createContext, useState, useEffect, useContext } from "react";
import { PROJECT_ID, DATABASE_ID, COLLECTIONS, API_ENDPOINT } from "../../../config/appwrite";

// contexto
const AuthContext = createContext(null);

// Hook de conveniencia
export function useAuth(){
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth debe usarse dentro de un AuthProvider");
    return ctx;
}

// key de almacenamiento
const STORAGE_KEY = "auth:user";

/**
 * AuthProvider
 * - Mantiene el estado de la sesión { user: {...} | null }
 * - Expone login() y logout()
 * - Persiste en localStorage para recordar sesión al recargar
 */
export function AuthProvider({children}){
    const [user, setUser] = useState(null); // no logueado
    const [loading, setLoading] = useState(true); // estado de carga inicial

    // Cargar sesión guardada al montar
    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if(raw){
            try{
                setUser(JSON.parse(raw));
            } catch {}
        }
        setLoading(false);
    }, [])

    // guardar sesión en localStorage al cambiar
    useEffect(() => {
        if(user){
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, [user]);

    // login real consultando api
    async function login(email, password){
        if(!email || !password){
            throw new Error("Email y contraseñas requeridos");
        }

        try{
            // Obtener todos los documentos (sin queries que dan error 400)
            const url = `${API_ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTIONS.USUARIOS}/documents`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Appwrite-Project': PROJECT_ID
                }
            });

            if(!response.ok){
                throw new Error("Error al conectar con el servidor");
            }

            const data = await response.json();

            // Filtrar manualmente por email y password
            const userData = data.documents.find(doc => doc.email === email && doc.password === password);

            if(!userData) {
                throw new Error('Email o contraseña incorrectos');
            }

            setUser(userData);
            return userData;
        }catch(error){
            throw new Error(error.message || "Error al iniciar sesión");
        }
    }

    // reguistrar nuevo usuario
    async function register(nombre, email, password){
        if(!nombre || !email || !password){
            throw new Error("Todos los campos son requeridos");
        }

        try{
            // Obtener todos los documentos para verificar si el email existe
            const checkUrl = `${API_ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTIONS.USUARIOS}/documents`;

            const checkResponse = await fetch(checkUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Appwrite-Project': PROJECT_ID
                }
            });

            if(!checkResponse.ok){
                throw new Error("Error al verificar email");
            }

            const checkData = await checkResponse.json();

            // Filtrar manualmente por email
            const existingUser = checkData.documents.find(doc => doc.email === email);

            if(existingUser){
                throw new Error("El email ya está registrado");
            }

            // crear usuario
            const createUrl = `${API_ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTIONS.USUARIOS}/documents`;

            const bodyData = {
                documentId: 'unique()',
                data: {
                    nombre,
                    peso: null,
                    altura: null,
                    objetivo: null,
                    edad: null,
                    email,
                    password
                }
            };

            console.log('📤 Body a enviar:', JSON.stringify(bodyData, null, 2));

            const createResponse = await fetch(createUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Appwrite-Project': PROJECT_ID
                },
                body: JSON.stringify(bodyData)
            });

            console.log('📡 Status del POST:', createResponse.status);

            if(!createResponse.ok){
                const errorData = await createResponse.json();
                console.error('❌ Error del servidor:', errorData);
                throw new Error(errorData.message || "Error al crear usuario");
            }
            
            const newUser = await createResponse.json();
            setUser(newUser);
            return newUser;
        } catch(error){
            throw new Error(error.message || "Error al registrar usuario");
        }
    }

    function logout(){
        setUser(null);
    }

    const value = {user, loading, login, register, logout };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}