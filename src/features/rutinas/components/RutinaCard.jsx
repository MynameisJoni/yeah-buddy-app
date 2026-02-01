import Swal from "sweetalert2";

export default function RutinaCard({ rutina, ejercicios, onEdit, onDelete }){
    const handleVerDetalle = () => {
        const ejerciciosRutina = rutina.ejerciciosIds.map(id => ejercicios.find(ej => ej.$id === id)).filter(Boolean);

        const ejerciciosHTML = ejerciciosRutina.length > 0 ? ejerciciosRutina.map(ej => `
            <li class="text-left py-1">
                <span class="font-semibold">${ej.nombre}</span> 
                <span class="text-gray-400">- ${ej.grupoMuscular}</span>
            </li>
            `).join('')
        : '<li class="text-gray-400">Sin ejercicios</li>';
        
        Swal.fire({
            
        })
    }
}