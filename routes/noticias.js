const express = require('express');
const { protectAdmin } = require('../middleware/authMiddleware'); // Importamos el middleware
const Noticia = require('../models/Noticia');
const router = express.Router();
/**
 * @swagger
 * /api/noticias:
 *   get:
 *     summary: Obtener todas las noticias
 *     description: Devuelve una lista de todas las noticias publicadas.
 *     responses:
 *       200:
 *         description: Lista de noticias obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   titulo:
 *                     type: string
 *                   descripcion:
 *                     type: string
 */
// Obtener todas las noticias
router.get('/', async (req, res) => {
  try {
    const noticias = await Noticia.find();
    res.json(noticias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/**
 * @swagger
 * /api/noticias:
 *   post:
 *     summary: Crear una nueva noticia
 *     description: Agrega una nueva noticia a la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Noticia creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
// Crear una nueva noticia
router.post('/', protectAdmin, async (req, res) => {
  const { titulo, descripcion } = req.body;

  const nuevaNoticia = new Noticia({ titulo, descripcion });

  try {
    const noticiaGuardada = await nuevaNoticia.save();
    res.status(201).json(noticiaGuardada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Editar una noticia
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const noticia = await Noticia.findById(req.params.id);
    if (!noticia) {
      return res.status(404).json({ message: 'Noticia no encontrada' });
    }

    noticia.titulo = req.body.titulo || noticia.titulo;
    noticia.descripcion = req.body.descripcion || noticia.descripcion;

    const noticiaActualizada = await noticia.save();
    res.json(noticiaActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar una noticia
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const noticia = await Noticia.findById(req.params.id);
    if (!noticia) {
      return res.status(404).json({ message: 'Noticia no encontrada' });
    }

    await noticia.remove();
    res.json({ message: 'Noticia eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;