import { useState } from "react";
import Layout from "../shared/components/Layout";
import PerfilForm from "../features/perfil/components/PerfilForm";
import { perfilService } from "../features/perfil/services/perfilService";
import { useAuth } from "../features/auth/context/AuthContext";
import Swal from "sweetalert2";

export default function PerfilPage(){
    const {user, setUser} = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSave = async(formData) => {
        setLoading(true);

        try{
            const dataToUpdate = {
                nombre: formData.nombre,
                peso: formData.peso ? parseFloat(formData.peso) : null,
                altura: formData.altura ? parseFloat(formData.altura) : null,
                objetivo: formData.objetivo || null,
            };

            const updatedUser = await perfilService.update(user.$id, dataToUpdate);

            setUser(updatedUser);

            Swal.fire({
                icon:'success',
                title:'Guardado',
                text:'Perfil actualizado con éxito!',
                timer: 1500,
                showConfirmButton: false,
                background: '#2A2A2A',
                color: '#fff',
            });
        } catch (error){
            Swal.fire({
                icon: 'error',
                title: 'Error',
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
        <Layout>
            <div className="max-w-3xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">Mi perfil</h1>
                    <p className="text-gray-light mt-1">
                        Administra tus datos físicos y tus objetivos
                    </p>
                </div>

                <PerfilForm user={user} onSave={handleSave} loading={loading} />
            </div>
        </Layout>
    );
}