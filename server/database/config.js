const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log('Error al conectar a la base de datos', error);
        throw new Error('Error al conectar a la base de datos');
    }
};

module.exports = {
    dbConnection,
};
