"use strict";
// **************** ORder Service Kafka Consumer Settings ****************
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServiceKafka = void 0;
const kafkajs_1 = require("kafkajs");
const logger_1 = require("./logger");
const inversify_1 = require("inversify");
let OrderServiceKafka = class OrderServiceKafka {
    constructor(orderService) {
        this.orderService = orderService;
        this.kafka = new kafkajs_1.Kafka({
            clientId: "order-service",
            brokers: [process.env.KAFKA_BROKERS || "localhost:9092"],
            retry: {
                initialRetryTime: 100,
                retries: 5,
                maxRetryTime: 30000,
            },
        });
        this.consumer = this.consumer = this.kafka.consumer({
            groupId: "order-service-group",
            retry: {
                retries: 5
            }
        });
    }
    async connect() {
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({
                topic: "payment-events",
                fromBeginning: true,
            });
            logger_1.logger.info("Order Service Kafka Consumer connected");
        }
        catch (error) {
            logger_1.logger.error("Failed to connect Order Service Kafka Consumer:", error);
        }
    }
    async startConsumer() {
        try {
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    if (message.value) {
                        const paymentEvent = JSON.parse(message.value.toString());
                        await this.processPaymentEvent(paymentEvent);
                    }
                },
            });
            logger_1.logger.info("Kafka consumer started successfully");
        }
        catch (error) {
            logger_1.logger.error("Error processing message:", error);
            throw error;
        }
    }
    async processPaymentEvent(paymentEvent) {
        try {
            if (paymentEvent.status === "SUCCESS") {
                const orderDto = {
                    userId: paymentEvent.userId,
                    paymentId: paymentEvent.paymentId,
                    products: paymentEvent.products,
                    totalPrice: paymentEvent.totalPrice,
                };
                const serviceResult = await this.orderService.createOrder(orderDto);
                if (!serviceResult.IsSucceed) {
                    logger_1.logger.error(`Failed to create order for payment event: ${paymentEvent.userId}`, {
                        error: serviceResult.Message,
                    });
                    return;
                }
                logger_1.logger.info(`Successfully created order for payment event: ${paymentEvent.userId}`);
            }
        }
        catch (error) {
            logger_1.logger.error(`Failed to process payment event for order ${paymentEvent.userId}:`, error);
        }
    }
};
exports.OrderServiceKafka = OrderServiceKafka;
exports.OrderServiceKafka = OrderServiceKafka = __decorate([
    __param(0, (0, inversify_1.inject)("IOrderService")),
    __metadata("design:paramtypes", [Object])
], OrderServiceKafka);
