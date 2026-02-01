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
            title: rutina.nombre,
            html: `
                <div class="text-left">
                    <p class="mb-2"><strong>Descripción:</strong></p>
                    <p class="text-gray-400 mb-4">${rutina.descripcion || 'Sin descripción'}</p>
                    <p class="mb-2"><strong>Ejercicios (${ejerciciosRutina.length}):</strong></p>
                    <ul class="list-disc pl-5">${ejerciciosHTML}</ul>
                </div>
            `,
            icon: 'info',
            background: '#2A2A2A',
            color: '#fff',
            confirmButtonColor: '#DC2626',
            confirmButtonText: 'Cerrar',
            width: 600
        });
    };

    const ejerciciosRutina = rutina.ejerciciosIds.map(id => ejercicios.find(ej => ej.$id === id)).filter(Boolean);

    return(
        <div className="bg-dark-light border border-gray-dark rounded-lg p-5 hover:border-primary transition">
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">
                        {rutina.nombre}
                    </h3>
                    <span className="inline-block bg-primary/20 text-primary text-xs px-3 py-1 rounded-full">
                        {rutina.ejerciciosIds?.length || 0} ejercicios
                    </span>
                </div>
            </div>

            <p className="text-gray.light text-sm mb-4 line-clamp-2">
                {rutina.descripcion || 'Sin descripción'}
            </p>

            {ejerciciosRutina.length > 0 && (
                <div className="mb-4 bg-dark-lighter rounded p-3">
                    <p className="text-xs text-gray-light mb-2">Incluye: </p>
                    <div className="flex flex-wrap gap-1">
                        {ejerciciosRutina.slice(0, 3).map((ej) => (
                            <span key={ej.$id} className="text-xs bg-dark text-white px-2 py-1 rounded">{ej.nombre}</span>
                        ))}
                        {ejerciciosRutina.length > 3 && (
                            <span className="text-xs text-gray-light px-2 py-1">+{ejerciciosRutina.length -3} más</span>
                        )}
                    </div>
                </div>
            )}

            <div className="flex gap-2">
                <button
                    onClick={handleVerDetalle}
                    className="flex-1 bg-dark-lighter hover:bg-gray-dark text-white py-2 px-3 rounded text-sm font-medium transition">
                        Ver
                </button>
                <button
                    onClick={() => onEdit(rutina)}
                    className="bg-dark-lighter hover:bg-gray-dark text-white py-2 px-3 rounded text-sm font-medium transition">
                        Editar
                </button>
                <button 
                    onClick={() => onDelete(rutina.$id)}
                    className="bg-primary/20 hover:bg-primary text-white py-2 px-3 rounded text-sm font-medium transition">
                        Eliminar
                </button>
            </div>
        </div>
    );
}