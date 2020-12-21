"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const credentialsUtils_1 = require("../../util/credentialsUtils");
const express_validator_1 = require("express-validator");
exports.validate = (method) => {
    switch (method) {
        case 'check': {
            return [express_validator_1.query('user', 'You must enter a valid user to be found').exists()];
        }
    }
};
exports.validationErrorHandler = (req) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        throw {
            message: 'Validation error',
            statusCode: '400',
            data: errors.array(),
        };
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
