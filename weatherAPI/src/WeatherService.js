class WeatherService {
    constructor(httpClient, apiKey, baseUrl = 'https://api.tomorrow.io/v4/weather/forecast') {
      this.httpClient = httpClient;
      this.apiKey = apiKey;
      this.baseUrl = baseUrl;
    }
  
    async getCurrentWeather(lat, lon) {
      const params = {
        location: `${lat},${lon}`,
        apikey: this.apiKey
      };
      try {
        const data = await this.httpClient.get(this.baseUrl, params);
        const currentTemperature = data.timelines.minutely[0].values.temperature;
        return { temperature: currentTemperature };
      } catch (error) {
        throw new Error(`Unable to fetch weather data: ${error.message}`);
      }
    }
  }
  
  module.exports = WeatherService;
  