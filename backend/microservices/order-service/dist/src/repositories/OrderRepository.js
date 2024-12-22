"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const inversify_1 = require("inversify");
const OrderModal_1 = require("../modals/OrderModal");
const logger_1 = require("../config/logger");
let OrderRepository = class OrderRepository {
    async createOrder(order) {
        try {
            const newOrder = new OrderModal_1.Order(order);
            console.log("ORDER at Repository", order);
            await newOrder.save();
            return order;
        }
        catch (error) {
            logger_1.logger.error("Error creating order:", error);
            return null;
        }
    }
    async getOrdersByUserId(userId) {
        try {
            const orders = await OrderModal_1.Order.find({ userId, isDeleted: false });
            return orders;
        }
        catch (error) {
            logger_1.logger.error("Error getting orders by userId [OrderRepository]:", error);
            return null;
        }
    }
};
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = __decorate([
    (0, inversify_1.injectable)()
], OrderRepository);
