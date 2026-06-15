import express from "express";
import { CartsController } from "./controller/carts.controller";
import { InMemoryCartRepository } from "./repository/carts.repository";
import { CartsService } from "./service/carts.service";

export const cartsRouter = express.Router();

const cartsRepository = new InMemoryCartRepository();
const cartsService = new CartsService(cartsRepository);

const cartsController = new CartsController(cartsService);

cartsRouter.get("/", cartsController.getCarts);
cartsRouter.patch("/:id", cartsController.updateCartQuantity);
cartsRouter.delete("/:id", cartsController.deleteCartProduct);
