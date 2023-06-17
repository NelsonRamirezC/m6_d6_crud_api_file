import express from "express";
import Persona from "./models/Persona.js";

const app = express();

//middleware
app.use(express.json()); // recibirá los datos por parte cliente en el req.body

app.listen(3000, () =>
    console.log("servidor escuchando en http://localhost:3000")
);

//ENDPOINT
app.get("/api/v1/personas", async (req, res) => {
    try {
        let personas = await Persona.getAll();
        res.send({ code: 200, data: personas, message: "OK" });
    } catch (error) {
        res.status(500).send({ code: 500, message: error });
    }
});

app.post("/api/v1/personas", async (req, res) => {
    try {
        let { nombre, apellido, email } = req.body;
        let nuevaPersona = new Persona({ nombre, apellido, email });
        let resultado = await nuevaPersona.addPersona();
        res.status(201).send({ code: 201, message: resultado });
    } catch (error) {
        res.status(500).send({ code: 500, message: error });
    }
});


//PUT
app.put("/api/v1/personas/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let { nombre, apellido, email } = req.body;
        //terminar código

    } catch (error) {
        res.status(500).send({ code: 500, message: error });
    }
});



//DELETE

app.delete("/api/v1/personas/:id", async (req, res) => {
    try {
        let id = req.params.id;
        //terminar código
        
    } catch (error) {
        res.status(500).send({ code: 500, message: error });
    }
});



