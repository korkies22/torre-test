"use strict";
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
var __importStar = this && this.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const credentialsUtils_1 = require("@util/credentialsUtils");
const torre_1 = require("@util/torre");
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const queries = __importStar(require("./queries"));
const validator_1 = require("./validator");
/**
                                             * Login user
                                             * @param req.body.username username from user
                                             * @param req.body.password password from user
                                             */
exports.login = async function (req, res) {
    validator_1.validationErrorHandler(req);
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await queries.findUser(username);
        if (!user) {
            throw { message: 'Wrong username or password', statusCode: 403 };
        }
        const isEqual = await credentialsUtils_1.checkPassword(password, user.password);
        if (!isEqual) {
            throw {
                message: 'Wrong username or password',
                statusCode: 403 };

        }
        const torreUser = await torre_1.checkMember(username);
        const token = await credentialsUtils_1.createToken(user.username);
        res.send({
            username: user.username,
            token,
            tokenTimeout: 12,
            refreshToken: user.refreshToken,
            user: torreUser });

    }
    catch (e) {
        if (!e.statusCode) {
            throw {
                message: 'There has been a problem while login the user. Please try again later',
                statusCode: 401 };

        } else
        {
            throw e;
        }
    }
};
/**
    * Create user
    * @param req.body.username username from user
    * @param req.body.password password from user
    */
exports.createUser = async function (req, res) {
    validator_1.validationErrorHandler(req);
    try {
        const username = req.body.username;
        let password = req.body.password;
        let user = await queries.findUser(username);
        if (user) {
            throw { message: 'User already exists', statusCode: 422 };
        }
        const torreUser = await torre_1.checkMember(username);
        password = await credentialsUtils_1.hashPassword(password);
        const refreshToken = await credentialsUtils_1.createRefreshToken();
        user = await queries.createUser(username, password, refreshToken);
        const token = await credentialsUtils_1.createToken(user.username);
        res.send({
            username: user.username,
            token,
            tokenTimeout: 12,
            refreshToken,
            user: torreUser });

    }
    catch (e) {
        if (!e.statusCode) {
            throw {
                message: 'There has been a problem while creating the user. Please try again later',
                statusCode: 401 };

        } else
        {
            throw e;
        }
    }
};
/**
    * Refresh an user token given the refreshToken
    * @param req.body.username username from the user
    * @param req.body.refreshToken refresh token used for verifying the user
    */
exports.refreshToken = async function (req, res) {
    validator_1.validationErrorHandler(req);
    try {
        const refreshToken = req.body.refreshToken;
        const user = await queries.findUser(req.body.username);
        if (!user) {
            throw { message: 'User not found', statusCode: 404 };
        }
        if (user.refreshToken !== refreshToken) {
            throw {
                message: 'The refresh token is incorrect for this user',
                statusCode: 401 };

        }
        const torreUser = await torre_1.checkMember(req.body.username);
        const token = await credentialsUtils_1.createToken(user.username);
        res.send({
            username: user.username,
            token,
            tokenTimeout: 12,
            refreshToken: user.refreshToken,
            user: torreUser });

    }
    catch (e) {
        if (!e.statusCode) {
            throw {
                message: 'There has been a problem while refreshing the token. Please try again later' };

        } else
        {
            throw e;
        }
    }
};