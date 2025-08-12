import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import routeIndex from "./routes/index.route.js";
import path from "path";
import { fileURLToPath } from "url";

const server = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Теперь можно использовать __dirname

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// server.use(express.static(path.join(__dirname, "public")));

server.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
    }),
);

// server.use((req, res, next) => {
//     console.log(`Incoming request: ${req.method} ${req.url}`);
//     next();
// });

server.use(routeIndex);
server.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

// server.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

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
