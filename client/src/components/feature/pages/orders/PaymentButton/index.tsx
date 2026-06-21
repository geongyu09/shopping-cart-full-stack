import Button from "@/components/common/shared/ui/Button";
import usePaymentNavigate from "@/hooks/feature/navigate/usePaymentNavigate";
import useOrderQuery from "@/hooks/feature/query/useOrderQuery";

function PaymentButton() {
  const {
    data: {
      orderProducts,
      priceInfo: { orderPrice },
    },
  } = useOrderQuery();
  const { navigate } = usePaymentNavigate();

  const handleClick = () => {
    const state = {
      products: orderProducts,
      totalAmount: orderPrice,
    };
    navigate(state);
  };

  return (
    <Button fullWidth onClick={handleClick}>
      결제하기
    </Button>
  );
}

export default PaymentButton;
