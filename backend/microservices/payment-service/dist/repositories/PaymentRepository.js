"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepository = void 0;
const inversify_1 = require("inversify");
const PaymentModel_1 = require("../models/PaymentModel");
const logger_1 = require("../config/logger");
let PaymentRepository = class PaymentRepository {
    async createPayment(payment) {
        try {
            // -> Save payment to the database using the Payment model coming from service
            const savedPayment = await new PaymentModel_1.Payment(payment).save();
            return savedPayment;
        }
        catch (error) {
            logger_1.logger.error("Error saving payment [PaymentRepository]:", error);
        }
    }
};
exports.PaymentRepository = PaymentRepository;
exports.PaymentRepository = PaymentRepository = __decorate([
    (0, inversify_1.injectable)()
], PaymentRepository);
//# sourceMappingURL=PaymentRepository.js.map