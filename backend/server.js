const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mssql = require('mssql'); 
const productosRouter = require('./bd/productos.js');
require('dotenv').config();

const app = express();
const port = 3001;

// Configuración de conexión para SQL Server
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

// Probar conexión al iniciar el servidor
mssql.connect(dbConfig, err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos SQL.');
});

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());
app.use(productosRouter); 

// Ejemplo de ruta para probar conexión
app.get('/api/ping', async (req, res) => {
  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool.request().query('SELECT 1 as ok');
    res.json({ conectado: true, resultado: result.recordset });
  } catch (err) {
    res.status(500).json({ conectado: false, error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});