const tvSeriesAPI = require('../apis/tvSeriesAPI');

class Controller {
  static async getTvs(req, res, next) {
    try {
      const { data } = await tvSeriesAPI.get('/');
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getTv(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await tvSeriesAPI.get(`/${id}`);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async createTv(req, res, next) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body;
      const payload = {
        title,
        overview,
        poster_path,
        popularity,
        tags,
      };
      const { data } = await tvSeriesAPI.post('/', payload);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async updateTv(req, res, next) {
    try {
      const { id } = req.params;
      const { title, overview, poster_path, popularity, tags } = req.body;
      const payload = {
        title,
        overview,
        poster_path,
        popularity,
        tags,
      };
      const { data } = await tvSeriesAPI.put(`/${id}`, payload);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async deleteTv(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await tvSeriesAPI.delete(`/${id}`);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
