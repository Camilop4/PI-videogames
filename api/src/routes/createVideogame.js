const { Router } = require('express');
require('dotenv').config();
const axios = require('axios');
const { Videogame } = require('../db');
const { API_KEY } = process.env;


const router = Router();

router.post ('/', async (req, res) => {
    console.log('yeah!');
   try {
     const { name, description, released, rating, platforms, genre} = req.body;
     //platforms = platforms.toString();
     Videogame.create({ name, description, released, rating, platforms, genre});
     res.status(200).send('Creado con exito');
   } catch (error) {
    res.status(400).send({ error: error.message });
   }
});


module.exports = router;