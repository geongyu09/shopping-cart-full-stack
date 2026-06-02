import minus from "@assets/minus.svg";
import plus from "@assets/plus.svg";
import CheckBox from "@components/common/CheckBox";
import Spacing from "@components/common/Spacing";
import styled from "@emotion/styled";
import { COLOR_PALETTE } from "@styles/colorPalette";

export default function CartListSection() {
  return (
    <CartListSectionContainer>
      <SelectAllWrapper>
        <CheckBox />
        전체선택
      </SelectAllWrapper>
      <Spacing size={1.25} />
      <CartListWrapper>
        {[1, 2, 3].map((item) => (
          <li key={item}>
            <Divider />
            <Spacing size={0.75} />
            <ActionButtonWrapper>
              <CheckBox />
              <DeleteButton>삭제</DeleteButton>
            </ActionButtonWrapper>
            <Spacing size={0.75} />
            <CartItemContainer>
              <CartItemImg src="" alt="" />
              <CartItemInfoWrapper>
                <ProductInfoWrapper>
                  <CartItemName>상품 이름</CartItemName>
                  <CartItemPrice>10,000원</CartItemPrice>
                </ProductInfoWrapper>
                <QuantityWrapper>
                  <QuantityButton src={minus} />
                  <Quantity>1</Quantity>
                  <QuantityButton src={plus} />
                </QuantityWrapper>
              </CartItemInfoWrapper>
            </CartItemContainer>
          </li>
        ))}
      </CartListWrapper>
    </CartListSectionContainer>
  );
}

const CartListSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectAllWrapper = styled.label`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 0.9375rem;
`;

const CartListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  background-color: ${COLOR_PALETTE.border};
`;

const ActionButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid ${COLOR_PALETTE.border};
  background-color: ${COLOR_PALETTE.white};
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 0.9375rem;

  :active {
    background-color: ${COLOR_PALETTE.border};
  }
`;

const CartItemContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const CartItemImg = styled.img`
  width: 7rem;
  aspect-ratio: 1/1;
  border-radius: 0.5rem;
  border: none;
  background-color: ${COLOR_PALETTE["image-placeholder"]};
`;

const CartItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const CartItemName = styled.p`
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 0.9375rem;
`;

const CartItemPrice = styled.p`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 100%;
`;

const QuantityWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const QuantityButton = styled.button<{ src: string }>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${COLOR_PALETTE.border};
  background-color: ${COLOR_PALETTE.white};
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1rem;
  background-image: url("${(props) => props.src}");
  background-repeat: no-repeat;
  background-position: center;

  :active {
    background-color: ${COLOR_PALETTE.border};
  }
`;

const Quantity = styled.span`
  font-weight: 500;
  font-size: 0.75rem;
  width: 1.5rem;
  text-align: center;
`;
