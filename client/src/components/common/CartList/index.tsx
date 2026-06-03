import type { Cart, Product } from "@/types/cartProduct";
import CartItem from "@components/common/CartItem";
import CheckBox from "@components/common/CheckBox";
import Spacing from "@components/common/Spacing";
import styled from "@emotion/styled";

interface CartListProps {
  cartProducts: Cart[];
  checkedItems: Product["id"][];
  onSelectAll: () => void;
  onSelect: (id: Product["id"]) => void;
  onPlus: (id: Product["id"]) => void;
  onMinus: (id: Product["id"]) => void;
  onDelete: (id: Product["id"]) => void;
}

export default function CartList({
  cartProducts,
  checkedItems,
  onDelete,
  onMinus,
  onPlus,
  onSelect,
  onSelectAll,
}: CartListProps) {
  return (
    <CartListContainer>
      <SelectAllWrapper>
        <CheckBox
          checked={checkedItems.length === cartProducts.length}
          onChange={() => onSelectAll()}
        />
        전체선택
      </SelectAllWrapper>
      <Spacing size={1.25} />
      <CartListWrapper>
        {cartProducts.map(({ product, quantity }) => (
          <CartItem
            key={product.id}
            {...product}
            quantity={quantity}
            checked={checkedItems.includes(product.id)}
            onSelect={() => onSelect(product.id)}
            onPlus={() => onPlus(product.id)}
            onMinus={() => onMinus(product.id)}
            onDelete={() => onDelete(product.id)}
          />
        ))}
      </CartListWrapper>
      <Spacing size={3.25} />
    </CartListContainer>
  );
}

const CartListContainer = styled.div`
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
