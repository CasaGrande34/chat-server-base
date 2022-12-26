const { io } = require( '../index' );


//Mensajes por Sockets
io.on( 'connection', client => {

    console.log( 'Cliente conectado' );
    client.on( 'disconnect', () => {
        console.log( 'Cliente desconectado' );
    });
    
    client.on( 'nuevoMensaje', ( payload ) => {
        console.log( `Llego el payload al server:`, payload );
        io.emit( 'mensaje', payload )
    });
    
});

