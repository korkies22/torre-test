"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("../../util/models/users"));
exports.findUser = async (username) => {
    return await users_1.default.findOne({ username }).exec();
};
exports.createUser = async (username, password, refreshToken) => {
    return await users_1.default.create({ username, password, refreshToken });
};
exports.findUsers = async (usernames) => {
    return await users_1.default.find({ username: { $in: usernames } }).exec();
};
// Devuelve un objeto clientSession, el cual representa una transacción
exports.getTransaction = async () => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    return session;
};
exports.getObjectId = (_id) => {
    return new mongoose_1.default.Types.ObjectId(_id);
};
// Hace rollback a una transacción
exports.rollback = async (t) => {
    await t.abortTransaction();
};
// Hace commit a una transacción
exports.commit = async (t) => {
    await t.commitTransaction();
};
