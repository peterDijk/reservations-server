"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = exports.secret = void 0;
const jwt = require("jsonwebtoken");
exports.secret = process.env.JWT_SECRET || 'dev-secret';
const ttl = 3600 * 4;
exports.sign = (data) => jwt.sign(data, exports.secret, { expiresIn: ttl });
exports.verify = (token) => jwt.verify(token, exports.secret);
//# sourceMappingURL=jwt.js.map