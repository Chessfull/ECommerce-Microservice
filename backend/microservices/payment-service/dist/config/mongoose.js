"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoUri = process.env.MONGO_URI; //-> Getting connection string from .env
if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in the environment variables");
}
const connectToDatabase = async () => {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log(`Connected to MongoDB Succesfully : ${mongoUri.slice(12, 26)}...`);
    }
    catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
};
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=mongoose.js.map