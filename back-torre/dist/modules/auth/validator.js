"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.validate = method => {
    switch (method) {
        case 'login':{
                return [
                express_validator_1.body('username', 'You must enter a valid username').
                exists().
                isLength({ min: 4 }).
                withMessage('username should have at least 4 characters'),
                express_validator_1.body('password', 'You must enter a valid password').
                exists().
                isLength({ min: 6 }).
                withMessage('Password should have at least 6 characters')];

            }
        case 'refresh':{
                return [
                express_validator_1.body('username', 'You must enter a valid username').
                exists().
                isLength({ min: 4 }).
                withMessage('username should have at least 4 characters'),
                express_validator_1.body('refreshToken', 'You must enter a valid refreshToken').exists()];

            }
        case 'user':{
                return [express_validator_1.header('authorization', 'Debe ingresar un token válido').exists()];
            }}

};
exports.validationErrorHandler = req => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        throw {
            message: 'Validation error',
            statusCode: '400',
            data: errors.array() };

    }
};