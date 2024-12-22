"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields)
exports.Payment = (0, mongoose_1.model)("Payment", paymentSchema);
//# sourceMappingURL=PaymentModel.js.map