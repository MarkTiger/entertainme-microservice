const tvSeriesAPI = require('../apis/tvSeriesAPI');
const redis = require('../config/redis');

class Controller {
  static async getTvs(req, res, next) {
    try {
      const allTvCache = await redis.get('allTv');
      const parsedCache = JSON.parse(allTvCache);

      if (allTvCache) {
        res.status(200).json(parsedCache);
      } else {
        const { data } = await tvSeriesAPI.get('/');
        const dataString = JSON.stringify(data);
        redis.set('allTv', dataString);
        res.status(200).json(data);
      }
    } catch (err) {
      next(err);
    }
  }

  static async getTv(req, res, next) {
    try {
      const { id } = req.params;
      const oneTvCache = await redis.get('oneTv');
      const oneTvId = await redis.get('tvId');
      const parsedCache = JSON.parse(oneTvCache);

      if (id === oneTvId && oneTvCache) {
        res.status(200).json(parsedCache);
      } else {
        const { data } = await tvSeriesAPI.get(`/${id}`);
        const dataString = JSON.stringify(data);
        redis.set('tvId', id);
        redis.set('oneTv', dataString);
        res.status(200).json(data);
      }
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
      redis.del(['allData', 'allTv']);
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
      redis.del(['allData', 'allTv', 'tvId', 'oneTv']);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async deleteTv(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await tvSeriesAPI.delete(`/${id}`);
      redis.del(['allData', 'allTv', 'tvId', 'oneTv']);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
