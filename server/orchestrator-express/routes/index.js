const Controller = require('../controllers');
const router = require('express').Router();
const tvseriesRouter = require('./tvSeries');
const moviesRouter = require('./movies');

router.get('/', Controller.getAll);

router.use('/movies', moviesRouter);

router.use('/tvseries', tvseriesRouter);

module.exports = router;
