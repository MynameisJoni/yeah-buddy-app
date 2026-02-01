import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";
import { ejerciciosService } from "../features/ejercicios/services/ejerciciosService";
import { rutinasService } from "../features/rutinas/services/rutinasService";
import Layout from "../shared/components/Layout";


export default function Home(){
    const {user} = useAuth();
    const [stats, setStats] = useState({
        totalEjercicios: 0,
        totalrutinas: 0,
        loading: true,
    });

    useEffect(() => {
        cargarEstadisticas();
    }, []);

    const cargarEstadisticas = async() => {
        try{
            const [ejercicios, rutinas] = await Promise.all([
                ejerciciosService.getAll(),
                rutinasService.getAll(user.$id)
            ]);

            setStats({
                totalEjercicios: ejercicios.length,
                totalrutinas: rutinas.length,
                loading: false,
            });
        } catch(error){
            console.error("Error al cargar estadísticas: ", error);
            setStats({ totalEjercicios: 0, totalrutinas: 0, loading: false});
        }
    };

    return(
        <Layout>
            <div className="space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        LightWeight, {user?.nombre}!!
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link to="/ejercicios" className="block">
                        <div className="bg-dark-light border border-gray-dark rounded-lg p-6 hover:border-primary transition cursor-pointer h-full">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-white">Ejercicios</h2>
                            </div>
                            <p className="text-gray-light mb-4">
                                Gestiona la biblioteca de ejercicios y colabora con otras personas.
                            </p>
                            <div className="bg-dark-lighter rounded p-4">
                                {stats.loading ? (
                                    <p className="text-2xl font-bold text-gray-light">Cargando...</p>
                                ) : (
                                    <p className="text-3xl font-bold text-primary">
                                        {stats.totalEjercicios} Ejercicios
                                    </p>
                                )}
                            </div>
                        </div>
                    </Link>

                    <Link to="/rutinas" className="block">
                        <div className="bg-dark-light border border-gray-dark rounded-lg p-6 hover:border-primary transition cursor-pointer h-full">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-white">Rutinas</h2>
                            </div>
                            <p className="text-gray-light mb-4">Organiza tus entrenamientos!</p>
                            <div className="bg-dark-lighter rounded p-4">
                                {stats.loading ? (
                                    <p className="text-2xl font-bold text-gray-light">Cargando...</p>
                                ) : (
                                    <p className="text-3xl font-bold text-primary">{stats.totalrutinas} Rutinas</p>
                                )}
                            </div>
                        </div>
                    </Link>

                    <Link to="/perfil" className="block">
                        <div className="bg-dark-light border border-gray-dark rounded-lg p-6 hover:border-primary transition cursor-pointer h-full">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-white">Perfil</h2>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-light">Peso: </span>
                                    <span className="text-white font-semibold">{user?.peso ? `${user.peso} Kg`: 'No definido'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-light">Altura: </span>
                                    <span className="text-white font-semibold">{user?.altura ? `${user.altura} cm`: 'No definido'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-light">Objetivo: </span>
                                    <span className="text-white font-semibold">{user?.objetivo ? user.objetivo : 'No definido'}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-lg p-6 text-center">
                    <p className="text-white text-lg font-semibold mb-2">
                        "Ain't nothin' but a peanut!"
                    </p>
                    <p className="text-gray-light text-sm">
                        — Ronnie Coleman
                    </p>
                </div>
            </div>
        </Layout>
    );

    
}