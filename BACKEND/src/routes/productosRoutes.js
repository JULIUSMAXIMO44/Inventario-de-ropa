const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");

router.get("/", productosController.obtenerProductos);
router.post("/", productosController.agregarProductos);
router.put("/:id", productosController.actualizarProductos);
router.delete("/:id", productosController.eliminarProductos);

module.exports = router;
