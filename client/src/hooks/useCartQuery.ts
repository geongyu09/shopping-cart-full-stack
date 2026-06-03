import { getCart } from "@apis/carts";
import useQuery from "./useQuery";

export default function useCartQuery() {
  return useQuery({
    key: "cart",
    queryFn: getCart,
  });
}
