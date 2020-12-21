"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const groups_1 = __importDefault(require("../../util/models/groups"));
exports.findGroupById = async (id) => {
    return await groups_1.default.findOne({ _id: id }).exec();
};
exports.createGroup = async (name, description, members, totalWeight, videoURL) => {
    return await groups_1.default.create({
        name,
        description,
        members,
        totalWeight,
        videoURL,
        opportunities: [],
    });
};
exports.getGroupsFromUser = async (username) => {
    return await groups_1.default.find({ members: username }).exec();
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
