"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
/**
 * Verifies an user token
 * @param req express request parameter
 */
async function tokenVerifier(req) {
    const token = req.header('Authorization');
    if (!token) {
        throw {
            message: 'User must be authenticated in order to use this function',
            statusCode: 401,
        };
    }
    const username = (await new Promise((resolve) => {
        jsonwebtoken_1.default.verify(token, process.env.privateKey, function (err, decoded) {
            if (err) {
                throw { message: 'Invalid Token', statusCode: 401 };
            }
            else {
                resolve(decoded.username);
            }
        });
    }));
    return username;
}
exports.tokenVerifier = tokenVerifier;
/**
 * Hashes an user password
 * @param password password to be hashed
 */
exports.hashPassword = (password) => {
    return bcrypt_1.default.hash(password.trim(), 12);
};
/**
 * Creates a token given a username
 * @param username username to be included
 */
exports.createToken = (username) => jsonwebtoken_1.default.sign({
    username,
}, process.env.privateKey, { expiresIn: '12h' });
/**
 * Creates a refreshToken, basically a random long string
 */
exports.createRefreshToken = () => new Promise((resolve, reject) => {
    crypto_1.default.randomBytes(50, function (err, buffer) {
        if (err) {
            reject(err);
        }
        const token = buffer.toString('hex');
        resolve(token);
    });
});
/**
 * Checks an string password vs a hashed password. Used to auth purposes
 */
exports.checkPassword = (password, hashedPassword) => {
    return bcrypt_1.default.compare(password, hashedPassword);
};
