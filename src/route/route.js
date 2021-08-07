const express = require('express');
const controller = require('../controller/controller.js');

const router = express.Router();
router.route('/')
    .post(controller.createUser)

router.route('/:id/stock')
    .put(controller.buyStock)
    .delete(controller.sellStock)

router.route('/:id/money')
    .put(controller.addMoney);
    
module.exports = router;
