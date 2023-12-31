const { Router } = require('express');
require('dotenv').config();
const axios = require('axios');
const { Videogame } = require('../db');
const { API_KEY } = process.env;


const router = Router();

router.get ('/:id', async (req, res) => {
    console.log('yes');
    const { id } = req.params;
   try {
    if (id.includes("-")) {
        const gameDB = await Videogame.findOne({ where: {id},
            include: {model: Genre, attributes: ['name'],
            through: {attributes: []}}})
            let X = gameDB
            const information = {
                id: X.id,
                name: X.name,
                image: X.image,
                rating: X.rating,
                description: X.description,
                released: X.released,
                platforms: X.platforms,
                createdAt: X.createdAt,
                updateAt: X.updatedAt,
                genres: X.genres.map(p => p.name).join(', ')
            }
            return res.json(information)
    } else {
        const gameAPI = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
                
            let X = gameAPI.data;
            const information = {
                name: X.name,
                image: X.background_image,
                genres: X.genres && X.genres.map((p) =>
                    p.name).filter(p => p != null).join(', '),
                description: X.description_raw,
                released: X.released,
                rating: X.rating,
                platforms: X.platforms && X.platforms.map((p) =>
                    p.platform.name).filter(p => p != null).join(', ')
            }
            return res.json(information)
    }
   } catch (error) {
    res.status(404).json({ error: "ID not found" })
   }
});


module.exports = router;