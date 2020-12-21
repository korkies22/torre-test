"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const autoIndex = process.env.NODE_ENV !== 'production';
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    refreshToken: { type: String, required: true },
}, { autoIndex });
// Index on the username for fast searching and pagination in order to return many
UserSchema.index({ username: 1 });
// Export the model and return your IUser interface
exports.default = mongoose_2.default.models.users ||
    mongoose_2.default.model('users', UserSchema);
