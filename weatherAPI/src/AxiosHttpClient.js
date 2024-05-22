const axios = require('axios');
const HttpClient = require('./HttpClient');

class AxiosHttpClient extends HttpClient {
    async get(url, params){
        try{
            const response = await axios.get(url, {params});
            return response.data;
        } catch (error) {
            throw new Error(error.response ? error.response.data.message : error.message)
        }
    }
}

module.exports = AxiosHttpClient;

