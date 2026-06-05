import Divider from "@components/common/shared/Divider";
import info from "@assets/info.svg";
import Spacing from "@components/common/shared/Spacing";
import styled from "@emotion/styled";

interface CartOrderAmountProps {
  orderAmount: number;
  deliveryFee: number;
  totalAmount: number;
}

export default function CartOrderAmount({
  orderAmount,
  deliveryFee,
  totalAmount,
}: CartOrderAmountProps) {
  return (
    <CartOrderAmountContainer>
      <OrderAmountInfoWrapper>
        <InfoIcon src={info} alt="정보" />
        <InfoText>
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </InfoText>
      </OrderAmountInfoWrapper>
      <Spacing size={0.75} />
      <Divider />
      <Spacing size={0.75} />
      <CartOrderAmountInfoContainer>
        <CartOrderAmountInfoLabel>총 주문 금액</CartOrderAmountInfoLabel>
        <CartOrderAmountInfoValue>
          {orderAmount.toLocaleString()}원
        </CartOrderAmountInfoValue>
      </CartOrderAmountInfoContainer>
      <Spacing size={0.5} />
      <CartOrderAmountInfoContainer>
        <CartOrderAmountInfoLabel>배송비</CartOrderAmountInfoLabel>
        <CartOrderAmountInfoValue>
          {deliveryFee.toLocaleString()}원
        </CartOrderAmountInfoValue>
      </CartOrderAmountInfoContainer>
      <Spacing size={0.75} />
      <Divider />
      <Spacing size={0.75} />
      <CartOrderAmountInfoContainer>
        <CartOrderAmountInfoLabel>총 결제 금액</CartOrderAmountInfoLabel>
        <CartOrderAmountInfoValue>
          {totalAmount.toLocaleString()}원
        </CartOrderAmountInfoValue>
      </CartOrderAmountInfoContainer>
    </CartOrderAmountContainer>
  );
}

const CartOrderAmountContainer = styled.div``;

const OrderAmountInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const InfoIcon = styled.img`
  width: 0.875rem;
  aspect-ratio: 1/1;
`;

const InfoText = styled.span`
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 0.9375rem;
`;

const CartOrderAmountInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
`;

const CartOrderAmountInfoLabel = styled.span`
  font-weight: 700;
  font-size: 1rem;
  line-height: 1rem;
`;

const CartOrderAmountInfoValue = styled.span`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 100%;
`;
