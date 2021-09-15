const axios = require('axios').default;

const tvSeriesAPI = axios.create({
  baseURL: 'http://tvseries:4002',
});

module.exports = tvSeriesAPI;
