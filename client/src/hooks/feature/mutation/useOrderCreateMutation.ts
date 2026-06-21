import { queryStore } from "@/queries/instance";
import useMutation from "@/queries/useMutation";
import { postOrder } from "@apis/order";
import { ORDER_QUERY_KEY } from "@hooks/feature/query/useOrderQuery";

export default function useOrderCreateMutation() {
  return useMutation({
    mutateFn: postOrder,
    onSuccess: () => {
      queryStore.invalidate(ORDER_QUERY_KEY);
    },
  });
}
