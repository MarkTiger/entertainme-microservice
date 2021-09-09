const Controller = require('../controllers');

const router = require('express').Router();

router.get('/', Controller.getTvs);

router.get('/:id', Controller.getTv);

router.post('/', Controller.createTv);

router.put('/:id', Controller.updateTv);

router.delete('/:id', Controller.deleteTv);

module.exports = router;
