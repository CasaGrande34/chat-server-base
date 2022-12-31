const mongoose = require('mongoose');

const dbConnection = async() => {
    
    try {
          
      await mongoose.connect(process.env.DB_CNN);
      //!Advertencia en consola sobre strictQuery para mongoose 7
      mongoose.set('strictQuery', false);
      console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw Error('Error de base de datos');
    }
    
}

module.exports = {
    
    dbConnection
};