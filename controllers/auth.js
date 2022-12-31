const { response } = require("express");
const Usuario = require('../models/user');

const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async ( req, res = response ) => {
    //Extraccion de datos del usuario.
    const { email, password } = req.body;
    
    try {
        
        const existEmail = await Usuario.findOne({ email })
        if(existEmail) {
            //!retornamos para que no siga ejecutando el otro codigo
            return res.status(400).json({
               ok: false,
               msg: 'Error Inesperado, error de credencial' 
            });
        }
        const usuario = new Usuario( req.body );
        
        //?Encriptar contrasenia
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password , salt );
        
        
        //?Generar JSONWT
        const token = await generarJWT( usuario.uid );
        //?guardado en la base de datos
        await usuario.save();
        

        res.json({
           ok: true, 
           usuario,
           token
        })
        
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            
           ok: false,
           msg: 'error en el try-catch de conexion'
        });
    }
}

/* 
Escribimos el module.exports = {} entre llaves para poder exportar las funciones por nombbre'

 */
module.exports = {
    
    crearUsuario
}