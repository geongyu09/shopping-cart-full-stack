import type { Cart } from "@/types/cartProduct";
import fetcher from "../../instance";

const CARTS_API = "/carts";

interface PatchCartQuantityResponse {
  status: "success" | "error";
  message: string;
  data: Cart;
}

export const patchCartQuantity = async (id: number, quantity: number) => {
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

export const deleteCartItem = async (id: number) => {
  const { data } = await fetcher.delete<DeleteCartItemResponse>(
    `${CARTS_API}/${id}`,
  );
  return data;
};
