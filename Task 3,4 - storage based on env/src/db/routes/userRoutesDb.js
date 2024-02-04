const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router();

//this is the middleware only for the id parameter
router.param('id', (req, res, next, val) => {
    console.log(`User id is: ${val}`);
    next()
})

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

router
    .route('/:id')
    .put(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router;