const Model = require('../models/Tvs');

class Controller {
  static serverErr = {
    message: 'Internal server error',
  };

  static async getTvs(req, res) {
    try {
      const data = await Model.getAll();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(Controller.serverErr);
    }
  }

  static async getTv(req, res) {
    try {
      const { id } = req.params;
      const data = await Model.get(id);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(Controller.serverErr);
    }
  }

  static async createTv(req, res) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body;
      const payload = {
        title,
        overview,
        poster_path,
        popularity,
        tags,
      };

      const data = await Model.create(payload);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json(Controller.serverErr);
    }
  }

  static async updateTv(req, res) {
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

      const data = await Model.update(id, payload);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(Controller.serverErr);
    }
  }

  static async deleteTv(req, res) {
    try {
      const { id } = req.params;
      const data = await Model.delete(id);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(Controller.serverErr);
    }
  }
}

module.exports = Controller;
