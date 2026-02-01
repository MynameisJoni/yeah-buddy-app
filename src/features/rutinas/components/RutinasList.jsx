import RutinaCard from "./RutinaCard";

export default function RutinasList({ rutinas, ejercicios, onEdit, onDelete, onCreate }){
    
    if(rutinas.length === 0){
        return(
            <div className="text-center py-12 bg-dark-light rounded-lg border border-gray-dark">
                <p className="text-gray-light text-lg mb-4">No tienes rutinas todavía, está feo...</p>
                <button
                    onClick={onCreate}
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition"
                >
                    Crea tu primera rutina
                </button>
            </div>
        );
    }

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rutinas.map((rutina) => (
                <RutinaCard
                    key={rutina.$id}
                    rutina={rutina}
                    ejercicios={ejercicios}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}