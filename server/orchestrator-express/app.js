require('dotenv').config();

const redis = require('./config/redis');

const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
