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
exports.PaymentController = void 0;
const inversify_1 = require("inversify");
const PaymentDto_1 = require("../dtos/PaymentDto");
const logger_1 = require("../config/logger");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this._paymentService = paymentService;
    }
    async createPayment(req, res) {
        try {
            // 1: Destructure Request Body
            const { userId, products, cardNo, totalAmount } = req.body;
            // Step 2: Validate Input
            if (!userId ||
                !products ||
                !cardNo) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid input. Ensure all fields are provided and valid.",
                });
            }
            // Step 3: Create Payment DTO
            const paymentDto = new PaymentDto_1.PaymentDto(userId, products, cardNo, totalAmount);
            // Step 4: Call Service with DTO I define above
            const serviceResult = await this._paymentService.createPayment(paymentDto);
            // Step 5: Return Response
            if (serviceResult.IsSucceed) {
                return res.status(201).json({
                    success: true,
                    message: serviceResult.Message,
                    data: serviceResult.Data,
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: serviceResult.message,
                });
            }
        }
        catch (error) {
            logger_1.logger.error("[PaymentController] Error:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred while processing the payment.",
                error: error
            });
        }
    }
};
exports.PaymentController = PaymentController;
exports.PaymentController = PaymentController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("IPaymentService")),
    __metadata("design:paramtypes", [Object])
], PaymentController);
//# sourceMappingURL=PaymentController.js.map