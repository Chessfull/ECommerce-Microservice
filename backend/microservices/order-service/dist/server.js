"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartServer = void 0;
require("reflect-metadata");
const expressApp_1 = __importDefault(require("./expressApp"));
const mongoose_1 = require("./src/config/mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const kafka_1 = require("./src/config/kafka");
const inversify_1 = require("./src/infrastructure/inversify");
const logger_1 = require("./src/config/logger");
dotenv_1.default.config();
const PORT = process.env.SERVER_PORT || 3003;
const StartServer = async () => {
    try {
        // -> Connect to the database
        await (0, mongoose_1.connectToDatabase)();
        // -> Connect Kafka Service
        try {
            const orderKafkaService = new kafka_1.OrderServiceKafka(inversify_1.container.get("IOrderService"));
            await orderKafkaService.connect();
            await orderKafkaService.startConsumer();
        }
        catch (error) {
            logger_1.logger.error("Failed to connect to Kafka:", error);
        }
        // -> Then start the server if database connection is successful
        expressApp_1.default.listen(PORT, () => {
            console.log(`Listening port at ${PORT}`);
        });
        process.on("uncaughtException", async (err) => {
            console.log(err);
            process.exit(1);
        });
    }
    catch (error) {
        console.error("Connection failed, shutting down the server", error);
        process.exit(1); // Stop the process if the database connection fails
    }
};
exports.StartServer = StartServer;
(0, exports.StartServer)().then(() => {
    console.log(`Server is up in ${PORT} port!`);
});
