import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import Home from './pages/Home';
import EjerciciosPage from './pages/EjerciciosPage';
import RutinasPage from './pages/RutinasPage';
import PerfilPage from './pages/PerfilPage';

export default function APP(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/ejercicios" element={
          <ProtectedRoute>
            <EjerciciosPage />
          </ProtectedRoute>
        } />
        <Route path="/rutinas" element={
          <ProtectedRoute>
            <RutinasPage />
          </ProtectedRoute>
        } />
        <Route path="/perfil" element={
          <ProtectedRoute>
            <PerfilPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}