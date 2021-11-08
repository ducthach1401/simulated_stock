const controller = require("../controller/controller.command");
const express = require('express');
const authenticateToken = require('../middleware/authen.user');
const commonValidateQuery = require('../middleware/valid.query');
const commonValidateBody = require('../middleware/valid.body');
const schemaValidate = require('../DTO/DTO.user');
const router = express.Router();

router.route('/')
    .get(authenticateToken, controller.getCommand)
    .delete(authenticateToken, controller.deleteCommand)
    .post(authenticateToken, controller.setCommand);

router.route('/:id')
    .put(authenticateToken, controller.updateCommand);

module.exports = router