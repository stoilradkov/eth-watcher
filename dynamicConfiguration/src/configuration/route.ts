import express from "express";
import * as routeHandlers from "./routes";

const router = express.Router();
Object.values(routeHandlers).forEach(handler => handler(router));
export default router;
