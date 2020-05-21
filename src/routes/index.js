const { Router } = require('express');
const controller = require('../controller/controller')

const router = Router();


// Rutas

// Home Recupera todos los productos
router.get('/', controller.getAllData);

// Agregar Producto
router.post('/addProduct', controller.addProduct);

// Eliminar Producto
router.get('/delete/:id' , controller.deleteProduct);

// Editar Producto
router.get('/update/:id',controller.editProduct);

router.post('/update/:id',controller.updateProduct);

module.exports = router;

