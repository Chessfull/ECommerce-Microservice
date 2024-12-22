"use strict";
// **************** This is my container for my dependency injections with 'inversify' ****************
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const PaymentService_1 = require("../services/PaymentService");
const PaymentController_1 = require("../controllers/PaymentController");
const PaymentRepository_1 = require("../repositories/PaymentRepository");
const kafka_1 = require("./kafka");
const container = new inversify_1.Container();
exports.container = container;
// ▼ My dependency injection settings here ▼
container.bind("IPaymentRepository").to(PaymentRepository_1.PaymentRepository);
container.bind("IPaymentService").to(PaymentService_1.PaymentService);
container.bind(PaymentController_1.PaymentController).toSelf();
container
    .bind("PaymentServiceKafka")
    .to(kafka_1.PaymentServiceKafka)
    .inSingletonScope();
//# sourceMappingURL=inversify.js.map