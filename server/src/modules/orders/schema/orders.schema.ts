import { OrderProduct } from "../types";

export class CreateOrderProductSchema {
  orderProducts: OrderProduct[];

  constructor(orderProducts: unknown) {
    if (!Array.isArray(orderProducts)) {
      throw new Error("주문 상품 정보는 배열이어야 합니다.");
    }

    orderProducts.every((orderProduct: unknown) => {
      if (typeof orderProduct !== "object" || orderProduct === null) {
        throw new Error("유효하지 않은 상품 이름입니다.");
      }
      if (
        !("productId" in orderProduct) ||
        typeof orderProduct.productId !== "string"
      ) {
        throw new Error("유효하지 않은 상품입니다.");
      }
      if (
        !("quantity" in orderProduct) ||
        typeof orderProduct.quantity !== "number"
      ) {
        throw new Error("유효하지 않은 상품 수량입니다.");
      }
    });

    this.orderProducts = orderProducts;
  }
}
