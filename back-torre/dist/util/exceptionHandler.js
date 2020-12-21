"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function exceptionHandler(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(error => next(error));
    };
}
exports.exceptionHandler = exceptionHandler;