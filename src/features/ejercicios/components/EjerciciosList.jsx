import EjercicioCard from "./EjercicioCard";

export default function EjerciciosList({ ejercicios, onEdit, onDelete, onCreate }){
    if(ejercicios.length === 0){
        return(
            <div className="text-center py-12 bg-dark-light rounded-lg border border-gray-dark">
                <p className="text-gray-light text-lg mb-4">No hay ejercicios disponibles</p>
                <button
                    onClick={onCreate}
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition"
                >
                    Crear el primer ejercicio de la app!
                </button>
            </div>
        );
    }

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ejercicios.map((ejercicio) => (
                <EjercicioCard
                    key={ejercicio.$id}
                    ejercicio={ejercicio}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}