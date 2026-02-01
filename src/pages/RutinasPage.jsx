import { useState, useEffect } from "react";
import Layout from "../shared/components/Layout";
import RutinasList from "../features/rutinas/components/RutinasList";
import { rutinasService } from "../features/rutinas/services/rutinasService";
import { ejerciciosService } from "../features/ejercicios/services/ejerciciosService";
import { useAuth } from "../features/auth/context/AuthContext";
import Swal from "sweetalert2";


export default function RutinasPage(){
    const { user } = useAuth();
    const [rutinas, setRutinas] = useState([]);
    const [ejercicios, setEjercicios] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try{
            const[rutinasData, ejerciciosData] = await Promise.all([
                rutinasService.getAll(user.$id),
                ejerciciosService.getAll()
            ]);
            setRutinas(rutinasData);
            setEjercicios(ejerciciosData);
        } catch(error){
            Swal.fire({
                icon:'error',
                title:'Error',
                text:error.message,
                background:'@2A2A2A',
                color:'#fff',
                confirmButtonColor:'#DC2626'
            });
        }finally{
            setLoading(false);
        }
    };

    const handleCrear = async() => {
        if(ejercicios.length === 0){
            Swal.fire({
                icon: 'warning',
                title: 'Sin ejercicios',
                text: 'Primero debes crear ejercicios para añadirlos a una rutina',
                background: '#2A2A2A',
                color: '#fff',
                confirmButtonColor: '#DC2626'
            });
            return;
        }

        const ejerciciosCheckboxes = ejercicios.map(ej => `
            <div class="text-left mb-2 p-2 hover:bg-gray-700 rounded">
                <label style="color: white; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                    <input type="checkbox" value="${ej.$id}" class="ejercicio-checkbox">
                    <span>${ej.nombre} <span style="color: #DC2626; font-size: 12px;">(${ej.grupoMuscular})</span></span>
                </label>
            </div>
        `).join('');

        const {value: formValues} = await Swal.fire({
            title: 'Nueva Rutina',
            html: `
                <input id="nombre" class="swal2-input" placeholder="Nombre de la rutina" style="background: #3A3A3A; color: white; border: 1px solid #4B5563;">
                <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción (opcional)" style="background: #3A3A3A; color: white; border: 1px solid #4B5563;"></textarea>
                <div style="max-height: 300px; overflow-y: auto; border: 1px solid #4B5563; padding: 10px; border-radius: 5px; margin-top: 10px; background: #3A3A3A;">
                    <p style="color: white; font-weight: bold; margin-bottom: 10px;">Selecciona ejercicios:</p>
                    ${ejerciciosCheckboxes}
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            background: '#2A2A2A',
            color: '#fff',
            confirmButtonColor: '#DC2626',
            cancelButtonColor: '#4B5563',
            width: 600,
            preConfirm: () => {
                const nombre = document.getElementById('nombre').value;
                const descripcion = document.getElementById('descripcion').value;
                const checkboxes = document.querySelectorAll('.ejercicio-checkbox:checked');
                const ejerciciosIds = Array.from(checkboxes).map(cb => cb.value);

                if (!nombre) {
                    Swal.showValidationMessage('El nombre es obligatorio');
                    return false;
                }
                if (ejerciciosIds.length === 0) {
                    Swal.showValidationMessage('Debes seleccionar al menos un ejercicio');
                    return false;
                }

                return { nombre, descripcion, ejerciciosIds };
            }
        });

        if(formValues){
            try{
                await rutinasService.create({
                    ...formValues,
                    usuarioId: user.$id
                });
                Swal.fire({
                    icon:'success',
                    title:'Rutina creada',
                    timer:1500,
                    showConfirmButton:false,
                    background:'#2A2A2A',
                    color:'#fff'
                });
                cargarDatos();
            } catch (error) {
                Swal.fire({
                    icon:'error',
                    title:'Error',
                    text:error.message,
                    background:'#2A2A2A',
                    color:'#fff',
                    confirmButtonColor:'#DC2626'
                });
            }
        }
    };

    const handleEditar = async (rutina) => {
        const ejerciciosCheckboxes = ejercicios.map(ej => {
            const checked = rutina.ejerciciosIds.includes(ej.$id) ? 'checked' : '';
            return `
                <div class="text-left mb-2 p-2 hover:bg-gray-700 rounded">
                    <label style="color: white; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                        <input type="checkbox" value="${ej.$id}" class="ejercicio-checkbox" ${checked}>
                        <span>${ej.nombre} <span style="color: #DC2626; font-size: 12px;">(${ej.grupoMuscular})</span></span>
                    </label>
                </div>
            `;
        }).join('');

        const { value:formValues } = await Swal.fire({
            title:'Editar Rutina',
            html:`
                <input id="nombre" class="swal2-input" value="${rutina.nombre}" style="background: #3A3A3A; color: white; border: 1px solid #4B5563;">
                <textarea id="descripcion" class="swal2-textarea" style="background: #3A3A3A; color: white; border: 1px solid #4B5563;">${rutina.descripcion || ''}</textarea>
                <div style="max-height: 300px; overflow-y: auto; border: 1px solid #4B5563; padding: 10px; border-radius: 5px; margin-top: 10px; background: #3A3A3A;">
                    <p style="color: white; font-weight: bold; margin-bottom: 10px;">Selecciona ejercicios:</p>
                    ${ejerciciosCheckboxes}
                </div>
            `,
            focusConfirm:false,
            showCancelButton:true,
            confirmButtonText:'Guardar',
            cancelButtonText:'Cancelar',
            background:'#2A2A2A',
            color:'#fff',
            confirmButtonColor:'#DC2626',
            cancelButtonColor:'#4B5563',
            width:600,
                preConfirm: () => {
                const nombre = document.getElementById('nombre').value;
                const descripcion = document.getElementById('descripcion').value;
                const checkboxes = document.querySelectorAll('.ejercicio-checkbox:checked');
                const ejerciciosIds = Array.from(checkboxes).map(cb => cb.value);

                if (!nombre) {
                    Swal.showValidationMessage('El nombre es obligatorio');
                    return false;
                }
                if (ejerciciosIds.length === 0) {
                    Swal.showValidationMessage('Debes seleccionar al menos un ejercicio');
                    return false;
                }

                return { nombre, descripcion, ejerciciosIds };
            }
        });

        if(formValues){
            try{
                await rutinasService.update(rutina.$id, formValues);
                Swal.fire({
                    icon:'success',
                    title:'Rutina Actualizada!',
                    timer:1500,
                    showConfirmButton:false,
                    background:'#2A2A2A',
                    color:'#fff'
                });
                cargarDatos();
            } catch(error){
                Swal.fire({
                    icon:'error',
                    title:'Error',
                    text:error.message,
                    background:'#2A2A2A',
                    color:'#fff',
                    confirmButtonColor:'#DC2626'
                });
            }
        }
    };

    const handleEliminar = async (id) => {
        const result = await Swal.fire({
            title:'Seguro que deseas eliminar esta rutina?',
            icon:'warning',
            text:'Los titanes no eliminan rutinas a la ligera',
            showCancelButton:true,
            confirmButtonText:'Si, flojera...',
            cancelButtonText:'Soy un tanque, cancelar',
            background:'#2A2A2A',
            color:'#fff',
            confirmButtonColor:'#DC2626',
            cancelButtonColor:'#4B5563'
        });

        if(result.isConfirmed){
            try{
                await rutinasService.delete(id);
                Swal.fire({
                    icon:'success',
                    title:'Rutina eliminada... =(',
                    timer:1500,
                    showConfirmButton:false,
                    background:'#2A2A2A',
                    color:'#fff'
                });
                cargarDatos();
            } catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                    background: '#2A2A2A',
                    color: '#fff',
                    confirmButtonColor: '#DC2626'
                });
            }
        }
    };

    if(loading){
        return(
            <Layout>
                <div className="text-center text-gray-light py-12">Cargando...</div>
            </Layout>
        );
    }

    return(
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Mis rutinas</h1>
                        <p className="text-gray-light mt-1">{rutinas.length} rutinas</p>
                    </div>
                    <button
                        onClick={handleCrear}
                        className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                        + Nueva rutina
                    </button>
                </div>

                <RutinasList
                    rutinas={rutinas}
                    ejercicios={ejercicios}
                    onEdit={handleEditar}
                    onDelete={handleEliminar}
                    onCreate={handleCrear}
                />
            </div>
        </Layout>
    );
}
