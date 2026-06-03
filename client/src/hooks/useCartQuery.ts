import { getCart } from "@apis/carts";
import useQuery from "@/queries/useQuery";

export default function useCartQuery() {
  return useQuery({
    key: "cart",
    queryFn: getCart,
  });
}
