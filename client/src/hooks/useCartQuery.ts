import { getCart } from "@apis/carts";
import useSuspenseQuery from "@/queries/useSuspenseQuery";

export const CART_QUERY_KEY = "cart";

export default function useCartQuery() {
  return useSuspenseQuery({
    key: CART_QUERY_KEY,
    queryFn: getCart,
  });
}
