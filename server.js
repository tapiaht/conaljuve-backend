// Importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const adminRoutes = require('./routes/admin'); // Importa las rutas de administrador
const noticiaRoutes = require('./routes/noticias');
const miembroRoutes = require('./routes/miembros');

dotenv.config();
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de CONALJUVE",
      version: "1.0.0",
      description: "Documentación de la API de CONALJUVE",
    },
    servers: [
      {
        url: "http://localhost:5000", // Cambiar según el entorno
      },
    ],
  },
  apis: ["./routes/*.js"], // Documentará todos los archivos de rutas
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

console.log("📄 Documentación de API disponible en http://localhost:5000/api-docs");

// Configuración de middleware
app.use(cors());
app.use(express.json()); // Para parsear el cuerpo de las solicitudes

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Conectado a MongoDB')).catch(err => console.log(err));

// Rutas
app.use('/api/admin', adminRoutes); // Rutas de administración
app.use('/api/noticias', noticiaRoutes); // Rutas de noticias
app.use('/api/miembros', miembroRoutes); // Rutas de miembros

// Levantar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

