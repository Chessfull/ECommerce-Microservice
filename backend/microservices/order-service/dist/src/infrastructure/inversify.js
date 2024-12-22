"use strict";
// **************** This is my container for my dependency injections with 'inversify' ****************
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const OrderService_1 = require("../services/OrderService");
const OrderRepository_1 = require("../repositories/OrderRepository");
const OrderController_1 = require("../controllers/OrderController");
const container = new inversify_1.Container();
exports.container = container;
// ▼ My dependency injection settings here ▼
container.bind("IOrderRepository").to(OrderRepository_1.OrderRepository);
container.bind("IOrderService").to(OrderService_1.OrderService);
container.bind(OrderController_1.OrderController).toSelf();
