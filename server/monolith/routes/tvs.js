const router = require('express').Router();
const Controller = require('../controllers/Tvs');

router.get('/', Controller.getTvs);

router.get('/:id', Controller.getTv);

router.post('/', Controller.createTv);

router.put('/:id', Controller.updateTv);

router.delete('/:id', Controller.deleteTv);

module.exports = router;
