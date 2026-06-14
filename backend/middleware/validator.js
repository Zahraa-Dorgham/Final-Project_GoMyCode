const { check, validationResult } = require("express-validator");

exports.registerRule = () => [
    check("fullname", "Full name is required").notEmpty(),
    check("email", "Email is required").notEmpty(),
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be 6-20 chars").isLength({ min: 6, max: 20 })
];

exports.loginRule = () => [
    check("email", "Email is required").notEmpty(),
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be 6-20 chars").isLength({ min: 6, max: 20 })
];

exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            errors: errors.array().map((e) => e.msg)
        });
    }
    next();
};