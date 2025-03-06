const express = require('express');
const jwt = require('jsonwebtoken');
const Administrador = require('../models/Administrador');
const router = express.Router();
/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Iniciar sesión como administrador
 *     description: Autentica a un administrador y devuelve un token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Usuario o contraseña incorrectos
 */
// Ruta de login para administradores
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('🔹 Intentando iniciar sesión con:', username);

  const admin = await Administrador.findOne({ username });
  if (!admin) {
    console.log('❌ Usuario no encontrado');
    return res.status(401).json({ message: 'Administrador no encontrado' });
  }

  console.log('🔹 Contraseña ingresada:', password);
  console.log('🔹 Contraseña almacenada:', admin.password);

  const match = await admin.matchPassword(password);
  console.log('🔹 Resultado de comparación:', match);

  if (!match) {
    console.log('❌ Contraseña incorrecta');
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  console.log('✅ Inicio de sesión exitoso');
  res.json({ token });
});

module.exports = router;
