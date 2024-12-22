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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const kafka_1 = require("../config/kafka");
const logger_1 = require("../config/logger");
const PaymentModel_1 = require("../models/PaymentModel");
const ServiceMessage_1 = require("../types/ServiceMessage");
const inversify_1 = require("inversify");
// -> I m managing my controller-service communication with 'ServiceMessage' type I defined in '/types'.
let PaymentService = class PaymentService {
    constructor(paymentRepository, paymentKafkaService) {
        this._paymentRepository = paymentRepository;
        this._paymentKafkaService = paymentKafkaService;
    }
    async createPayment(paymentDto) {
        // -> Desctruct from paymentDto
        const { userId, cardNo, products, totalAmount } = paymentDto;
        // -> Consider and assume checking card details for payment and succesfull
        if (!cardNo || cardNo.length < 12) {
            return new ServiceMessage_1.ServiceMessage(false, "Invalid card number.");
        }
        // -> Create a new Payment document
        const payment = new PaymentModel_1.Payment({
            userId,
            paymentMethod: "card", // -> In my scenario card for now
            totalAmount,
        });
        // -> Save to database
        try {
            const savedPayment = await this._paymentRepository.createPayment(payment);
            // -> Checking Repository Result
            if (!savedPayment) {
                return new ServiceMessage_1.ServiceMessage(false, "Failed to save payment [Error: PaymentRepository].");
            }
            try {
                // ************ Kafka Producer Operations ************
                const paymentEvent = {
                    userId: userId,
                    paymentId: savedPayment._id,
                    products: products,
                    status: "SUCCESS",
                    totalPrice: totalAmount,
                    timestamp: new Date(),
                };
                await this._paymentKafkaService.sendPaymentEvent(paymentEvent);
            }
            catch (error) {
                logger_1.logger.error("Failed to send payment event [PaymentService-Kafka]:", error);
            }
            return new ServiceMessage_1.ServiceMessage(true, "Payment created successfully.", payment);
        }
        catch (error) {
            logger_1.logger.error("Error saving payment:", error);
            return new ServiceMessage_1.ServiceMessage(false, "Error saving payment.");
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("IPaymentRepository")),
    __param(1, (0, inversify_1.inject)("PaymentServiceKafka")),
    __metadata("design:paramtypes", [Object, kafka_1.PaymentServiceKafka])
], PaymentService);
//# sourceMappingURL=PaymentService.js.map