import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";


// componente para proteger rutas que requieren autenticación
export function ProtectedRoute({ children }) {
    const {user, loading} = useAuth();

    if(loading){
        return <div>Cargando...</div>;
    }

    // si no hay usuario, volvemos al login
    if(!user){
        return <Navigate to="/login" replace />;
    }

    return children;
}