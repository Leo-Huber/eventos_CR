// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql'); // cambiar dependiendo de que use sistemas, instalar mysql2 o pg si es postgresql

const app = express();
const port = 3001;

// Conexión a la base de datos sql, segun gente de sistemas cuando esté el ok
const db = mysql.createConnection({
  host: 'http://localhost:3001', 
  user: 'username',
  password: 'password',
  database: 'tu_base_de_datos',
});

db.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos SQL.');
});

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Permite solicitudes desde el frontend de Vite para cambios locales
app.use(bodyParser.json());

// Rutas de la API de banners
app.get('/api/banners', (req, res) => {
  const sql = 'SELECT * FROM banners';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/api/banners', (req, res) => {
  const { title, imageUrl, link } = req.body;

  // Validación del lado del servidor
  if (!title || !imageUrl) {
    return res.status(400).send('El título y la URL de la imagen son requeridos.');
  }

  const sql = 'INSERT INTO banners (title, imageUrl, link) VALUES (?, ?, ?)';
  // Usar sentencias preparadas para prevenir inyecciones SQL
  db.query(sql, [title, imageUrl, link], (err, result) => {
    if (err) throw err;
    res.status(201).send({ id: result.insertId, ...req.body });
  });
});

app.delete('/api/banners/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM banners WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(`Banner con id ${id} eliminado.`);
  });
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
