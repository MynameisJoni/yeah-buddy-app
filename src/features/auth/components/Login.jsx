import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import Swal from "sweetalert2";

export default function Login(){
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            await login(email, password);
            Swal.fire({
                icon:'success',
                title:'Bienvenido!!!',
                text: 'Sesión iniciada correctamente, a ponerte grande...',
                timer: 1500,
                showConfirmButton: false
            });
            navigate('/');
        } catch (error) {
            Swal.fire({
                icon:'error',
                title:'ERROR',
                text: error.message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark">
            <div className="bg-dark-light p-8 rounded-lg shadow-2xl w-full max-w-md border-gray-dark">
                <h1 className="text-3xl font-bold text-center mb-2 text-white">
                    YEAH BUDDY!!
                </h1>
                <p className="text-center text-primary text-lg font-semibold mb-8">
                    LightWeight Fitness App, BABY!!
                </p>
                <h2 className="text-xl text-center mb-8 text-gray-light">
                    Iniciar sesión
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-light mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-dark-lighter border border-gray-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white placeholder-gray"
                            placeholder="email@lightweight.baby"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-light mb-2">
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-dark-lighter border border-gray-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white placeholder-gray"
                            placeholder="*********"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>
                </form>
                <p className="text-center mt-6 text-gray-light">
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" className="text-primary hover:text-primary-light hover:underline font-semibold">
                        Regístrate
                    </Link>
                </p>
            </div>
        </div>
    );
}