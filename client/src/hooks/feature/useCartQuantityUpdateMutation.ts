import { patchCartQuantity } from "@/apis/carts/[id]";
import { queryStore } from "@/queries/instance";
import useMutation from "@/queries/useMutation";
import { CART_QUERY_KEY } from "./useCartQuery";

export default function useCartQuantityUpdateMutation() {
  return useMutation({
    mutateFn: patchCartQuantity,
    onSuccess: () => {
      queryStore.invalidate(CART_QUERY_KEY);
    },
  });
}
