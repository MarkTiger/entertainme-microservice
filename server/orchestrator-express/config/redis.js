const Redis = require('ioredis');

const host = process.env.REDIS_SERVER || 'localhost';

const redis = new Redis({
  host,
});

module.exports = redis;
