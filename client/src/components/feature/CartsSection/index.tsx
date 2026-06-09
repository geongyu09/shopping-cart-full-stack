import type { Product } from "@/types/cartProduct";
import CartHeading from "@components/common/entities/CartHeading";
import CartItem from "@components/common/entities/CartItem";
import CartOrderAmount from "@components/common/entities/CartOrderAmount";
import Button from "@components/common/shared/Button";
import CheckBox from "@components/common/shared/CheckBox";
import PositionBottom from "@components/common/shared/PositionBottom";
import Spacing from "@components/common/shared/Spacing";
import styled from "@emotion/styled";
import useCartItemDeleteMutation from "@hooks/useCartItemDeleteMutation";
import useCartQuantityUpdateMutation from "@hooks/useCartQuantityUpdateMutation";
import useCartQuery from "@hooks/useCartQuery";
import useCheckedItems from "@hooks/useCheckedItems";
import useOrderConfirmNavigate from "@hooks/useOrderConfirmNavigate";
import {
  calcDeliveryFee,
  calcOrderAmount,
  calcTotalAmount,
  makeCheckedItem,
} from "./libs/carts";
import {
  getCheckedItemsFromLocalStorage,
  replaceCheckedItemsInLocalStorage,
  // removeCheckedItemsFromLocalStorage,
  // setCheckedItemsToLocalStorage,
} from "./libs/localStorage";
import Divider from "@components/common/shared/Divider";
import { COLOR_PALETTE } from "@styles/colorPalette";
import { useEffect } from "react";
import CartsSectionSkeleton from "./skeleton";

function CartsSection() {
  const { data: cartData } = useCartQuery();
  const { mutate: quantityMutate } = useCartQuantityUpdateMutation();
  const { mutate: deleteMutate } = useCartItemDeleteMutation();
  const { navigate: goOrderConfirm } = useOrderConfirmNavigate();

  const storedCheckedItems = getCheckedItemsFromLocalStorage().filter((id) =>
    cartData.some(({ product }) => product.id === id),
  );

  const initialCheckedItems =
    storedCheckedItems.length === 0
      ? makeCheckedItem(cartData)
      : storedCheckedItems;

  const { checkedItems, select, unselect, unselectAll } =
    useCheckedItems<Product["id"]>(initialCheckedItems);

  const orderAmount = calcOrderAmount(cartData, checkedItems);
  const deliveryFee = calcDeliveryFee(orderAmount);
  const totalAmount = calcTotalAmount(orderAmount, deliveryFee);
  const isAllChecked = cartData.every(({ product }) =>
    checkedItems.includes(product.id),
  );
  const isChecked = (id: number) => checkedItems.includes(id);

  const handleSelectAll = () => {
    if (isAllChecked) return unselectAll();

    cartData.forEach(({ product }) => select(product.id));
  };

  const handleSelect = (id: number) => {
    if (isChecked(id)) return unselect(id);

    select(id);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    quantityMutate(id, quantity);
  };

  const handleDelete = (id: number) => {
    deleteMutate(id);
    unselect(id);
  };

  const handleConfirm = () => {
    goOrderConfirm({
      totalAmount,
      products: cartData.filter(({ product }) => isChecked(product.id)),
    });
  };

  useEffect(
    function updateCheckedItemsInLocalStorage() {
      replaceCheckedItemsInLocalStorage(checkedItems);
    },
    [checkedItems, cartData],
  );

  return (
    <ContentContainer>
      <Spacing size={2.25} />
      <CartHeading productCount={cartData.length} />
      <Spacing size={2.25} />
      {cartData.length !== 0 ? (
        <>
          <CartListContainer>
            <SelectAllWrapper>
              <CheckBox
                checked={isAllChecked}
                onChange={() => handleSelectAll()}
              />
              전체선택
            </SelectAllWrapper>
            <Spacing size={1.25} />
            <CartListWrapper>
              {cartData.map(({ product, quantity }) => (
                <CartItemContainer key={product.id}>
                  <Divider />
                  <Spacing size={0.75} />
                  <ActionButtonWrapper>
                    <CheckBox
                      checked={checkedItems.includes(product.id)}
                      onChange={() => handleSelect(product.id)}
                    />
                    <DeleteButton onClick={() => handleDelete(product.id)}>
                      삭제
                    </DeleteButton>
                  </ActionButtonWrapper>
                  <Spacing size={0.75} />
                  <CartItem
                    {...product}
                    quantity={quantity}
                    quantityRange={{ min: 1, max: 99 }}
                    onChangeQuantity={(newQuantity) =>
                      handleQuantityChange(product.id, newQuantity)
                    }
                  />
                </CartItemContainer>
              ))}
            </CartListWrapper>
            <Spacing size={3.25} />
          </CartListContainer>
        </>
      ) : (
        <EmptyCartContainer>
          <EmptyCartText>장바구니에 담은 상품이 없습니다.</EmptyCartText>
        </EmptyCartContainer>
      )}

      {cartData.length !== 0 && (
        <CartOrderAmount
          orderAmount={orderAmount}
          deliveryFee={deliveryFee}
          totalAmount={totalAmount}
        />
      )}

      <PositionBottom>
        <Button
          fullWidth
          disabled={checkedItems.length === 0}
          onClick={handleConfirm}
        >
          주문 확인
        </Button>
      </PositionBottom>
    </ContentContainer>
  );
}

CartsSection.Skeleton = CartsSectionSkeleton;

export default CartsSection;

const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const EmptyCartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const EmptyCartText = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
`;

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

const CartItemContainer = styled.li``;

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
