"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDto = void 0;
class OrderDto {
    constructor(userId, paymentId, products, totalPrice) {
        this.userId = userId;
        this.paymentId = paymentId;
        this.products = products;
        this.totalPrice = totalPrice;
    }
}
exports.OrderDto = OrderDto;
