const WeatherService = require('../src/WeatherService');
const HttpClient = require('../src/HttpClient');

class MockHttpClient extends HttpClient {
  async get(url, params) {
    return {
      timelines: {
        minutely: [
          {
            time: '2024-05-22T19:46:00Z',
            values: {
              temperature: 29.88
            }
          }
        ]
      }
    };
  }
}

test('WeatherService returns correct temperature', async () => {
  const httpClient = new MockHttpClient();
  const apiKey = 'dummy_api_key';
  const weatherService = new WeatherService(httpClient, apiKey);

  const weather = await weatherService.getCurrentWeather(42.3478, -71.0466);

  expect(weather).toEqual({
    temperature: 29.88
  });
});
