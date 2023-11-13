const { Router } = require('express');
require('dotenv').config();
const axios = require('axios');
const { Videogame } = require('../db');
const { API_KEY } = process.env;


const router = Router();

// ruta principal trae los primeros 100 juegos.
router.get ('/', async (req, res) => {
    console.log('si');
   try {
    const apiGames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=10`);
        var getGame = apiGames.data.results.map((p) => {
            var game = {
                id: p.id,
                name: p.name,
                descripcion: p.description_raw,
                lanzamiento: p.released,
                rating: p.rating,
                plataformas: p.platforms && p.platforms.map((x) => x.platform.name).filter(x => x !=null).join(','),
                origin: 'API'
            };
            return game;
        })
        //solicitar la informacion en la base de datos
        var dbGames = [];
        dbGames = await Videogame.findAll();
        var gameDb = dbGames.map((r) => {
        var games = {
            id: r.id,
            name: r.name,
            descripcion: r.description,
            lanzamiento: r.released,
            rating: r.rating,
            plataformas: r.platforms,
            origin: 'Base de Datos'
        };
        return games;
    })
     const fullGames = [...getGame, ...gameDb]
     res.status(200).json(fullGames);
   } catch (error) {
    res.status(400).send(error);
   }
});


module.exports = router;