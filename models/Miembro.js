const mongoose = require('mongoose');

const miembroSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  juntaVecinal: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telefono: {
    type: String,
  },
  fechaInscripcion: {
    type: Date,
    default: Date.now,
  },
});

const Miembro = mongoose.model('Miembro', miembroSchema);

module.exports = Miembro;
