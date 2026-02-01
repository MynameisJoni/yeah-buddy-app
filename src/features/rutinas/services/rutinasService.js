import { API_ENDPOINT, PROJECT_ID, DATABASE_ID, COLLECTIONS } from "../../../config/appwrite";

export const rutinasService = {
    //GET rutinas
    async getAll(){
        try{
            const url = `${API_ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTIONS.RUTINAS}/documents?queries[]=equal("usuarioId","${usuarioId}")`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Appwrite-Project': PROJECT_ID
                }
            });

            if(!response.ok){
                throw new Error("error al obtener rutinas");
            }

            const data = await response.json();
            return data.documents;
        } catch(error){
            throw new Error(error.message || "Error al cargar las rutinas: " + error.message);
        }
    },

    // GET rutina por id
    async getById(id){
        try{
            const url = `${API_ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTIONS.RUTINAS}/documents/${id}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Appwrite-Project': PROJECT_ID
                }
            });

            if(!response.ok){
                throw new Error("Error al cargar la rutina");
            }

            return await response.json();
        } catch(error){
            throw new Error(error.message || "Error al cargar la rutina: " + error.message);
        }
    },

    // POST rutina
    async create(){
        try{
            url = `${API_ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTIONS.RUTINAS}/documents`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Appwrite-Project': PROJECT_ID
                },
                body: JSON.stringify({
                    documentId: 'unique()',
                    data: data
                })
            });

            if(!response.ok){
                throw new Error("Error al crear la rutina");
            }
            return await response.json();
        }catch (error){
            throw new Error(error.message || "Error al crear la rutina: " + error.message);
        }
    },

    // PATCH rutina
    async update(id, data){
        try{
            const url = `${API_ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTIONS.RUTINAS}/documents/${id}`;
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
                throw new Error("Error al actualizar la rutina");
            }

            return await response.json();
        } catch(error){
            throw new Error(error.message || "Error al actualizar la rutina: " + error.message);
        }
    },

    // DELETE rutina
    async delete(id){
        try{
            const url = `${API_ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTIONS.RUTINAS}/documents/${id}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Appwrite-Project': PROJECT_ID
                }
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al eliminar la rutina");
            }

            return true;
        } catch (error){
            throw new Error(error.message || "Error al eliminar la rutina: " + error.message);
        }
    }
};