import { API_ENDPOINT, PROJECT_ID, DATABASE_ID, COLLECTIONS } from "../../../config/appwrite";

export const ejerciciosService = {
    // GET ejercicios
    async getAll(){
        try{
            const url = `${API_ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTIONS.EJERCICIOS}/documents`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Appwrite-Project': PROJECT_ID
                }
            });

            if(!response.ok){
                throw new Error("Error al cargar ejercicios");
            }

            const data = await response.json();
            return data.documents;
        } catch (error){
            throw new Error(error.message || "Error al cargar ejercicios:" + error.message)
        }
    },

    // GET ejercicio por ID
    async getById(id){
        try{
            const url = `${API_ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTIONS.EJERCICIOS}/documents/${id}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Appwrite-Project': PROJECT_ID
                }
            });

            if(!response.ok){
                throw new Error("Error al cargar el ejercicio");
            }

            return await response.json();
        } catch(error){
            throw new Error(error.message || "Error al cargar el ejercicio: " + error.message);
        }
    },

    // POST ejercicio
    async create(data){
        try{
            const url = `${API_ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTIONS.EJERCICIOS}/documents`;

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
                const errorData = await response.json();
                throw new Error(errorData.message || "error al crear ejercicio");
            }

            return await response.json();
        } catch(error){
            throw new Error(error.message || "error al crear ejercicio: " + error.message);
        }
    },

    // PATCH ejercicio (appwrite no se lleva bien con PUT)
    async update(id, data){
        try{
            const url = `${API_ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTIONS.EJERCICIOS}/documents/${id}`;
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
                throw new Error(errorData.message || "Error al actualizar ejercicio");
            }

            return await response.json();
        } catch (error){
            throw new Error(error.message || "Error al actualizar ejercicio: " + error.message);
        }
    },

    // DELETE ejercicio
    async delete(id){
        try{
            const url = `${API_ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTIONS.EJERCICIOS}/documents/${id}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Appwrite-Project': PROJECT_ID
                }
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al eliminar ejercicio");
            }

            return true;
        } catch(error){
            throw new Error(error.message || "Error al eliminar ejercicio: " + error.message);
        }
    }
};