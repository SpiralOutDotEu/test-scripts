const express = require('express');
const AxiosHttpClient = require('./AxiosHttpClient');
const WeatherService = require('./WeatherService');

const app = express();
const port = 3000;

const httpClient = new AxiosHttpClient();
const apiKey = 'D1BilK1FOMT4wjbrqW2GhwENlb6SOocL';
const weatherService = new WeatherService(httpClient, apiKey);

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).send({ error: 'Latitude and longitude are required' });
  }

  try {
    const weather = await weatherService.getCurrentWeather(lat, lon);
    res.send(weather);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Weather service listening at http://localhost:${port}`);
});
