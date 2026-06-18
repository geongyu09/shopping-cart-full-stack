import { OrdersDB, OrderInfo } from "../types";

export interface OrderRepository {
  getOrders(): OrdersDB[];
  createOrder(order: OrderInfo): OrdersDB;
}

export class InMemoryOrderRepository implements OrderRepository {
  private orderDB: Map<string, OrdersDB> = new Map();

  private createId(): string {
    return crypto.randomUUID();
  }

  getOrders() {
    const orders = [...this.orderDB.values()];

    return orders;
  }

  createOrder(order: OrderInfo) {
    const orderId = this.createId();

    const newOrder = {
      orderId,
      ...order,
    };

    this.orderDB.set(orderId, newOrder);

    return newOrder;
  }
}
