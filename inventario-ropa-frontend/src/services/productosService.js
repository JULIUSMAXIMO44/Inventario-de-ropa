import axios from "axios";

const API_URL = "http://localhost:5000/productos";

export const obtenerProductos = async () => {
  const respuesta = await axios.get(API_URL);
  return respuesta.data;
};

export const agregarProducto = async (producto) => {
  const respuesta = await axios.post(API_URL, producto);
  return respuesta.data;
};

export const actualizarProducto = async (id, producto) => {
  const respuesta = await axios.put(`${API_URL}/${id}`, producto);
  return respuesta.data;
};

export const eliminarProducto = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
