"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRouter = void 0;
const express_1 = require("express");
const inversify_1 = require("../config/inversify");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const PaymentController_1 = require("../controllers/PaymentController");
const PaymentRouter = (0, express_1.Router)();
exports.PaymentRouter = PaymentRouter;
const paymentController = inversify_1.container.get(PaymentController_1.PaymentController);
// -> Routes
PaymentRouter.post("/", (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await paymentController.createPayment(req, res);
}));
//# sourceMappingURL=PaymentRoutes.js.map