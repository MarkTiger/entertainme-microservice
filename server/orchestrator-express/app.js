require('dotenv').config();

const express = require('express');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
