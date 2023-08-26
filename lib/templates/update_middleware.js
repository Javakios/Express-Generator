module.exports = `const { body, validationResult } = require('express-validator');

const validateUpdateUserFields = [
    body('name').notEmpty().withMessage('First Name Of User Must be included'),
    body('username').notEmpty().withMessage('Username Of User Must be included'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at Least 8 characters long'),
    body('email').isEmail().withMessage('Invalid email address')
];



const validateUpdateUserRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array() });
    }
    next();
}

module.exports = { validateUpdateUserFields, validateUpdateUserRequest }`