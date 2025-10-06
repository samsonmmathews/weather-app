require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/api/weather', async (req, res) => {
    const city = req.query.city;

    if(!city) {
        return res.render('index', { weather: null, error: 'Please enter a city name.'});
    }

    try {
        const apiKey = process.env.API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

        const response = await axios.get(url);
        const data = response.data;

        res.json({
            city: data.name,
            temp: Math.round(data.main.temp),
            desc: data.weather[0].description
        });
        
    } catch (err) {
        res.json({ error: "Could not get the weather for this location." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});