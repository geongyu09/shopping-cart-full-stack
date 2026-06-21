import useMutation from "@/queries/useMutation";
import { postDiscountPrice } from "@apis/order/discount-price";

export default function useDiscountPriceMutation() {
  return useMutation({
    mutateFn: postDiscountPrice,
  });
}
