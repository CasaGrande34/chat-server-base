const { application } = require('express');
const express = require('express');
const path = require('path');
require('dotenv').config();

//?DB Confiuration --------------------------------
//? const { dbConnection } = require('../config');
//? dbConnection();
require('./database/config').dbConnection();

// ==========================================
//?Creamos el uso de express
const app = express();
/* 
La función express.json() es una función de middleware integrada en Express. Analiza las solicitudes entrantes con cargas JSON y se basa en body-parser .
*/
//lectura y parseo del body.
app.use( express.json() );


const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');    

const publicPath = path.resolve( __dirname, "/public" )
app.use( express.static( publicPath ) );
//Otro exmaple
/* 
app.use('/static', express.static(__dirname + '/public'));
*/

//? MIS ROUTES - MIDDLEWARE
app.use('/api/login', require('./routes/auth') );

server.listen( process.env.PORT, (error) => {
    
    if(error) throw Error(error);
    console.log( 'Servidor corriendo en puerto', process.env.PORT );
});



