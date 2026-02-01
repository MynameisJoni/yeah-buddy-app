import { Link, useActionData } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";
import Layout from "../shared/components/Layout";


export default function Home(){
    const {user} = useAuth();

    return(
        <Layout>
            <div className="space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Bienvenido, {user?.nombre}!
                    </h1>
                    <p className="text-gray-light text-lg">
                        LightWeight, Baby!!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link to="/ejercicios">
                        <div className="bg-dark-light border border-gray-dark rounded-lg p-6 hover:border-primary transition cursor-pointer h-full">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-white">Ejercicios</h2>
                            </div>
                            <p className="text-gray-light mb-4">
                                Gestiona la biblioteca de ejercicios y colabora con más gente.
                            </p>
                            <div className="bg-dark-lighter rounded p-4">
                                <p className="text-3xl font-bold text-primary">--</p>
                                <p className="text-sm text-gray-light">Total disponibles</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/rutinas">
                        <div className="bg-dark-light border border-gray-dark rounded-lg p-6 hover:border-primary transition cursor-pointer h-full">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-white">Rutinas</h2>
                            </div>
                            <p className="text-gray-light mb-4">
                                Organiza tus entrenamientos para ponete tanque!
                            </p>
                            <div className="bg-dark-lighter rounded p-4">
                                <p className="text-3xl font-bold text-primary">--</p>
                                <p className="text-sm text-gray-light">Tus rutinas</p>
                            </div>
                        </div>
                    </Link>

                    <Link to="/perfil">
                        <div className="bg-dark-light border border-gray-dark rounded-lg p-6 hover:border-primary transition cursor-pointer h-full">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-white">Tu Perfil</h2>
                            </div>
                            <p className="text-gray-light mb-4">
                                {user?.email}
                            </p>
                            <div className="space-y-2 text-sm">
                                <p className="text-gray-light">
                                    <span className="font-semibold text-white">Peso:</span> {user?.peso || 'No definido'} Kg
                                </p>
                                <p className="text-gray-light">
                                    <span className="font-semibold text-white">Altura: </span>{user?.altura || 'No definido'} Cm
                                </p>
                                <p className="text-gray-light">
                                    <span className="font-semibold text-white">Objetivo: </span>{user?.objetivo || 'No definido'} Cm
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}