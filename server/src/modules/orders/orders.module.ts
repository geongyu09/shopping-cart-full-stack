import { OrdersController } from "./controller/orders.controller";
import { InMemoryOrderRepository } from "./repository/orders.repository";
import { OrdersService } from "./service/orders.service";

const ordersRepository = new InMemoryOrderRepository();

export const ordersService = new OrdersService(ordersRepository);

export const ordersController = new OrdersController(ordersService);
