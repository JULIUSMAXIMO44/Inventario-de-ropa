import React, { useState } from "react";
import "./index.css";

const productosIniciales = [
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

// Función para formatear moneda
const formatearMoneda = (cantidad) => {
  return cantidad.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
  });
};

const Productos = () => {
  const [productos, setProductos] = useState(productosIniciales);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 5;
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    stock: "",
    precio: "",
    categoria: "",
  });

  // Filtrar productos por búsqueda y categoría
  const productosFiltrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (categoriaFiltro === "" || p.categoria === categoriaFiltro)
  );

  // Paginación
  const totalPaginas = Math.ceil(
    productosFiltrados.length / productosPorPagina
  );
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  const paginaSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  const paginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  // Manejo de formularios para agregar producto
  const manejarCambio = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const agregarProducto = () => {
    if (
      nuevoProducto.nombre &&
      nuevoProducto.stock &&
      nuevoProducto.precio &&
      nuevoProducto.categoria &&
      nuevoProducto.vender
    ) {
      const nuevoId = productos.length + 1;
      setProductos([
        ...productos,
        {
          id: nuevoId,
          ...nuevoProducto,
          stock: Number(nuevoProducto.stock),
          precio: Number(nuevoProducto.precio),
        },
      ]);
      setNuevoProducto({ nombre: "", stock: "", precio: "", categoria: "" });
    }
  };

  const venderProducto = (id, cantidad) => {
    const index = productos.findIndex((p) => p.id === id);
    if (index !== -1) {
      if (productos[index].stock >= cantidad) {
        productos[index].stock -= cantidad;
        setProductos([...productos]);
      }
    } else {
      console.error("Producto no encontrado");
    }
  };
  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  const editarProducto = (id) => {
    const productoEditado = productos.find((p) => p.id === id);
    setNuevoProducto(productoEditado);
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  return (
    <div className="container">
      <h1>Inventario TIENDA DE ROPA</h1>

      {/* Búsqueda y Filtro */}
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          value={categoriaFiltro}
        >
          <option value="">Todas las categorías</option>
          <option value="Ropa">Ropa</option>
          <option value="Calzado">Calzado</option>
          <option value="Accesorios">Accesorios</option>
        </select>
      </div>

      {/* Formulario para Agregar Producto */}
      <div className="form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={nuevoProducto.nombre}
          onChange={manejarCambio}
        />
        <input
          type="text"
          name="stock"
          placeholder="Cantidad existente"
          value={nuevoProducto.stock}
          onChange={manejarCambio}
        />

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={manejarCambio}
        />
        <select
          name="categoria"
          value={nuevoProducto.categoria}
          onChange={manejarCambio}
        >
          <option value="">Seleccione categoría</option>
          <option value="Ropa">Ropa</option>
          <option value="Calzado">Calzado</option>
          <option value="Accesorios">Accesorios</option>
        </select>
        <button onClick={agregarProducto}>Agregar</button>
      </div>

      {/* Tabla */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosActuales.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.stock}</td>
                <td>{formatearMoneda(producto.precio)}</td>
                <td>{producto.categoria}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => editarProducto(producto.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => eliminarProducto(producto.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="pagination">
        <button onClick={paginaAnterior} disabled={paginaActual === 1}>
          ⬅ Anterior
        </button>
        <span>
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={paginaSiguiente}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente ➡
        </button>
      </div>
    </div>
  );
};

export default Productos;
