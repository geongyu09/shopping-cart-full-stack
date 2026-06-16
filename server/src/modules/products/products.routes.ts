import express from "express";
import { ProductsController } from "./controller/products.controller";
import { InMemoryProductRepository } from "./repository/products.repository";
import { ProductsService } from "./service/products.service";
import { InMemoryCartRepository } from "../carts/repository/carts.repository";
import { CartsService } from "../carts/service/carts.service";

export const productsRouter = express.Router();

const productsRepository = new InMemoryProductRepository();

const cartsRepository = new InMemoryCartRepository();
const cartsService = new CartsService(cartsRepository);

const productsService = new ProductsService(productsRepository, cartsService);

const productsController = new ProductsController(productsService);

productsRouter.get("/", productsController.getProducts);
productsRouter.post("/", productsController.addProduct);
productsRouter.delete("/:id", productsController.deleteProduct);
