"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = require("express");
const inversify_1 = require("../infrastructure/inversify");
const OrderController_1 = require("../controllers/OrderController");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const OrderRouter = (0, express_1.Router)();
exports.OrderRouter = OrderRouter;
const orderController = inversify_1.container.get(OrderController_1.OrderController);
// -> Routes
OrderRouter.post("/", (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await orderController.createOrder(req, res);
}));
OrderRouter.get("/:id", (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await orderController.getOrders(req, res);
}));
