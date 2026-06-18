import { RequestHandler } from "express";
import { OrdersService } from "../service/orders.service";
import { CreateOrderProductSchema } from "../schema/orders.schema";

export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  getOrders: RequestHandler = (_, res) => {
    const orders = this.ordersService.getOrders();

    res.status(200).json({
      status: "success",
      message: "주문 정보를 정상적으로 조회하였습니다.",
      data: orders,
    });
  };

  postOrders: RequestHandler = (req, res) => {
    const orderProducts = new CreateOrderProductSchema(req.body);

    const orderWithPriceInfo = this.ordersService.createOrder(orderProducts);

    res.status(200).json({
      status: "success",
      message: "주문 정보를 정상적으로 조회하였습니다.",
      data: orderWithPriceInfo,
    });
  };
}
