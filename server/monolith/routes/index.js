const router = require('express').Router();
const tvRouter = require('./tvs');
const movieRouter = require('./movies');

router.use('/tvseries', tvRouter);

router.use('/movies', movieRouter);

module.exports = router;
