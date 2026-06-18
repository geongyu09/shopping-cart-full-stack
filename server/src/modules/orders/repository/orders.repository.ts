import { OrdersDB } from "../types";

export interface OrderRepository {
  getOrders(): OrdersDB[];
}

export class InMemoryOrderRepository implements OrderRepository {
  private orderDB: Map<string, OrdersDB> = new Map();

  getOrders() {
    const orders = [...this.orderDB.values()];

    return orders;
  }
}
