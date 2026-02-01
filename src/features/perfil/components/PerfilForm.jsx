import { useState } from "react";

export default function PerfilForm({ user, onSave, loading}){
    const [formData, setFormData] = useState({
        nombre: user?.nombre || '',
        email: user?.email || '',
        peso: user?.peso || '',
        altura: user?.altura || '',
        objetivo: user?.objetivo || '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return(
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-dark-light border border-gray-dark rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Información personal</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-light mb-2">Nombre completo</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-dark-lighter border border-gray-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-light mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-dark-lighter border border-gray-dark rounded-lg text-gray-light cursor-not-allowed"
                            disabled
                        />
                    </div>
                </div>
            </div>

            <div className="bg-dark-light border border-gray-dark rounded-lg p-6">
                <h2 className="text-zl font-bold text-white mb-4">Datos físicos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="peso" className="block text-sm font-medium text-gray-light mb-2">
                            Peso
                        </label>
                        <input
                            type="number"
                            id="peso"
                            name="peso"
                            value={formData.peso}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-dark-lighter border border-gray-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
                            placeholder="Introduce el peso en Kg..."
                        />
                    </div>
           
                    <div>
                        <label htmlFor="altura" className="block text-sm font-medium text-gray-light mb-2">
                            Altura
                        </label>
                        <input
                            type="number"
                            id="altura"
                            name="altura"
                            value={formData.altura}
                            onChange={handleChange}
                            step="0.1"
                            className="w-full px-4 py-3 bg-dark-lighter border border-gray-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
                            placeholder="Introduce la altura en cm..."
                        />
                    </div>
                </div>
            </div>

            <div className="bg-dark-light border border-gray-dark rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Objetivo</h2>
                <div>
                    <label htmlFor="objetivo" className="block text-sm font-medium text-gray-light mb-2">
                        Qué objetivo tienes?
                    </label>
                    <select
                        id="objetivo"
                        name="objetivo"
                        value={formData.objetivo}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-lighter border border-gray-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
                    >
                        <option value="">Selecciona un objetivo de titán</option>
                        <option value="Perder peso">Perder peso</option>
                        <option value="Ganar masa múscular">Ganar masa múscular</option>
                        <option value="Ponerme grande">Ponerme grande</option>
                        <option value="Mantener la forma">Mantener la forma</option>
                        <option value="Mejorar resistencia">Mejorar resistencia</option>
                        <option value="Aumentar fuerza">Aumentar fuerza</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Guardando...' : 'Guardar cambios'}
                </button>
            </div>
        </form>
    );
}