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
exports.OrderController = void 0;
const inversify_1 = require("inversify");
const OrderDto_1 = require("../dtos/OrderDto");
const logger_1 = require("../config/logger");
let OrderController = class OrderController {
    constructor(orderService) {
        this._orderService = orderService;
    }
    async createOrder(req, res) {
        try {
            const { userId, paymentId, products, totalPrice } = req.body;
            // Validate input
            if (!userId || !products || !totalPrice) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid input. Ensure all fields are provided and valid.",
                });
            }
            // Create OrderDto instance
            const orderDto = new OrderDto_1.OrderDto(userId, paymentId, products, totalPrice);
            // Call the service to create the order
            const serviceResult = await this._orderService.createOrder(orderDto);
            // Check service result and return appropriate response
            if (!serviceResult.IsSucceed) {
                return res.status(500).json({
                    success: false,
                    message: serviceResult.Message,
                });
            }
            return res.status(200).json({
                success: true,
                message: serviceResult.Message,
                data: serviceResult.Data,
            });
        }
        catch (error) {
            logger_1.logger.error("Error creating order:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred while creating the order.",
            });
        }
    }
    async getOrders(req, res) {
        const userId = req.params.id;
        const serviceResult = await this._orderService.getOrders(userId);
        if (!serviceResult.IsSucceed) {
            return res.status(400).json({ message: serviceResult.Message });
        }
        return res.status(200).json({
            message: serviceResult.Message,
            data: serviceResult.Data,
        });
    }
};
exports.OrderController = OrderController;
exports.OrderController = OrderController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("IOrderService")),
    __metadata("design:paramtypes", [Object])
], OrderController);
