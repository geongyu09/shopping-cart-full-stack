import styled from "@emotion/styled";

interface CartHeadingProps {
  productCount: number;
}

export default function CartHeading({ productCount }: CartHeadingProps) {
  return (
    <CartHeadingContainer>
      <Heading>장바구니</Heading>
      <Description visible={productCount > 0}>
        현재 {productCount}종류의 상품이 담겨있습니다.
      </Description>
    </CartHeadingContainer>
  );
}

const CartHeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Heading = styled.h2`
  font-weight: 700;
  font-size: 24px;
`;

const Description = styled.p<{ visible: boolean }>`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;
