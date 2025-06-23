import sequelize from './database.js';

const initDB = async () => {
    try{
        await sequelize.authenticate()
        console.log('Se sincronizó a la base de datos con éxito');
        await sequelize.sync({
            force: true
        })
    }catch (err){
        console.error('Error al sincronizar con la base de datos', err);
        throw err;
    }
}

export default initDB;