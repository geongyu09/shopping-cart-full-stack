import Button from "@components/common/Button";
import OrderAmountContent from "@components/common/OrderAmountContent";
import OrderConfirmContent from "@components/common/OrderConfirmContent";
import PositionBottom from "@components/common/PositionBottom";
import Spacing from "@components/common/Spacing";
import styled from "@emotion/styled";

export default function OrderConfirmSection() {
  return (
    <ContentContainer>
      <OrderConfirmContent />
      <Spacing size={1.5} />
      <OrderAmountContent />

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
