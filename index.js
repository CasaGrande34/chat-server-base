const express = require('express');
const path = require('path');
require('dotenv').config();

//DB Config
// const { dbConnection } = require('../config');
// dbConnection();
require('./database/config').dbConnection();


const app = express();
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');    

const publicPath = path.resolve( __dirname, "public" )
app.use( express.static( publicPath ) );



server.listen( process.env.PORT, (error) => {
    
    if(error) throw Error(error);
    console.log( 'Servidor corriendo en puerto', process.env.PORT );
});



