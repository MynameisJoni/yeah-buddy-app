import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";
import Swal from "sweetalert2";

export default function Navbar(){
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    // función para manejar el cierre de sesión
    const handleLogout = async () => {
        Swal.fire({
            title: 'Cerrar Sesión??',
            text: "Estás a un paso de salir de la mejor app de fitness de la historia!!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Si, flojera...',
            cancelButtonText: 'Una más...',
            background: '#2A2A2A',
            color: ' #fff',
            confirmButtonColor: '#DC2626',
            cancelButtonColor: '#4B5563'
        }).then((result) => {
            if(result.isConfirmed){
                logout();
                navigate('/login');
            }
        });
    };

    return (
        <nav className="bg-dark-lignt border-b border-gray-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-white">
                                Yeah Buddy!
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-light hover:text-white transition font-medium">
                            Home
                        </Link>
                        <Link to="/ejercicios" className="text-gray-light hover:text-white transition font-medium">
                            Ejercicios
                        </Link>
                        <Link to="/rutinas" className="text-gray-light hover:text-white transition font-medium">
                            Rutinas
                        </Link>
                        <Link to="/perfil" className="text-gray-light hover:text-white transition font-medium">
                            Mi Perfil
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-gray-light hidden sm:block">
                            {user?.nombre}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition"
                        >
                            Salir
                        </button>
                    </div>
                </div>

                <div className="md:hidden pb-4 flex space-x-4">
                    <Link to="/" className="text-gray-light hover:text-white text-sm">
                        Home
                    </Link>
                    <Link to="/ejercicios" className="text-gray-light hover:text-white text-sm">
                        Ejercicios
                    </Link>
                    <Link to="/rutinas" className="text-gray-light hover:text-white text-sm">
                        Rutinas
                    </Link>
                    <Link to="/perfil" className="text-gray-light hover:text-white text-sm">
                        Mi Perfil
                    </Link>
                </div>
            </div>
        </nav>
    );

}