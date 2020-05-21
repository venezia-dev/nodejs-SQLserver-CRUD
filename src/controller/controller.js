const { sql, poolPromise } = require('../database/db')
const fs = require('fs');
var rawdata = fs.readFileSync('src/query/queries.json');
var queries = JSON.parse(rawdata);

class MainController {
  // Get all products - Obtener todos los productos
  async getProducts(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request()
        .query(queries.getAllData);
      const products = result.recordset;
      res.render('index', { products: products });
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  // Add new producto - Agregar nuevo producto
  async addProduct(req, res) {
    try {
      if (req.body.brand != null && req.body.model != null) {
        const pool = await poolPromise
        const result = await pool.request()
          .input('brand', sql.VarChar, req.body.brand)
          .input('model', sql.VarChar, req.body.model)
          .input('category', sql.VarChar, req.body.category)
          .input('price', sql.VarChar, req.body.price)
          .query(queries.addProduct)
        res.redirect('/');
      } else {
        res.send('Completar todos los datos!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  // Edit product - Editar producto
  async editProduct(req, res){
    const { id } = req.params;
    try {
      if (id !== null){
        const pool = await poolPromise
        const result = await pool.request()
          .input('id', sql.VarChar, id)
          .query(queries.getProduct);
        const product = result.recordset;
        res.render('edit-product', { product: product[0] });
      } else {
        res.send('Producto no encontrado')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  // Update Product - actualizar Producto
  async updateProduct(req, res) {
    const { id } = req.params;
    try {
      if (req.body.brand != null && req.body.model != null) {
        const pool = await poolPromise
        const result = await pool.request()
          .input('id', sql.VarChar, id)
          .input('brand', sql.VarChar, req.body.brand)
          .input('model', sql.VarChar, req.body.model)
          .input('category', sql.VarChar, req.body.category)
          .input('price', sql.VarChar, req.body.price)
          .query(queries.updateProduct)
          res.redirect('/');
        } else {
        res.send('Completar el formulario')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  // Delete Product - Eliminar Producto
  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      if (id != null) {
        const pool = await poolPromise
        await pool.request()
          .input('id', sql.VarChar, id)
          .query(queries.deleteProduct)
        res.redirect('/');
      } else {
        res.send('Error al eliminar')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
}

const controller = new MainController()
module.exports = controller;