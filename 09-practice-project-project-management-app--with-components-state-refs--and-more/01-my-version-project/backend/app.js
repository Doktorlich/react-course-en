import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import routeIndex from "./routes/index.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(routeIndex);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => {
        app.listen(process.env.PORT || 3000, error => {
            if (error) {
                return error;
            }
            console.log(`Server successfully started ${process.env.PORT}`);
        });
    })
    .catch(error => {
        console.error("Failed to connect to MongoDB database", error);
    });
