import express from "express";
import { ordersController } from "./orders.module";

export const ordersRouter = express.Router();

ordersRouter.get("/", ordersController.getOrders);
