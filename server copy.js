// Importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Crear la app de Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear el cuerpo de las peticiones en formato JSON

// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    process.exit(1); // Termina el proceso si no puede conectarse
  }
};

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.send('API de CONALJUVE en funcionamiento');
});

// Endpoint de noticias
const noticiasRoute = require('./routes/noticias');
app.use('/api/noticias', noticiasRoute);

// Endpoint de miembros
const miembrosRoute = require('./routes/miembros');
app.use('/api/miembros', miembrosRoute);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  connectDB();
});
