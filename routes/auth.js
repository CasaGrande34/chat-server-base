/* 
Path de controller: /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');

//?controllers
const { login, reviewToken } = require('../controllers/login');
const { crearUsuario } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarToken } = require('../middlewares/validar-jwt');

const router = Router();

//posteo
router.post('/new', [
    //!Middlewares con funciones!!
  check('nombre', 'El nombre es requerido').not().isEmpty(),
  check('password', 'El password es requerido').not().isEmpty(),
  check('email', 'El email es requerido').isEmail(),
  validarCampos
],crearUsuario);
/* 
Cuando yo llame a esa ruta desde el post tengo que asegurarme que venga el email y el password.

*/
router.post('/', [
  check('email', 'El email es requerido').isEmail(),
  check('password', 'El password es requerido').not().isEmpty(),
  // validarCampos
],login)

router.get( '/review', validarToken , reviewToken );

module.exports = router;