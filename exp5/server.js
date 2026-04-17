const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// AccuWeather API key
const ACCUWEATHER_API_KEY = "";
const BASE_URL = "https://dataservice.accuweather.com";

// Route to search for a city
app.get('/api/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: "City name is required" });
        }

        const response = await axios.get(`${BASE_URL}/locations/v1/search`, {
            params: { q },
            headers: { Authorization: `Bearer ${ACCUWEATHER_API_KEY}` }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Search error:", error.message);
        res.status(500).json({ error: "Failed to search city" });
    }
});

// Route to get current weather
app.get('/api/weather/:locationKey', async (req, res) => {
    try {
        const { locationKey } = req.params;
        
        const response = await axios.get(`${BASE_URL}/currentconditions/v1/${locationKey}`, {
            params: { details: true },
            headers: { Authorization: `Bearer ${ACCUWEATHER_API_KEY}` }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Weather error:", error.message);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log("Open http://localhost:3000 in your browser");
});
