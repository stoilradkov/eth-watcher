import express from "express";
import "express-async-errors";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import router from "./configuration/route";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (_, res) => {
    res.send("Server is operational");
});
app.use(router);
app.use(errorHandler);

export { app };
