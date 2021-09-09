const moviesAPI = require('../apis/moviesAPI');

class Controller {
  static async getMovies(req, res, next) {
    try {
      const { data } = await moviesAPI.get('/');
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getMovie(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await moviesAPI.get(`/${id}`);
      res.status(200).json(data);
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
      const { data } = await moviesAPI.post('/', payload);
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
      const { data } = await moviesAPI.put(`/${id}`, payload);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await moviesAPI.delete(`/${id}`);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
