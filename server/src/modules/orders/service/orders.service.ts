import { OrderRepository } from "../repository/orders.repository";

export class OrdersService {
  constructor(private ordersRepository: OrderRepository) {}

  getOrders() {
    return this.ordersRepository.getOrders();
  }
}
