import type { Order, OrderProduct, PriceInfo } from "@/types/order";
import fetcher from "@apis/instance";

const ORDER_API = "/order";

interface GetOrderResponse {
  status: "success" | "error";
  message: string;
  data: Order;
}

export const getOrder = async () => {
  const { data } = await fetcher.get<GetOrderResponse>(`${ORDER_API}`);
  return data;
};

interface PostOrderResponse {
  status: "success" | "error";
  message: string;
  data: {
    orderId: string;
  };
}

export const postOrder = async (
  orderProducts: Pick<OrderProduct, "productId" | "quantity">[],
) => {
  const { data } = await fetcher.post<PostOrderResponse>(`${ORDER_API}`, {
    orderProducts,
  });
  return data;
};

interface PatchOrderResponse {
  status: "success" | "error";
  message: string;
  data: {
    priceInfo: PriceInfo;
  };
}

export const patchOrder = async (
  body: { couponIds: string[] } | { isIsland: boolean },
) => {
  const { data } = await fetcher.patch<PatchOrderResponse>(
    `${ORDER_API}`,
    body,
  );
  return data;
};
