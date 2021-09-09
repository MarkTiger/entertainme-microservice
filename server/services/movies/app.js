const express = require('express');
const { connect } = require('./config/mongodb');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');

const app = express();
const PORT = 4001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connect();

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
