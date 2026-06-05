import Spacing from "@components/common/shared/Spacing";
import styled from "@emotion/styled";

interface OrderConfirmContentProps {
  productCount: number;
  totalQuantity: number;
}

export default function OrderConfirmContent({
  productCount,
  totalQuantity,
}: OrderConfirmContentProps) {
  return (
    <>
      <OrderConfirmHeading>주문 확인</OrderConfirmHeading>
      <Spacing size={1.5} />
      <OrderConfirmDescription>
        총 {productCount}종류의 상품 {totalQuantity}개를 주문합니다.
      </OrderConfirmDescription>
      <OrderConfirmDescription>
        최종 결제 금액을 확인해 주세요.
      </OrderConfirmDescription>
    </>
  );
}

const OrderConfirmHeading = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
`;

const OrderConfirmDescription = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
`;
