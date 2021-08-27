const controller = require("../controller/controllerUSA");
const express = require('express');
const authenticateToken = require('../middleware/auth.user');
const commonValidateQuery = require('../middleware/valid.query');
const commonValidateBody = require('../middleware/valid.body');
const schemaValidate = require('../DTO/DTO');
const router = express.Router();

router.route('/')
    .get(authenticateToken, controller.getUser);

router.route('/all')
    .get(authenticateToken, controller.getUserAll);
    
router.route('/:id/stock')
    .get(authenticateToken,controller.getStockUSA)
    .put(authenticateToken, controller.buyStock)
    .delete(authenticateToken, controller.sellStock);

module.exports = router