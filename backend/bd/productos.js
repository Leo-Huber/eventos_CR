const sql = require('mssql');
const express = require('express');
const router = express.Router();
require('dotenv').config();

//conexión a la base de datos
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// Obtener todos los productos
router.get('/productos', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM [dbo].[ficha.producto]');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener un producto por ID
router.get('/productos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM [dbo].[ficha.producto] WHERE ID = @id');
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear un nuevo producto
router.post('/productos', async (req, res) => {
    const { cod_producto, producto, precio } = req.body;
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('cod_producto', sql.NVarChar, cod_producto)
            .input('producto', sql.NVarChar, producto)
            .input('precio', sql.Decimal(18, 2), precio)
            .input('stock', sql.Int, 0)
            .query('INSERT INTO [dbo].[ficha.producto] (cod_producto, producto, precio, stock) OUTPUT INSERTED.* VALUES (@cod_producto, @producto, @precio, @stock)');
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar un producto por Codigo
router.put('/productos/:cod_producto', async (req, res) => {
    const { cod_producto } = req.params;
    const { producto, precio, stock } = req.body;

    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('cod_producto', sql.NVarChar, cod_producto)
            .input('producto', sql.NVarChar, producto)
            .input('precio', sql.Decimal(18, 2), precio)
            .input('stock', sql.Int, stock)
            .query(`
        UPDATE [dbo].[ficha.producto]
        SET producto = @producto, precio = @precio, stock = @stock
        WHERE cod_producto = @cod_producto;

        SELECT * FROM [dbo].[ficha.producto] WHERE cod_producto = @cod_producto;
      `);

        if (!result.recordset || result.recordset.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//Editar stock de un producto por Codigo
router.patch('/productos/:cod_producto', async (req, res) => {
    const { cod_producto } = req.params;
    const { producto = null, precio = null, stock = null } = req.body;

    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('cod_producto', sql.NVarChar, cod_producto)
            .input('producto', sql.NVarChar, producto)
            .input('precio', sql.Decimal(18, 2), precio)
            .input('stock', sql.Int, stock)
            .query(`
        UPDATE [dbo].[ficha.producto]
        SET
          producto = COALESCE(@producto, producto),
          precio   = COALESCE(@precio, precio),
          stock    = COALESCE(@stock, stock)
        WHERE cod_producto = @cod_producto;

        SELECT * FROM [dbo].[ficha.producto] WHERE cod_producto = @cod_producto;
      `);

        if (!result.recordset || result.recordset.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Eliminar un producto por ID
router.delete('/productos/:cod_producto', async (req, res) => {
    const { cod_producto } = req.params;

    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('cod_producto', sql.NVarChar, cod_producto)
            .query(`
        DELETE FROM [dbo].[ficha.producto] WHERE cod_producto = @cod_producto;
        SELECT @@ROWCOUNT AS affectedRows;
      `);

        const affected = result.recordset?.[0]?.affectedRows || 0;
        if (affected === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado', cod_producto });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;