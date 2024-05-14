const express = require('express');
const router = express.Router();
const getWeatherData = require('../util/open-weather-util');

router.get('/', async (req, res) => {
    let { city, state, country, units } = req.query;
    console.log("Received request for weather data: ", city, state, country, units);
    try {
        const data = await getWeatherData(city, state, country, units);
        res.json(data);
    } catch (error) {
        console.error("Error getting weather data: ", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;