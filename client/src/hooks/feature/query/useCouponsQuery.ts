import { getCoupons } from "@apis/coupons";
import useSuspenseQuery from "@/queries/useSuspenseQuery";

export const COUPONS_QUERY_KEY = "coupons";

export default function useCouponsQuery() {
  return useSuspenseQuery({
    key: COUPONS_QUERY_KEY,
    queryFn: getCoupons,
  });
}
