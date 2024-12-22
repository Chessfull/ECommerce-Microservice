"use strict";
// **************** Payment Service Kafka Producer Settings ****************
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentServiceKafka = void 0;
const kafkajs_1 = require("kafkajs");
const logger_1 = require("./logger");
class PaymentServiceKafka {
    constructor() {
        this.kafka = new kafkajs_1.Kafka({
            clientId: "payment-service",
            brokers: [process.env.KAFKA_BROKERS || "localhost:9092"],
            retry: {
                initialRetryTime: 100,
                retries: 5,
                maxRetryTime: 30000,
            },
        });
        this.producer = this.kafka.producer();
    }
    async connect() {
        try {
            await this.producer.connect();
            logger_1.logger.info('Payment Service Kafka Producer connected');
        }
        catch (error) {
            logger_1.logger.error('Failed to connect Payment Service Kafka Producer:', error);
        }
    }
    async disconnect() {
        await this.producer.disconnect();
    }
    async sendPaymentEvent(paymentEvent) {
        try {
            await this.producer.send({
                topic: 'payment-events',
                messages: [
                    {
                        key: paymentEvent.userId,
                        value: JSON.stringify(paymentEvent)
                    }
                ]
            });
        }
        catch (error) {
            logger_1.logger.error('Failed to send payment event [PaymentService-Kafka]:', error);
        }
    }
}
exports.PaymentServiceKafka = PaymentServiceKafka;
//# sourceMappingURL=kafka.js.map