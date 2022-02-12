const axios = require('axios').default;

const moviesAPI = axios.create({
  baseURL: 'http://movie:4001',
});

module.exports = moviesAPI;
