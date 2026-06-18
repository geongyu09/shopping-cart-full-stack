import { RequestHandler } from "express";
import { OrdersService } from "../service/orders.service";

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
}
