"use strict";
var __importStar = this && this.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const socketIO = __importStar(require("socket.io"));
const socket_1 = require("../modules/groups/socket");
let io;
exports.getIOHandler = () => {
    return io;
};
exports.initSocket = http => {
    io = new socketIO.Server(http, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'] } });


    const sockets = [socket_1.initSocket];
    for (const initSocketT of sockets) {
        initSocketT(io);
    }
    return io;
};