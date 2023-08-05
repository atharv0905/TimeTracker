const express = require('express');
const userController = require('../controller/user');
const router = express.Router();

router.post('/createUser', userController.createUser);
router.get('/all', userController.getAllUsers);
router.post('/login', userController.loginUser);
router.get('/getUserById', userController.getUserById);
router.delete('/deleteUserById', userController.deleteUserById);
router.put('/updateUserTaskById', userController.updateUserTaskById);

module.exports = {
    router
};