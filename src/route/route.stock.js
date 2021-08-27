const controller = require("../controller/controller.stock");
const express = require('express');
const authenticateToken = require('../middleware/auth.user');
const commonValidateQuery = require('../middleware/valid.query');
const commonValidateBody = require('../middleware/valid.body');
const schemaValidate = require('../DTO/DTO');
const router = express.Router();

router.route('/getStock')
    .get(authenticateToken,controller.getStockUSA);

module.exports = router