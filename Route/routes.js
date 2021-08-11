const express = require('express');
const Controller = require('../Controller/controller');

const router = express.Router();

router.get('/', Controller.getAll);
router.post('/transaction', Controller.transaction);
router.get('/transaction', Controller.getTransaction);

module.exports = router;