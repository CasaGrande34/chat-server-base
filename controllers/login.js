//dependencies
const { response } = require("express");
const bcrypt = require('bcryptjs');
//file addresses
const Usuario = require('../models/user');
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
    
    //Extraccion de datos del usuario.
    const { email, password } = req.body;
    
    try {
        
        const userDB = await Usuario.findOne({ email });
        if( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Error de credenciales',
            });
        }
        
        //Validar password
        const validatePassword = bcrypt.compareSync( password, userDB.password );
        if( !validatePassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Error de password',
            });
            
        }
        //generar JSON WEB TOKEN
        const token = await generarJWT( userDB.id );
        
        res.json({
            ok: true,
            userDB,
            token
            
        });
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }

}

const reviewToken = async ( req, res = response ) => {
    
    const uid  = req.uid;
    const token = await generarJWT( uid );
    const userNewtoken = await Usuario.findById( uid ); 
    
    res.json({
        
         ok: true,
         userNewtoken,
         token
        
        });
}


module.exports = {
    login, 
    reviewToken
}