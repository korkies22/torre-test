"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function exceptionMiddleware(error, req, res, next) {
    var _a;
    console.log('err', error);
    // Express-validator
    if ((error.status === 400 ||
    error.statusCode === '400' ||
    error.statusCode === 400) && ((_a = error.data[0]) === null || _a === void 0 ? void 0 : _a.msg)) {
        error.message = error.data[0].msg;
    }
    const status = error.status || error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data });
}
exports.exceptionMiddleware = exceptionMiddleware;