import type { Cart } from "@/types/cartProduct";
import fetcher from "@apis/instance";

const CARTS_API = "/carts";

interface PatchCartQuantityResponse {
  status: "success" | "error";
  message: string;
  data: Cart;
}

export interface PatchCartQuantityRequest {
  id: number;
  quantity: number;
}

export const patchCartQuantity = async ({
  id,
  quantity,
}: PatchCartQuantityRequest) => {
  const { data } = await fetcher.patch<PatchCartQuantityResponse>(
    `${CARTS_API}/${id}`,
    { quantity },
  );
  return data;
};

interface DeleteCartItemResponse {
  status: "success" | "error";
  message: string;
  data: {
    id: number;
  };
}

export interface DeleteCartItemRequest {
  id: number;
}

export const deleteCartItem = async ({ id }: DeleteCartItemRequest) => {
  const { data } = await fetcher.delete<DeleteCartItemResponse>(
    `${CARTS_API}/${id}`,
  );
  return data;
};
