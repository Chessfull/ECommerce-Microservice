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
exports.OrderService = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const OrderModal_1 = require("../modals/OrderModal");
const ServiceMessage_1 = require("../types/ServiceMessage");
const logger_1 = require("../config/logger");
// -> I m managing my controller-service communication with 'ServiceMessage' type I defined in '/types'.
let OrderService = class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async createOrder(orderDto) {
        // -> Desctruct from paymentDto
        const { userId, paymentId, products, totalPrice } = orderDto;
        //  console.log("Products at Service",products);
        const order = new OrderModal_1.Order({ userId, paymentId, products, totalPrice });
        // console.log("ORDER at Service",order);
        try {
            const savedOrder = await this.orderRepository.createOrder(order);
            // -> Checking Repository Result
            if (!savedOrder) {
                return new ServiceMessage_1.ServiceMessage(false, "Failed to save invoice [Error: OrderRepository].");
            }
            return new ServiceMessage_1.ServiceMessage(true, "Order created successfully.", order);
        }
        catch (error) {
            logger_1.logger.error("Error saving payment:", error);
            return new ServiceMessage_1.ServiceMessage(false, "Error saving orders.");
        }
    }
    async getOrders(userId) {
        try {
            const orders = await this.orderRepository.getOrdersByUserId(userId);
            if (!orders || orders.length === 0) {
                return new ServiceMessage_1.ServiceMessage(false, "No orders found for the given user.");
            }
            return new ServiceMessage_1.ServiceMessage(true, "Orders retrieved successfully.", orders);
        }
        catch (error) {
            logger_1.logger.error("Error retrieving orders:", error);
            return new ServiceMessage_1.ServiceMessage(false, "Error retrieving orders.");
        }
    }
    ;
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("IOrderRepository")),
    __metadata("design:paramtypes", [Object])
], OrderService);
