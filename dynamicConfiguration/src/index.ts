import mongoose from "mongoose";
import { app } from "./app";

const checkEnvironmentVars = () => {
    if (process.env.MONGO_URI === undefined) {
        throw new Error("MONGO_URI is not defined");
    }
    if (process.env.PORT === undefined) {
        throw new Error("PORT is not defined");
    }
};

const start = async () => {
    checkEnvironmentVars();
    try {
        await mongoose.connect(process.env.MONGO_URI ?? "");
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
    app.listen(process.env.PORT || 5000, () => {
        console.log(`listening on ${process.env.PORT || 5000}`);
    });
};

start();
