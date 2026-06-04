import { getCart } from "@apis/carts";
import useQuery from "@/queries/useQuery";

export const CART_QUERY_KEY = "cart";

export default function useCartQuery() {
  return useQuery({
    key: CART_QUERY_KEY,
    queryFn: getCart,
  });
}
