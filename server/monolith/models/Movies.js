const { ObjectId } = require('bson');
const { getDb } = require('../config/mongodb');

class Model {
  static collection = 'movies';

  static getAll() {
    return getDb().collection(Model.collection).find().toArray();
  }

  static get(id) {
    return getDb()
      .collection(Model.collection)
      .findOne({ _id: ObjectId(id) });
  }

  static create(payload) {
    return getDb().collection(Model.collection).insertOne(payload);
  }

  static update(id, payload) {
    return getDb()
      .collection(Model.collection)
      .updateOne({ _id: ObjectId(id) }, { $set: payload });
  }

  static delete(id) {
    return getDb()
      .collection(Model.collection)
      .deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = Model;
