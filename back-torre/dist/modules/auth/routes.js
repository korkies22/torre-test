"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exceptionHandler_1 = require("../../util/exceptionHandler");
const validator_1 = require("./validator");
const auth = __importStar(require("./controller"));
exports.router = express_1.default.Router();
exports.router.post('/refreshToken', validator_1.validate('refresh'), exceptionHandler_1.exceptionHandler(auth.refreshToken));
exports.router.post('/create', validator_1.validate('login'), exceptionHandler_1.exceptionHandler(auth.createUser));
exports.router.post('/', validator_1.validate('login'), exceptionHandler_1.exceptionHandler(auth.login));
