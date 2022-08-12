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
    mongoose
        .connect(process.env.MONGO_URI!)
        .then(r => console.log(r.connection.db.databaseName))
        .catch(e => console.log(e));
    app.listen(process.env.PORT || 5000, () => {
        console.log(`listening on ${process.env.PORT || 5000}`);
    });
};

start();
