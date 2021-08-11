const express = require('express');
const controller = require('../controller/controller');
const authenticateToken = require('../middleware/auth.user');
const commonValidateQuery = require('../middleware/valid.query');
const commonValidateBody = require('../middleware/valid.body');
const schemaValidate = require('../DTO/DTO');
const router = express.Router();
router.route('/')
    .get(authenticateToken, controller.getUserbyInfo);

router.route('/all')
    .get(authenticateToken, controller.getAllUser);

router.route('/:id')
    .get(authenticateToken, controller.getUser)
    .delete(authenticateToken, controller.deleteUser)
    .put(commonValidateBody(schemaValidate.updateUserSchema) ,authenticateToken, controller.updateUser)

router.route('/:id/stock')
    .put(commonValidateBody(schemaValidate.buystockSchema), authenticateToken, controller.buyStock)
    .delete(commonValidateBody(schemaValidate.sellstockSchema), authenticateToken, controller.sellStock)
    .get(authenticateToken, controller.getCost)

router.route('/:id/money')
    .put(commonValidateBody(schemaValidate.addMoneySchema), authenticateToken, controller.addMoney)
    .delete(commonValidateBody(schemaValidate.subMoneySchema), authenticateToken, controller.subMoney)

router.route('/register')
    .post(commonValidateBody(schemaValidate.createUserSchema),controller.createUser)

router.route('/login')
    .post(commonValidateBody(schemaValidate.loginSchema), controller.login)

router.route('/refresh')
    .post(authenticateToken, controller.refresh)

router.route('/:id/stocks')
    .get(authenticateToken, controller.getAllStock)
module.exports = router;
