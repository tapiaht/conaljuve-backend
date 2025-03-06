const express = require('express');
const { protectAdmin } = require('../middleware/authMiddleware'); // Importamos el middleware
const Miembro = require('../models/Miembro');
const router = express.Router();
/**
 * @swagger
 * /api/miembros:
 *   get:
 *     summary: Obtener todos los miembros
 *     description: Devuelve una lista de todos los miembros registrados.
 *     responses:
 *       200:
 *         description: Lista de miembros obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   email:
 *                     type: string
 *                   juntaVecinal:
 *                     type: string
 */
// Obtener todos los miembros
router.get('/', protectAdmin, async (req, res) => {
  try {
    const miembros = await Miembro.find();
    res.json(miembros);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar un miembro
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const miembro = await Miembro.findById(req.params.id);
    if (!miembro) {
      return res.status(404).json({ message: 'Miembro no encontrado' });
    }

    await miembro.remove();
    res.json({ message: 'Miembro eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
