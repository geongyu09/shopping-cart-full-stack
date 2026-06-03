import CartItem from "@components/common/CartItem";
import CheckBox from "@components/common/CheckBox";
import Spacing from "@components/common/Spacing";
import styled from "@emotion/styled";
import useCartQuery from "@hooks/useCartQuery";
import { useState } from "react";
import type { Product } from "@/types/cartProduct";

export default function CartListSection() {
  const { data } = useCartQuery();

  const [checkedItems, setCheckedItems] = useState<Product["id"][]>([]);

  if (!data) {
    return null;
  }

  const handleSelectAll = () => {
    if (checkedItems.length === data.length) {
      setCheckedItems([]);
      return;
    }
    setCheckedItems(data.map(({ product }) => product.id));
  };

  const handleSelect = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems((prev) => prev.filter((prevId) => prevId !== id));
      return;
    }
    setCheckedItems((prev) => [...prev, id]);
  };

  return (
    <CartListSectionContainer>
      <SelectAllWrapper>
        <CheckBox
          checked={checkedItems.length === data.length}
          onChange={handleSelectAll}
        />
        전체선택
      </SelectAllWrapper>
      <Spacing size={1.25} />
      <CartListWrapper>
        {data.map(({ product, quantity }) => (
          <CartItem
            key={product.id}
            {...product}
            quantity={quantity}
            checked={checkedItems.includes(product.id)}
            onSelect={() => handleSelect(product.id)}
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
