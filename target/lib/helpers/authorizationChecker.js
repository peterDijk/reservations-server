"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationChecker = void 0;
const routing_controllers_1 = require("routing-controllers");
const jwt_1 = require("../../jwt");
exports.authorizationChecker = (action) => {
    const header = action.request.headers.authorization;
    if (header && header.startsWith('Bearer ')) {
        const [, token] = header.split(' ');
        try {
            return !!(token && jwt_1.verify(token));
        }
        catch (e) {
            throw new routing_controllers_1.BadRequestError(e);
        }
    }
    return false;
};
//# sourceMappingURL=authorizationChecker.js.map