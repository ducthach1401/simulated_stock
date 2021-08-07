const express = require('express');
const controller = require('../controller/controller.js');

const router = express.Router();
router.route('/')
    .get(controller.getAllUser)

router.route('/:id')
    .get(controller.getUser)
    .delete(controller.deleteUser)

router.route('/:id/stock')
    .put(controller.buyStock)
    .delete(controller.sellStock)

router.route('/:id/money')
    .put(controller.addMoney)
    .delete(controller.subMoney);

router.route('/register')
    .post(controller.createUser)

router.route('/login')
    .post(controller.login)

module.exports = router;
