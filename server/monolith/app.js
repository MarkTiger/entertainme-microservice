const express = require('express');
const { connect } = require('./config/mongodb');
const router = require('./routes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connect();

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
