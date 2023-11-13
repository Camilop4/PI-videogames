const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videoGames = require('./videoGames');
const videogame = require('./videogame');
const idVideogame = require('./idVideogame');
const genres = require('./genres');
const createVideogame = require('./createVideogame');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogame', videoGames); // ruta principal.
router.use('/games', videogame); // buscar por nombre.
router.use('/id', idVideogame); // buscar por id.
router.use('/genres', genres); // buscar por genero.
router.use('/videogames', createVideogame); // crear juego.

module.exports = router;
