import Swal from "sweetalert2";

export default function EjercicioCard({ejercicio, onEdit, onDelete}){
    const handleVerDetalle = () => {
        Swal.fire({
            title: ejercicio.nombre,
            html: `
                <div class="text-left">
                    <p class="mb-2"><strong>Grupo Muscular:</strong> ${ejercicio.grupoMuscular}</p>
                    <p class="mb-2"><strong>Descripción:</strong></p>
                    <p class="text-gray-400">${ejercicio.descripcion || 'Sin descripción'}</p>
                </div>
            `,
            icon: 'info',
            background: '#2A2A2A',
            color: '#fff',
            confirmButtonColor: '#DC2626',
            confirmButtonText: 'Cerrar'
        });
    };

    return (
        <div className="bg-dark-light border border-gray-dark rounded-lg p-5 hover:border-primary transition">
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{ejercicio.nombre}</h3>
                    <span className="inline-block bg-primary/20 text-primary text-xs px-3 py-1 rounded-full">{ejercicio.grupoMuscular}</span>
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={handleVerDetalle}
                    className="flex-1 bg-dark-lighter hover:bg-gray-dark text-white py-2 px-3 rounded text-sm font-medium transition"
                >
                    Ver Detalles
                </button>
                <button
                    onClick={() => onEdit(ejercicio)}
                    className="bg-dark-lighter hover:bg-gray-dark text-white py-2 px-3 rounded text-sm font-medium transition"
                >
                    Editar
                </button>

                <button
                    onClick={() => onDelete(ejercicio.$id)}
                    className="bg-primary/20 hover:bg-primary text-white py-2 px-3 rounded text-sm font-medium transition"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}