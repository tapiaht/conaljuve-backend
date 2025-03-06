const mongoose = require('mongoose');
const argon2 = require('argon2');
const User = require('./models/Administrador');
require('dotenv').config();

async function createAdmin() {
  try {
    // Conectar a la base de datos
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('📌 Conectado a MongoDB');

    // Verificar si ya existe un admin
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('⚠️ El usuario administrador ya existe');
      mongoose.connection.close();
      return;
    }

    // Hashear la contraseña con Argon2
    const hashedPassword = await argon2.hash('admin123');

    // Crear usuario admin
    const adminUser = new User({
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();
    console.log('✅ Usuario administrador creado con éxito');

    // Cerrar conexión
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error al crear el usuario administrador:', error);
    mongoose.connection.close();
  }
}

createAdmin();
