const jwt = require('jsonwebtoken');

const protectAdmin = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No autorizado, token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificamos el token con la clave secreta
    req.admin = decoded; // Guardamos la información del administrador en la solicitud
    if (req.admin.role !== 'admin') {
      return res.status(403).json({ message: 'No tienes permisos para acceder a esta ruta' });
    }
    next(); // Si todo está bien, pasamos a la siguiente función (la ruta).
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido' });
  }
};

module.exports = { protectAdmin };
