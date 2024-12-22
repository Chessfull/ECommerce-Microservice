"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    paymentId: { type: String, required: true },
    userId: { type: String, required: true },
    products: [
        {
            productId: { type: String, required: true },
            productName: { type: String },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, required: true },
    isDeleted: { type: Boolean, required: true, default: false }, // Manage soft delete
    deletedAt: { type: Date, default: null },
}, { timestamps: true });
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
