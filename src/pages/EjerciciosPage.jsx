import { useState, useEffect } from "react";
import Layout from "../shared/components/Layout";
import { ejerciciosService } from "../features/ejercicios/services/ejerciciosService";
import Swal from "sweetalert2";
import EjerciciosList from "../features/ejercicios/components/EjerciciosList";


const GRUPOS_MUSCULARES = ['Pecho', 'Espalda', 'Piernas', 'Brazos', 'Hombros', 'Core'];

export default function EjerciciosPage(){
    const [ejercicios, setEjercicios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarEjercicios();
    }, []);

    const cargarEjercicios = async () => {
        try{
            const data = await ejerciciosService.getAll();
            setEjercicios(data);
        } catch (error) {
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

    const handleCrear = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Crear nuevo ejercicio',
            html: `
                <input id="nombre" class="swal2-input" placeholder="Nombre del ejercicio" style="background: #3A3A3A; color: white; border: 1px solid #4B5563;">
                <select id="grupo" class="swal2-select" style="background: #3A3A3A; color: white; border: 1px solid #4B5563;">
                    <option value="">Grupo muscular</option>
                    ${GRUPOS_MUSCULARES.map(g => `<option value="${g}">${g}</option>`).join('')}
                </select>
                <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción (opcional)" style="background: #3A3A3A; color: white; border: 1px solid #4B5563;"></textarea>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            background: '#2A2A2A',
            color: '#fff',
            confirmButtonColor: '#DC2626', 
            cancelButtonColor: '#4B5563',
            preConfirm: () => {
                const nombre = document.getElementById('nombre').value;
                const grupo = document.getElementById('grupo').value;
                const descripcion = document.getElementById('descripcion').value;

                if(!nombre || !grupo){
                    Swal.showValidationMessage('Nombre y grupo muscular son obligatorios');
                    return false;
                }

                return {nombre, grupoMuscular: grupo, descripcion };
            }
        });

        if (formValues) {
            try {
                await ejerciciosService.create(formValues);
                Swal.fire({
                    icon: 'success',
                    title: '¡Creado!',
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#2A2A2A',
                    color: '#fff'
                });
                cargarEjercicios();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                    background: '#2A2A2A',
                    color: '#fff',
                    confirmButtonColor: '#DC2626'
                });
            }
        };
    }

    const handleEditar = async (ejercicio) => {
        const { value: formValues } = await Swal.fire({
        title: 'Editar Ejercicio',
        html: `
            <input id="nombre" class="swal2-input" value="${ejercicio.nombre}" style="background: #3A3A3A; color: white; border: 1px solid #4B5563;">
            <select id="grupo" class="swal2-select" style="background: #3A3A3A; color: white; border: 1px solid #4B5563;">
                ${GRUPOS_MUSCULARES.map(g => `<option value="${g}" ${g === ejercicio.grupoMuscular ? 'selected' : ''}>${g}</option>`).join('')}
            </select>
            <textarea id="descripcion" class="swal2-textarea" style="background: #3A3A3A; color: white; border: 1px solid #4B5563;">${ejercicio.descripcion || ''}</textarea>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        background: '#2A2A2A',
        color: '#fff',
        confirmButtonColor: '#DC2626',
        cancelButtonColor: '#4B5563',
        preConfirm: () => {
            return {
                nombre: document.getElementById('nombre').value,
                grupoMuscular: document.getElementById('grupo').value,
                descripcion: document.getElementById('descripcion').value
            };
        }
        });

        if (formValues) {
            try {
                await ejerciciosService.update(ejercicio.$id, formValues);
                Swal.fire({
                    icon: 'success',
                    title: '¡Actualizado!',
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#2A2A2A',
                    color: '#fff'
                });
                cargarEjercicios();
            } catch (error) {
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

    const handleEliminar = async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar?',
            text: 'No podrás revertir esto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: '#2A2A2A',
            color: '#fff',
            confirmButtonColor: '#DC2626',
            cancelButtonColor: '#4B5563'
        });

        if (result.isConfirmed) {
            try {
                await ejerciciosService.delete(id);
                Swal.fire({
                    icon: 'success',
                    title: '¡Eliminado!',
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#2A2A2A',
                    color: '#fff'
                });
                cargarEjercicios();
            } catch (error) {
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

    const handleVerDetalle = (ejercicio) => {
        Swal.fire({
            title: ejercicio.nombre,
            html: `
                <div class="text-left">
                    <p class="mb-2"><strong>Grupo:</strong> ${ejercicio.grupoMuscular}</p>
                    <p class="mb-2"><strong>Descripción:</strong></p>
                    <p class="text-gray-400">${ejercicio.descripcion || 'Sin descripción'}</p>
                </div>
            `,
            icon: 'info',
            background: '#2A2A2A',
            color: '#fff',
            confirmButtonColor: '#DC2626'
        });
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
                        <h1 className="text-3xl font-bold text-white">Ejercicios</h1>
                        <p className="text-gray-light mt-1">{ejercicios.length} ejercicios disponibles</p>
                    </div>
                    <button
                        onClick={handleCrear}
                        className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                        + Nuevo Ejercicio
                    </button>
                </div>
                <EjerciciosList
                    ejercicios={ejercicios}
                    onEdit={handleEditar}
                    onDelete={handleEliminar}
                    onCreate={handleCrear}
                />
            </div>
        </Layout>
    );
}