const moviesAPI = require('../apis/moviesAPI');
const tvSeriesAPI = require('../apis/tvSeriesAPI');

class Controller {
  static async getAll(req, res, next) {
    try {
      const { data: movies } = await moviesAPI.get('/');
      const { data: tvSeries } = await tvSeriesAPI.get('/');
      const response = {
        movies,
        tvSeries,
      };
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
