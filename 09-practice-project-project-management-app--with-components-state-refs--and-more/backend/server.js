import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import routeIndex from "./routes/index.route.js";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
    }),
);

server.use(routeIndex);
server.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => {
        server.listen(process.env.PORT || 8080, error => {
            if (error) {
                return error;
            }
            console.log(`Server successfully started ${process.env.PORT}`);
        });
    })
    .catch(error => {
        console.error("Failed to connect to MongoDB database", error);
    });
