const axios = require('axios').default;

const moviesAPI = axios.create({
  baseURL: 'http://172.31.27.160',
});

module.exports = moviesAPI;
