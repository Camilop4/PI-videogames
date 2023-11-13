const { Router } = require('express');
require('dotenv').config();
const axios = require('axios');
const { Videogame, Genres } = require('../db');
const { API_KEY } = process.env;


const router = Router();

router.get ('/', async (req, res) => {
    console.log('yujuu!');
   try {
    const genresAPI = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        genresAPI.data.results.forEach(p => {
            Genres.findOrCreate({
                where: { name: p.name }
            })
        })
        const genresDB = await Genres.findAll()
        res.json(genresDB)
   } catch (error) {
    res.status(404).send( error )
   }
});


module.exports = router;