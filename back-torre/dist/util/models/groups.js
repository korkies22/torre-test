"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const autoIndex = process.env.NODE_ENV !== 'production';
const GroupSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    members: [{ type: String, required: true }],
    opportunities: { type: Array, default: [] },
    totalWeight: { type: Number, required: true },
    videoURL: { type: String, required: false },
}, { autoIndex });
// Index on the groupname for fast searching and pagination in order to return many
GroupSchema.index({ groupname: 1 });
// Export the model and return your IGroup interface
exports.default = mongoose_2.default.models.groups ||
    mongoose_2.default.model('groups', GroupSchema);
