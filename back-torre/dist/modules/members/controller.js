"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const torre_1 = require("../../util/torre");
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const validator_1 = require("./validator");
/**
 * Refresh an user token given the refreshToken
 * @param req.body.username username from the user
 * @param req.body.refreshToken refresh token used for verifying the user
 */
exports.checkUserTorre = async function (req, res) {
    validator_1.validationErrorHandler(req);
    try {
        const username = req.query.user;
        const person = await torre_1.checkMember(username);
        res.send(person);
    }
    catch (e) {
        if (!e.statusCode) {
            throw {
                message: 'There has been a problem while fetching this user. Please try again later',
            };
        }
        else {
            throw e;
        }
    }
};
