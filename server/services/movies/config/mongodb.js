const { MongoClient } = require('mongodb');

const url = `mongodb://${process.env.MONGO_SERVER || 'localhost'}:27017`;
const database = 'entertainme';

const client = new MongoClient(url);

let db;

async function connect() {
  await client.connect();
  console.log(`Connected to database ${database}`);
  db = client.db(database);
}

function getDb() {
  return db;
}

module.exports = {
  connect,
  getDb,
};
