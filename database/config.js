const mongoose = require('mongoose');

const dbConnection = async() => {
    
    try {
        
        
        console.log('Init DB config');
    } catch (error) {
        console.log(error);
        throw Error('Error de base de datos');
    }
    
}

module.exports = {
    
    dbConnection
};