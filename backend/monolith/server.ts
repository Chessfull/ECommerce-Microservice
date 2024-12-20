import "reflect-metadata";
import expressApp from "./expressApp";
import { connectToDatabase } from "./config/mongoose";
import dotenv from "dotenv";
import { redisClient } from "./config/redis";
import { container } from "./config/inversify";
import { UserEventPublisher } from "./identity-service/infrastructure/kafka/UserEventPublisher";
import { ProductEventPublisher } from "./product-service/infrastructure/kafka/ProductEventPublisher";
dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;

export const StartServer = async () => {
  try {

    const identityKafkaService=container.get<UserEventPublisher>("UserEventPublisher");
    
    const productKafkaService=container.get<ProductEventPublisher>("ProductEventPublisher");

    // -> connect to the database
    await connectToDatabase();

    // -> connect to the kafka
    await identityKafkaService.connect();
    await productKafkaService.connect();

    redisClient.on("connect", () => console.log("Redis connected"));
    redisClient.on("error", (err) => console.error("Redis error:", err));

    // Then start the server if database connection is successful
    expressApp.listen(PORT, () => {
      console.log(`Listening port at ${PORT}`);
    });

    process.on("uncaughtException", async (err) => {
      console.log(err);
      process.exit(1);
    });
  } catch (error) {
    console.error(
      "Database connection failed, shutting down the server",
      error
    );
    process.exit(1); // Stop the process if the database connection fails
  }
};

StartServer().then(() => {
  console.log("Server is up!");
});
