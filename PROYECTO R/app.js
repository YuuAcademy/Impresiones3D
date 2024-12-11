const express = require("express");
const mysql = require("mysql");

const app = express();

// Middleware
app.use(express.json());

// Habilitar CORS (si tu frontend está en un dominio diferente)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Configuración de la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tu_contraseña",
    database: "ventas",
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
        process.exit(1); // Salir si no se puede conectar
    }
    console.log("Conectado a la base de datos");
});

// Ruta para guardar la venta
app.post("/guardarVenta", (req, res) => {
    const { producto, cantidad, precio } = req.body;

    if (!producto || !cantidad || !precio || cantidad <= 0 || precio <= 0) {
        return res.status(400).send("Datos inválidos. Verifica la información.");
    }

    const query = "INSERT INTO ventas (producto, cantidad, precio) VALUES (?, ?, ?)";
    db.query(query, [producto, cantidad, precio], (err, result) => {
        if (err) {
            console.error("Error al guardar la venta:", err);
            return res.status(500).send("Error al guardar la venta en la base de datos.");
        }
        res.status(200).send("Venta guardada con éxito.");
    });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
