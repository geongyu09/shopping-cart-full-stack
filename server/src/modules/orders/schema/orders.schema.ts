import ERROR_CODES from "@/ERROR_CODE";
import createAppError from "@/errors/AppError";
import { OrderInfo, OrderProduct, OrdersDB } from "../types";

const checkOrderProduct = (
  orderProduct: unknown,
): orderProduct is OrderProduct => {
  if (typeof orderProduct !== "object" || orderProduct === null) {
    return false;
  }
  if (
    !("productId" in orderProduct) ||
    typeof orderProduct.productId !== "string"
  ) {
    return false;
  }
  if (
    !("quantity" in orderProduct) ||
    typeof orderProduct.quantity !== "number"
  ) {
    return false;
  }
  return true;
};

export const validateCreateOrder = (body: unknown): OrderProduct[] => {
  if (!body || typeof body !== "object" || !("orderProducts" in body)) {
    throw createAppError(ERROR_CODES.INVALID_ORDER_PRODUCTS);
  }

  const { orderProducts } = body as { orderProducts: unknown };

  if (!Array.isArray(orderProducts) || orderProducts.length === 0) {
    throw createAppError(ERROR_CODES.INVALID_ORDER_PRODUCTS);
  }

  if (!orderProducts.every(checkOrderProduct)) {
    throw createAppError(ERROR_CODES.INVALID_ORDER_PRODUCTS);
  }

  for (const { quantity } of orderProducts) {
    if (quantity < 1 || quantity > 99) {
      throw createAppError(ERROR_CODES.OUT_OF_RANGE_ORDER_QUANTITY);
    }
  }

  return orderProducts;
};

export class UpdateOrderSchema {
  key: keyof Pick<OrdersDB, "couponIds" | "isIsland">;
  value: OrderInfo[typeof this.key];

  constructor(body: unknown) {
    if (
      body === null ||
      typeof body !== "object" ||
      !("key" in body) ||
      !("value" in body)
    ) {
      throw new Error("유효하지 않은 요청입니다.");
    }

    const { key, value } = body;

    if (key !== "couponIds" && key !== "isIsland") {
      throw new Error("유효하지 않은 요청입니다.");
    }

    if (key === "couponIds") {
      if (
        !Array.isArray(value) ||
        !value.every((id) => typeof id === "string")
      ) {
        throw new Error("올바르지 않은 쿠폰 ID입니다.");
      }
    } else if (key === "isIsland" && typeof value !== "boolean") {
      throw new Error("올바르지 않은 도서 산간 정보입니다.");
    } else throw new Error("유효하지 않은 요청입니다.");

    this.key = key;
    this.value = value;
  }
}
