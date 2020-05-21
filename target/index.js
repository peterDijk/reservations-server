"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const Koa = require("koa");
const http_1 = require("http");
const jwt_1 = require("./jwt");
const IO = require("socket.io");
const socketIoJwtAuth = require("socketio-jwt-auth");
const authorizationChecker_1 = require("./lib/helpers/authorizationChecker");
const logger_1 = require("./logger");
const db_1 = require("./db");
const controller_1 = require("./service/controller");
const app = new Koa();
const server = new http_1.Server(app.callback());
exports.io = IO(server);
const port = process.env.PORT || 4000;
routing_controllers_1.useKoaServer(app, {
    cors: true,
    controllers: [controller_1.default],
    authorizationChecker: authorizationChecker_1.authorizationChecker,
});
exports.io.use(socketIoJwtAuth.authenticate({ secret: jwt_1.secret }, async (payload, done) => {
    done(null, false, `Invalid JWT user ID`);
}));
exports.io.on('connect', (socket) => {
    const name = socket.request.user.firstName;
    console.log(`User ${name} just connected`);
    socket.on('disconnect', () => {
        console.log(`User ${name} just disconnected`);
    });
});
db_1.default().then(() => {
    try {
        server.listen(port);
        logger_1.default.info(`Listening on port ${port}`);
    }
    catch (err) {
        logger_1.default.error({ error: err });
        logger_1.default.log('error', { error: err });
    }
});
//# sourceMappingURL=index.js.map