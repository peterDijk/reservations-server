"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const logger_1 = require("../logger");
const entity_1 = require("./entity");
let ServiceController = (() => {
    let ServiceController = class ServiceController {
        async getHealth() {
            logger_1.default.log('info', 'request received at /health');
            return {
                health: 'ok',
            };
        }
        async addCheck() {
            const newCheck = await entity_1.default.create({ message: 'health check ok' });
            logger_1.default.debug('record added to database');
            return newCheck.save();
        }
        async getChecks() {
            const checks = await entity_1.default.find({
                order: { ['dateCreated']: 'DESC' },
            });
            return { checks };
        }
    };
    __decorate([
        routing_controllers_1.Get('/health'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], ServiceController.prototype, "getHealth", null);
    __decorate([
        routing_controllers_1.Get('/health/add'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], ServiceController.prototype, "addCheck", null);
    __decorate([
        routing_controllers_1.Get('/health/list'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], ServiceController.prototype, "getChecks", null);
    ServiceController = __decorate([
        routing_controllers_1.JsonController()
    ], ServiceController);
    return ServiceController;
})();
exports.default = ServiceController;
//# sourceMappingURL=controller.js.map