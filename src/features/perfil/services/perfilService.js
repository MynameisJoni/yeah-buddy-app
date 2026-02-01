import { API_ENDPOINT, PROJECT_ID, DATABASE_ID, COLLECTIONS } from "../../../config/appwrite";

export const perfilService = {
    // PATCH perfil usuario
    async update (usuarioId, data){
        try{
            const url = `${API_ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTIONS.USUARIOS}/documents/${usuarioId}`;
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Appwrite-Project': PROJECT_ID
                },
                body: JSON.stringify({
                    data: data
                })
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al actualizar perfil");
            }

            return await response.json();
        } catch(error){
            throw new Error(error.message || "Error al actualizar perfil: " + error.message);
        }
    }
};