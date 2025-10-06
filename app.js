require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null });
});

app.post('/', async (req, res) => {
    const city = req.body.city;

    if(!city) {
        return res.render('index', { weather: null, error: 'Please enter a city name.'});
    }

    try {
        const apiKey = process.env.API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

        const response = await axios.get(url);
        const data = response.data;

        const weather = {
            city: data.name,
            temp: Math.round(data.main.temp),
            desc: data.weather[0].description
        };
        
        res.render('index', { weather, error: null });
    } catch (err) {
        console.error(err.message || err);
        res.render('index', { weather: null, error: 'Could not get the weather for this location.'});
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});