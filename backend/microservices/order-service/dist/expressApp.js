"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderRouter_1 = require("./src/routes/OrderRouter");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = __importDefault(require("./src/middlewares/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173'
}));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("NewMind AI - Mert Topcu - E-commerce Fullstack Microservice App");
});
// -> My routes from /router
app.use("/api/v1/order", OrderRouter_1.OrderRouter);
// -> My errorhandler middleware I just used info and error level for now handle with winston
app.use(errorHandler_1.default);
exports.default = app;
