import type { Product } from "@/types/cartProduct";
import Button from "@components/common/shared/Button";
import useCartQuery from "@hooks/feature/useCartQuery";
import useCheckedProductItems from "@hooks/feature/useCheckedProductItems";
import useOrderConfirmNavigate from "@hooks/feature/useOrderConfirmNavigate";
import {
  calcDeliveryFee,
  calcOrderAmount,
  calcTotalAmount,
} from "@libs/carts/utils";

function CartConfirmButton() {
  const { data: cartData } = useCartQuery();
  const { navigate: goOrderConfirm } = useOrderConfirmNavigate();
  const { checkedItems } = useCheckedProductItems<Product["id"]>();

  const orderAmount = calcOrderAmount(cartData, checkedItems);
  const deliveryFee = calcDeliveryFee(orderAmount);
  const totalAmount = calcTotalAmount(orderAmount, deliveryFee);

  const isChecked = (id: number) => checkedItems.includes(id);

  const handleConfirm = () => {
    goOrderConfirm({
      totalAmount,
      products: cartData.filter(({ product }) => isChecked(product.id)),
    });
  };

  return (
    <Button
      fullWidth
      disabled={checkedItems.length === 0}
      onClick={handleConfirm}
    >
      주문 확인
    </Button>
  );
}

export default CartConfirmButton;
