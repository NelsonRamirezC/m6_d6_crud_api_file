import op from "../utils/operaciones.js";
import { v4 as uuid } from "uuid";

class Persona {
    constructor({ id, nombre, apellido, email }) {
        this.id = id || uuid().slice(0, 6);
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
    }

    static getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                let personas = await op.leerPersonas();
                resolve(personas);
            } catch (error) {
                reject(error);
            }
        });
    }

    addPersona() {
        return new Promise(async (resolve, reject) => {
            try {
                let persona = {
                    id: this.id,
                    nombre: this.nombre,
                    apellido: this.apellido,
                    email: this.email,
                };
                let respuesta = await op.agregarPersona(persona);
                resolve(respuesta);
            } catch (error) {
                reject(error);
            }
        });
    }

    update() {
        return new Promise(async (resolve, reject) => {
            try {
                let persona = {
                    id: this.id,
                    nombre: this.nombre,
                    apellido: this.apellido,
                    email: this.email,
                };
                let respuesta = await op.actualizarPersona(persona);
                resolve(respuesta);
            } catch (error) {
                reject(error);
            }
        });
    }
}
export default Persona;
