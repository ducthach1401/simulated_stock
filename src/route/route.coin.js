const controller = require("../controller/controllerCoin.user");
const express = require('express');
const authenticateToken = require('../middleware/authen.user');
const commonValidateQuery = require('../middleware/valid.query');
const commonValidateBody = require('../middleware/valid.body');
const schemaValidate = require('../DTO/DTO.user');
const router = express.Router();

router.route('/')
    .get(authenticateToken, controller.getUser);

router.route('/all')
    .get(authenticateToken, controller.getUserAll);
    
router.route('/coin')
    .get(authenticateToken,controller.getCoin)
    .put(authenticateToken, commonValidateBody(schemaValidate.buyCoinSchema), controller.buyCoin)
    .delete(authenticateToken, commonValidateBody(schemaValidate.sellCoinSchema), controller.sellCoin);

module.exports = router