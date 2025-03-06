const mongoose = require('mongoose');
const argon2 = require('argon2');

const administradorSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
});

// Hash de contraseña antes de guardar
administradorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await argon2.hash(this.password);
  console.log("muy "+this.password)
  next();
});

// Método para comparar contraseñas
administradorSchema.methods.matchPassword = async function (enteredPassword) {
  console.log('🔹 Ingresando a matchPassword');
  console.log('🔹 Contraseña ingresada:', enteredPassword);
  console.log('🔹 Contraseña almacenada:', this.password);
  
  const result = await argon2.verify(this.password, enteredPassword);
  console.log('🔹 Resultado de comparación:', result);
  
  return result;
};


const Administrador = mongoose.model('Administrador', administradorSchema);
module.exports = Administrador;
