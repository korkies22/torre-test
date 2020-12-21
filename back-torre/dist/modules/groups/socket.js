"use strict";
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("@util/events"));
const users = [];
exports.initSocket = io => {
    const nsp = io.of('/group');
    nsp.on('connection', function (socket) {
        users[socket.id] = socket.id;
        socket.on('groupId', function (msg) {
            socket.join(msg);
        });
    });
    events_1.default.on('groupChanged', message => {
        const group = JSON.parse(message);
        nsp.in(group._id).emit('groupData', message);
    });
};