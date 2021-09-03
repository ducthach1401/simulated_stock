const express = require('express');
const controller = require('../controller/controller.admin');
const authenticateToken = require('../middleware/authen.user');
const commonValidateQuery = require('../middleware/valid.query');
const commonValidateBody = require('../middleware/valid.body');
const schemaValidate = require('../DTO/DTO.user');
const authorUser = require('../middleware/author.user');
const router = express.Router();

router.route('/')
    .all(authenticateToken, authorUser)
    .get(controller.getAll)

router.route('/all')
    .all(authenticateToken, authorUser)
    .get(controller.getUserAll)

router.route('/:id')
    .all(authenticateToken, authorUser)
    .delete(controller.deleteUser)

router.route('/:id/money')
    .all(authenticateToken, authorUser)
    .put(commonValidateBody(schemaValidate.addMoneySchema), controller.addMoney)
    .delete(commonValidateBody(schemaValidate.subMoneySchema), controller.subMoney)

router.route('/:id/USD')
    .all(authenticateToken, authorUser)
    .put(commonValidateBody(schemaValidate.addMoneySchema), controller.addUSD)
    .delete(commonValidateBody(schemaValidate.subMoneySchema), controller.subUSD)
    
module.exports = router;