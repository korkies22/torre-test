"use strict";
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const routes_1 = require("./modules/auth/routes");
const routes_2 = require("./modules/members/routes");
const routes_3 = require("./modules/groups/routes");
const routes_4 = require("./modules/opportunities/routes");
exports.router.use('/auth', routes_1.router);
exports.router.use('/members', routes_2.router);
exports.router.use('/groups', routes_3.router);
exports.router.use('/opportunities', routes_4.router);