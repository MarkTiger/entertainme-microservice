const Controller = require('../controllers');
const router = require('express').Router();

router.get('/', Controller.getMovies);

router.get('/:id', Controller.getMovie);

router.post('/', Controller.createMovie);

router.put('/:id', Controller.updateMovie);

router.delete('/:id', Controller.deleteMovie);

module.exports = router;
