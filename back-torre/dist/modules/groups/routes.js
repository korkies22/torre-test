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
const groups = __importStar(require("./controller"));
const cloudinary_1 = require("../../util/cloudinary");
exports.router = express_1.default.Router();
exports.router.post('/', validator_1.verifyUser, cloudinary_1.upload.single('file'), validator_1.validate('create'), exceptionHandler_1.exceptionHandler(groups.createGroup));
exports.router.get('/:id', validator_1.verifyUser, exceptionHandler_1.exceptionHandler(groups.getGroupById));
exports.router.get('/', validator_1.verifyUser, exceptionHandler_1.exceptionHandler(groups.getGroups));
exports.router.post('/opportunity', validator_1.validate('opportunity'), validator_1.verifyUser, exceptionHandler_1.exceptionHandler(groups.addOpportunity));
exports.router.post('/', validator_1.validate('create'), validator_1.verifyUser, exceptionHandler_1.exceptionHandler(groups.getGroups));
require("./socket");
