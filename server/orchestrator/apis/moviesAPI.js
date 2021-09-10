const axios = require('axios').default;

const moviesAPI = axios.create({
  baseURL: 'http://localhost:4001',
});

module.exports = moviesAPI;
