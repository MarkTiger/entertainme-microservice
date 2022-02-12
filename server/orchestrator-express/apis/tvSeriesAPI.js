const axios = require('axios').default;

const tvSeriesAPI = axios.create({
  baseURL: 'http://localhost:4002',
});

module.exports = tvSeriesAPI;
