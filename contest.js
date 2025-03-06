const mongoose = require('mongoose');

const uri = 'mongodb+srv://hivertapiad:recontrafacil@hivertapiad.dyjdpmu.mongodb.net/?retryWrites=true&w=majority&appName=hivertapiad&tls=true&tlsAllowInvalidCertificates=true';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error de conexión:', err));
