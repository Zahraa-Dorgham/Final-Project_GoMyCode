
const { check, validationResult } = require('express-validator');


exports.registerRule = () => {
    return [
        check('fullname', 'Full name is required').notEmpty(),
        check('email', 'email is required').notEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6, max: 20 })
    ];
};


exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    !errors.isEmpty() ? res.status(400).send({ errors: errors.array().map(el => el.msg) }) : next();
}


exports.loginRule = () => {
    return [
        check('email', 'email is required').notEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6, max: 20 })
    ];
};
