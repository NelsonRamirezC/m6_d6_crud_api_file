import fs from "node:fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let pathPersonas = path.resolve(__dirname, "../database/personas.json");

//READ -> LEER PERSONAS
const leerPersonas = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let personas = await fs.readFile(pathPersonas, "utf8");
            resolve(JSON.parse(personas));
        } catch (error) {
            console.log(error);
            reject("Error al leer el archivo personas.json");
        }
    });
};

const agregarPersona = (persona) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await leerPersonas();
            data.personas.push(persona);
            data = JSON.stringify(data, null, 4);
            await fs.writeFile(pathPersonas, data, "utf8");
            resolve(`Persona ${persona.nombre} guardado con éxito.`);
        } catch (error) {
            reject(
                `Error al intentar agregar la persona con nombre ${persona.nombre}`
            );
        }
    });
};

const actualizarPersona = (personaModificada) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Persona modificada", personaModificada);
            let data = await leerPersonas();
            let personaEncontrada = data.personas.find(
                (persona) => persona.id == personaModificada.id
            );

            if (personaEncontrada) {
                personaEncontrada.nombre = personaModificada.nombre;
                personaEncontrada.apellido = personaModificada.apellido;
                personaEncontrada.email = personaModificada.email;
                data = JSON.stringify(data, null, 4);
                await fs.writeFile(pathPersonas, data, "utf8");
                resolve(
                    `Persona ${personaModificada.nombre} ha sido actualizada con éxito.`
                );
            } else {
                reject("Persona no fue encontrada.");
            }
        } catch (error) {
            console.log(error);
            reject(
                `Error al intentar modificar la persona con nombre ${personaModificada.nombre}`
            );
        }
    });
};

let operaciones = {
    leerPersonas,
    agregarPersona,
    actualizarPersona,
};

export default operaciones;

/* let personaModificada = new Persona(2, "Pedro", "Soto", "pedro2000@gmail.com");

actualizarPersona(personaModificada)
    .then((respuesta) => console.log(respuesta))
    .catch((error) => console.log(error)); */
