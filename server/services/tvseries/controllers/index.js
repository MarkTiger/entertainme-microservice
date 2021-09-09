const Model = require('../models');

class Controller {
  static serverErr = {
    message: 'Internal server error',
  };

  static async getTvs(req, res, next) {
    try {
      const data = await Model.getAll();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getTv(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Model.get(id);

      if (data) {
        res.status(200).json(data);
      } else {
        const error = new Error();
        error.name = 'Not Found';
        error.message = `TV Series with id ${id} is not found`;

        throw error;
      }
    } catch (err) {
      next(err);
    }
  }

  static async createTv(req, res, next) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body;

      const tagList = tags.split(',').map((tag) => tag.trim());

      const payload = {
        title,
        overview,
        poster_path,
        popularity,
        tags: tagList,
      };

      const data = await Model.create(payload);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async updateTv(req, res, next) {
    try {
      const { id } = req.params;
      const { title, overview, poster_path, popularity, tags } = req.body;
      const tagList = tags.split(',').map((tag) => tag.trim());

      const payload = {
        title,
        overview,
        poster_path,
        popularity,
        tags: tagList,
      };

      const data = await Model.update(id, payload);
      if (data.modifiedCount) {
        res.status(200).json(data);
      } else if (data.matchedCount) {
        const error = new Error();
        error.name = 'Not Modified';
        error.message = `Nothing changed from Tv Series with id ${id}`;

        throw error;
      } else {
        const error = new Error();
        error.name = 'Not Found';
        error.message = `TV Series with id ${id} is not found`;

        throw error;
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteTv(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Model.delete(id);

      if (data.deletedCount) {
        res.status(200).json(data);
      } else {
        const error = new Error();
        error.name = 'Not Found';
        error.message = `TV Series with id ${id} is not found`;

        throw error;
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
