import Button from "@components/common/Button";
import OrderAmountContent from "@components/common/OrderAmountContent";
import OrderConfirmContent from "@components/common/OrderConfirmContent";
import PositionBottom from "@components/common/PositionBottom";
import Spacing from "@components/common/Spacing";
import styled from "@emotion/styled";
import useOrderConfirmNavigate from "@hooks/useOrderConfirmNavigate";

function calcTotalQuantity(products: { quantity: number }[]) {
  return products.reduce((acc, product) => acc + product.quantity, 0);
}

export default function OrderConfirmSection() {
  const { getState } = useOrderConfirmNavigate();
  const state = getState();

  if (!state) {
    return null;
  }

  const { products, totalAmount } = state;

  return (
    <ContentContainer>
      <OrderConfirmContent
        productCount={products.length}
        totalQuantity={calcTotalQuantity(products)}
      />
      <Spacing size={1.5} />
      <OrderAmountContent totalAmount={totalAmount} />

      <PositionBottom>
        <Button fullWidth disabled>
          결제하기
        </Button>
      </PositionBottom>
    </ContentContainer>
  );
}

const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
