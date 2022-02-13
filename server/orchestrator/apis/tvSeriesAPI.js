const axios = require('axios').default;

const tvSeriesAPI = axios.create({
  baseURL: 'http://172.31.16.246',
});

module.exports = tvSeriesAPI;
