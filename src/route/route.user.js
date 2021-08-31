const express = require('express');
const controller = require('../controller/controller.user');
const authenticateToken = require('../middleware/authen.user');
const commonValidateQuery = require('../middleware/valid.query');
const commonValidateBody = require('../middleware/valid.body');
const schemaValidate = require('../DTO/DTO.user');
const router = express.Router();
router.route('/')
    .all(authenticateToken)
    .get(controller.getUserbyInfo)
    .put(commonValidateBody(schemaValidate.updateUserSchema) ,controller.updateUser);

router.route('/all')
    .all(authenticateToken)
    .get(controller.getAllUser);

// router.route('/:id')
//     .get(controller.getUser)

router.route('/stock')
    .all(authenticateToken)
    .put(commonValidateBody(schemaValidate.buystockSchema), controller.buyStock)
    .delete(commonValidateBody(schemaValidate.sellstockSchema), controller.sellStock)
    .get(controller.getCost)

router.route('/register')
    .post(commonValidateBody(schemaValidate.createUserSchema),controller.createUser)

router.route('/login')
    .post(commonValidateBody(schemaValidate.loginSchema), controller.login)

router.route('/refresh')
    .all(authenticateToken)
    .get(controller.refresh)

router.route('/stocks')
    .all(authenticateToken)
    .get(controller.getAllStock)

router.route('/password')
    .all(authenticateToken)
    .put(commonValidateBody(schemaValidate.updatePasswordSchema),controller.updateUser)

router.route('/VNIndex').get(authenticateToken, controller.getIndex);

module.exports = router;
