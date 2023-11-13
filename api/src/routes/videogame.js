const { Router } = require('express');
require('dotenv').config();
const axios = require('axios');
const { Videogame } = require('../db');
const { API_KEY } = process.env;


const router = Router();

router.get ('/:name', async (req, res) => {
    console.log('ok');
    const { name } = req.params;
   try {
    const nameResult = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`);
        var getName = nameResult.data.results.map((p) => {
            var Name = {
                id: p.id,
                name: p.name,
                descripcion: p.description_raw,
                lanzamiento: p.released,
                rating: p.rating,
                plataformas: p.platforms && p.platforms.map((x) => x.platform.name).filter(x => x !=null).join(','),
                origin: 'API'
            };
            return Name;
        })
        //buscar por nombre en la base de datos
        var dbNames = [];
        dbNames = await Videogame.findAll({name});
        var nameDb = dbNames.map((r) => {
        var Names = {
            id: r.id,
            name: r.name,
            descripcion: r.description,
            lanzamiento: r.released,
            rating: r.rating,
            plataformas: r.platforms,
            origin: 'Base de Datos'
        };
        return Names;
    })
    const fullNames = [...getName, ...nameDb]
    res.status(200).json(fullNames);
   } catch (error) {
    res.status(400).send(error);
   }
});


module.exports = router;