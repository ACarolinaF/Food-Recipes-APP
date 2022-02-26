const { Router } = require('express');
const router = Router();


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipes_routes = require ('./recipes');



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipes_routes);

router.get('/prueba', (req, res, next)=>{
    res.send('router de prueba')
})


module.exports = router;
