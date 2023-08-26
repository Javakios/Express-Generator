module.exports = `// Import body and validationResult from express-validator
const { body, validationResult  } = require('express-validator');
// Validate The Fields
const validateCreateUserFields = [
    body('name').notEmpty().withMessage('First Name Of User Must be included'),
    body('username').notEmpty().withMessage('Username Of User Must be included'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at Least 8 characters long'),
    body('email').isEmail().withMessage('Invalid email address')
];
// Validate That the request is correct and continue or throw error
const validateCreateUserRequest = (req, res, next) => {
    const errors = validationResult (req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}
// export the functions
module.exports = { validateCreateUserFields, validateCreateUserRequest }`