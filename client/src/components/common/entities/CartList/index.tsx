import CartItem from "@components/common/entities/CartItem";
import CheckBox from "@components/common/shared/CheckBox";
import type { Cart, Product } from "@/types/cartProduct";
import Spacing from "@components/common/shared/Spacing";
import styled from "@emotion/styled";
import type { QuantityRange } from "@/types/cartProduct";

interface CartListProps {
  cartProducts: Cart[];
  checkedItems: Product["id"][];
  onSelectAll: () => void;
  onSelect: (id: Product["id"]) => void;
  quantityRange: QuantityRange;
  onChangeQuantity: (id: Product["id"], quantity: number) => void;
  onDelete: (id: Product["id"]) => void;
}

export default function CartList({
  cartProducts,
  checkedItems,
  onDelete,
  quantityRange,
  onChangeQuantity,
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
            onDelete={() => onDelete(product.id)}
            quantityRange={quantityRange}
            onChangeQuantity={(newQuantity) =>
              onChangeQuantity(product.id, newQuantity)
            }
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
