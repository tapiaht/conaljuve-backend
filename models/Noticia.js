const mongoose = require('mongoose');

const noticiaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Noticia = mongoose.model('Noticia', noticiaSchema);

module.exports = Noticia;
