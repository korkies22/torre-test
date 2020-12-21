"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const credentialsUtils_1 = require("@util/credentialsUtils");
const express_validator_1 = require("express-validator");
exports.validate = method => {
    switch (method) {
        case 'create':{
                return [
                express_validator_1.body('name', 'You must enter a valid name').
                exists().
                isLength({ min: 4 }).
                withMessage('username should have at least 4 characters'),
                express_validator_1.body('members.*', 'You must enter a valid member array').
                exists().
                isString().
                withMessage('Members should be an array of strings')];

            }
        case 'opportunity':{
                return [
                express_validator_1.body('groupId', 'You must enter a valid member array').exists(),
                express_validator_1.body('opportunityId', 'You must enter a valid name').exists()];

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
exports.verifyUser = async (req, res, next) => {
    try {
        req.user = await credentialsUtils_1.tokenVerifier(req);
    }
    catch (err) {
        res.status(401).send({ message: 'Invalid Token' });
        return;
    }
    next();
};