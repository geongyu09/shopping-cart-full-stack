import CartItem from "@components/common/CartItem";
import CheckBox from "@components/common/CheckBox";
import Spacing from "@components/common/Spacing";
import styled from "@emotion/styled";
import useCartQuery from "@hooks/useCartQuery";

export default function CartListSection() {
  const { data } = useCartQuery();

  if (!data) {
    return null;
  }

  return (
    <CartListSectionContainer>
      <SelectAllWrapper>
        <CheckBox />
        전체선택
      </SelectAllWrapper>
      <Spacing size={1.25} />
      <CartListWrapper>
        {data.map(({ product: { id, name, price } }) => (
          <CartItem
            key={id}
            name={name}
            price={price}
            quantity={0}
            onPlus={() => {}}
            onMinus={() => {}}
            onDelete={() => {}}
          />
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
