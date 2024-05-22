const AxiosHttpClient = require("./AxiosHttpClient");
const WeatherService = require("./WeatherService");

const httpClient = new AxiosHttpClient();
const apiKey = "D1BilK1FOMT4wjbrqW2GhwENlb6SOocL";
const weatherService = new WeatherService(httpClient, apiKey);

async function main() {
  const lat = 42.3478;
  const lon = -71.0466;
  try {
    const weather = await weatherService.getCurrentWeather(lat, lon);
    console.log(`Current weather at (${lat}, ${lon}):`, weather);
  } catch (error) {
    console.error(error.message);
  }
}

main();
