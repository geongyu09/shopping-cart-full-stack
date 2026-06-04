import Spacing from "@components/common/Spacing";
import styled from "@emotion/styled";

export default function OrderAmountContent() {
  return (
    <>
      <OrderAmountHeading>총 결제 금액</OrderAmountHeading>
      <Spacing size={0.75} />
      <OrderAmountDescription>120,000원</OrderAmountDescription>
    </>
  );
}

const OrderAmountHeading = styled.h3`
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
`;

const OrderAmountDescription = styled.p`
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
`;
