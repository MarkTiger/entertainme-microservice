const moviesAPI = require('../apis/moviesAPI');
const tvSeriesAPI = require('../apis/tvSeriesAPI');

const redis = require('../config/redis');

class Controller {
  static async getAll(req, res, next) {
    try {
      const allDataCache = await redis.get('allData');
      const parsedCache = JSON.parse(allDataCache);

      if (allDataCache) {
        res.status(200).json(parsedCache);
      } else {
        const { data: movies } = await moviesAPI.get('/');
        const { data: tvSeries } = await tvSeriesAPI.get('/');
        const response = {
          movies,
          tvSeries,
        };
        const responseString = JSON.stringify(response);
        redis.set('allData', responseString);
        res.status(200).json(response);
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
