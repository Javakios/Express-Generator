module.exports = `
//Initialize The router
const express = require('express');
const router = express.Router();

//Middlewares
const { validateCreateUserFields, validateCreateUserRequest } = require('../middleware/users/create');
const { validateUpdateUserFields, validateUpdateUserRequest } = require('../middleware/users/update');

//Controller
const userController = require('../controllers/users');


//Routes
router.get('/', userController.get);
router.get('/:id', userController.getSingleUser);
router.post('/', validateCreateUserFields, validateCreateUserRequest, userController.create);
router.put('/:id', validateUpdateUserFields, validateUpdateUserRequest, userController.update);
router.delete('/:id', userController.delete);

// export the router for users
module.exports = router;
`