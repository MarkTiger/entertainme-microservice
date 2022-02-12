const moviesAPI = require('../apis/moviesAPI');
const redis = require('../config/redis');

class Controller {
  static async getMovies(req, res, next) {
    try {
      const allMoviesCache = await redis.get('allMovie');
      const parsedCache = JSON.parse(allMoviesCache);

      if (allMoviesCache) {
        res.status(200).json(parsedCache);
      } else {
        const { data } = await moviesAPI.get('/');
        const dataString = JSON.stringify(data);
        redis.set('allMovie', dataString);
        res.status(200).json(data);
      }
    } catch (err) {
      next(err);
    }
  }

  static async getMovie(req, res, next) {
    try {
      const { id } = req.params;
      const oneMovieCache = await redis.get('oneMovie');
      const oneMovieId = await redis.get('movieId');
      const parsedCache = JSON.parse(oneMovieCache);

      if (id === oneMovieId && oneMovieCache) {
        res.status(200).json(parsedCache);
      } else {
        const { data } = await moviesAPI.get(`/${id}`);
        const dataString = JSON.stringify(data);
        redis.set('movieId', id);
        redis.set('oneMovie', dataString);
        res.status(200).json(data);
      }
    } catch (err) {
      next(err);
    }
  }

  static async createMovie(req, res, next) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body;
      const payload = {
        title,
        overview,
        poster_path,
        popularity,
        tags,
      };
      const { data } = await moviesAPI.post('/', { payload });
      redis.del('allData', 'allMovie');
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async updateMovie(req, res, next) {
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
      const { data } = await moviesAPI.put(`/${id}`, { payload });
      redis.del('allData', 'allMovie', 'oneMovie', 'movieId');
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await moviesAPI.delete(`/${id}`);
      redis.del('allData', 'allMovie', 'oneMovie', 'movieId');
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
