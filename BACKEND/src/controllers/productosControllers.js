let productos = [
  { id: 1, nombre: "Camisa", stock: 10, precio: 20000, categoria: "Ropa" },
  { id: 2, nombre: "Pantalón", stock: 10, precio: 35000, categoria: "Ropa" },
  { id: 3, nombre: "Zapatos", stock: 10, precio: 50000, categoria: "Calzado" },
  {
    id: 4,
    nombre: "Bufanda",
    stock: 10,
    precio: 15000,
    categoria: "Accesorios",
  },
  {
    id: 5,
    nombre: "Sombrero",
    stock: 10,
    precio: 18000,
    categoria: "Accesorios",
  },
  {
    id: 6,
    nombre: "Guantes",
    stock: 10,
    precio: 12000,
    categoria: "Accesorios",
  },
  { id: 7, nombre: "Chaqueta", stock: 10, precio: 80000, categoria: "Ropa" },
  { id: 8, nombre: "Vestido", stock: 10, precio: 60000, categoria: "Ropa" },
  {
    id: 9,
    nombre: "Corbata",
    stock: 10,
    precio: 10000,
    categoria: "Accesorios",
  },
];

exports.obtenerProductos = (req, res) => {
  res.json(productos);
};

exports.agregarProducto = (req, res) => {
  const nuevoProducto = { id: Date.now(), ...req.body };
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
};

exports.venderProducto = (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;
  const index = productos.findIndex((p) => p.id == id);
  if (index !== -1) {
    if (productos[index].stock >= cantidad) {
      productos[index].stock -= cantidad;
      res.json(productos[index]);
    } else {
      res.status(400).json({ error: "Stock insuficiente" });
    }
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
};

exports.actualizarProducto = (req, res) => {
  const { id } = req.params;
  const index = productos.findIndex((p) => p.id == id);
  if (index !== -1) {
    productos[index] = { ...productos[index], ...req.body };
    res.json(productos[index]);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
};

exports.eliminarProducto = (req, res) => {
  productos = productos.filter((p) => p.id != req.params.id);
  res.status(204).send();
};
