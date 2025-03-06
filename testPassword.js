const argon2 = require('argon2');
const mongoose = require('mongoose');
const Administrador = require('./models/Administrador');
require('dotenv').config();

async function testPassword() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const admin = await Administrador.findOne({ username: 'admin' });

  if (!admin) {
    console.log('❌ Usuario administrador no encontrado');
    return;
  }

  const enteredPassword = 'admin123'; // Usa la misma contraseña que creaste en createAdmin.js
  const match = await argon2.verify(admin.password, enteredPassword);

  console.log('🔹 Contraseña ingresada:', enteredPassword);
  console.log('🔹 Contraseña almacenada:', admin.password);
  console.log('🔹 Comparación manual:', match);

  mongoose.connection.close();
}

testPassword();
