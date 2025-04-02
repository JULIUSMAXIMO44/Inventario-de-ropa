const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let productos = []; // Almacenamiento en memoria

// Ruta para obtener todos los productos
app.get("/productos", (req, res) => {
  res.json(productos);
});

// Ruta para agregar un producto
app.post("/productos", (req, res) => {
  const nuevoProducto = { id: Date.now(), ...req.body };
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

// Ruta para actualizar un producto
app.put("/productos/:id", (req, res) => {
  const { id } = req.params;
  const index = productos.findIndex((p) => p.id == id);
  if (index !== -1) {
    productos[index] = { ...productos[index], ...req.body };
    res.json(productos[index]);
  } else {
    res.status(404).json({ mensaje: "Producto no encontrado" });
  }
});

// Ruta para eliminar un producto
app.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  productos = productos.filter((p) => p.id != id);
  res.json({ mensaje: "Producto eliminado" });
});

app.listen(5000, () =>
  console.log("Servidor corriendo en http://localhost:5000")
);
