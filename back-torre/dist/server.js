"use strict";
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./util/envs");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require('cross-fetch/polyfill');
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = require("./util/mongoose");
const socket_io_1 = require("@util/socket-io");
const routes_1 = require("./routes");
const http_1 = __importDefault(require("http"));
const exceptionMiddleware_1 = require("./util/exceptionMiddleware");
const path_1 = __importDefault(require("path"));
const app = express_1.default();
// Import and Set Nuxt.js options
app.use(cors_1.default());
app.use(body_parser_1.default.json());
const httpServer = http_1.default.createServer(app);
socket_io_1.initSocket(httpServer);
app.use('/api', routes_1.router);
app.use(express_1.default.static('public'));
app.use(function (req, res, next) {
    res.status(404);
    // respond with html page
    if (req.accepts('html')) {
        res.sendFile(path_1.default.join(__dirname + '/../public', 'index.html'));
        return;
    }
    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }
    // default to plain-text. send()
    res.type('txt').send('Not found');
});
routes_1.router.use(exceptionMiddleware_1.exceptionMiddleware);
const PORT = process.env.PORT || 4000;
mongoose_1.initDB();
httpServer.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});