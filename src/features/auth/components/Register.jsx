import { useState } from "react";
import { useNavigate,  Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

export default function Register(){
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const {register} = useAuth();
    const navigate = useNavigate();

    // función para manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        setFormData({
            ...formData, // con los tres puntos se copia el objeto original
            [e.target.name]: e.target.value
        });
    };

    // función para manejar el registro
    const handleSubmit = async (e) => {
        e.preventDefault();

        // modal de error en caso de no coincidir las contraseñas
        if(formData.password !== formData.confirmPassword){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas deben ser iguales',
                background: '#2A2A2A',
                color: '#fff',
                confirmButtonColor: '#DC2626'
            });
            return;
        }

        // Modal de error en caso de que la contraseña sea menor a 6 caracteres
        if(formData.password.length < 6){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La contraseña debe de tener al menos 6 caracteres',
                background: '#2A2A2A',
                color: '#fff',
                confirmButtonColor: '#DC2626'
            });
            return;
        }

        // si lo anterior se cumple...
        setLoading(true);

        try{
            await register(formData.nombre, formData.email, formData.password);
            Swal.fire({
                icon: 'success',
                title: 'Registrado con éxito!',
                text: 'Ya tenemos un titán nuevo!!',
                timer: 1500, // cierra el modal automáticamente después de 1.5 segundos
                showConfirmButton: false,
                background: '#2A2A2A',
                color: '#fff'
            });
            navigate('/'); // redirige a la página principal si el registro es exitoso
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title:'Error',
                text: error.message,
                background: '#2A2A2A',
                color: '#fff',
                confirmButtonColor: '#DC2626'
            });
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-dark">
            <div className="bg-dark-light p-8 rounded-lg shadow-2xl w-full max-w-md border-gray-dark">
                <h1 className="text-3xl font-bold text-center mb-2 text-white">
                    Yeah Buddy APP!!
                </h1>
                <p className="text-center text-primary text-lg font-semibold mb-8">
                    LightWeight, baby!!!!
                </p>
                <h2 className="text-xl text-center mb-8 text-gray-light">
                    Crear Cuenta
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-light mb-2">
                            Nombre completo:
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-dark-lighter border border-gray-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white placeholder-gray"
                            placeholder="Introduce tu nombre..."
                            required
                        />
                    </div>
                
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-light mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-dark-lighter border border-gray-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white placeholder-gray"
                            placeholder="ejemplo@email.com"
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
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-dark-lighter border border-gray-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white placeholder-gray"
                            placeholder="Mímino 6 caracteres"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-light mb-2">
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-dark-lighter border border-gray-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white placeholder-gray"
                            placeholder="Repite la contraseña..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-light">
                    Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-primary hover:text-primary-light hover:underline font-semibold">
                        Iniciar Sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}