"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const torre_1 = require("../../util/torre");
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
/**
 * @description Get the best opportunities for the current user in a paginated way
 * @param req.query Contains information about pagination
 */
exports.getOpportunities = async function (req, res) {
    try {
        const query = req.query;
        let page = 0;
        if (query.page) {
            page = +query.page;
        }
        const user = req.user;
        const result = await torre_1.searchOpportunities(user, page, 10, query.role ? query.role.toString() : null);
        res.send(result);
    }
    catch (e) {
        console.log(e);
        if (!e.statusCode) {
            throw new Error('There has been a problem searching opportunities');
        }
        else {
            throw e;
        }
    }
};
