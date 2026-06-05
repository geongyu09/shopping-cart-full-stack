import CartHeading from "@components/common/entities/CartHeading";
import CartList from "@components/common/entities/CartList";
import CartOrderAmount from "@components/common/entities/CartOrderAmount";
import Button from "@components/common/shared/Button";
import PositionBottom from "@components/common/shared/PositionBottom";
import useOrderConfirmNavigate from "@/hooks/useOrderConfirmNavigate";
import type { Product } from "@/types/cartProduct";
import Spacing from "@components/common/shared/Spacing";
import styled from "@emotion/styled";
import useCartItemDeleteMutation from "@hooks/useCartItemDeleteMutation";
import useCartQuantityUpdateMutation from "@hooks/useCartQuantityUpdateMutation";
import useCartQuery from "@hooks/useCartQuery";
import useCheckedItems from "@hooks/useCheckedItems";
import {
  getCheckedItemsFromLocalStorage,
  removeCheckedItemsFromLocalStorage,
  setCheckedItemsToLocalStorage,
} from "./libs/localStorage";

export default function CartsSection() {
  const { data } = useCartQuery();
  const { mutate: quantityMutate } = useCartQuantityUpdateMutation();
  const { mutate: deleteMutate } = useCartItemDeleteMutation();
  const { navigate } = useOrderConfirmNavigate();

  const initialCheckedItems =
    getCheckedItemsFromLocalStorage().length === 0
      ? data.map(({ product }) => product.id)
      : getCheckedItemsFromLocalStorage();

  const { checkedItems, select, unselect, unselectAll } =
    useCheckedItems<Product["id"]>(initialCheckedItems);

  const orderAmount = data.reduce((acc, { product, quantity }) => {
    return (
      acc + (checkedItems.includes(product.id) ? product.price * quantity : 0)
    );
  }, 0);

  const deliveryFee = orderAmount >= 100000 ? 0 : 3000;
  const totalAmount = orderAmount + deliveryFee;

  const handleSelectAll = () => {
    if (checkedItems.length === data.length) {
      removeCheckedItemsFromLocalStorage();
      return unselectAll();
    }

    setCheckedItemsToLocalStorage(data.map(({ product }) => product.id));
    data.forEach(({ product }) => select(product.id));
  };

  const handleSelect = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItemsToLocalStorage(checkedItems.filter((item) => item !== id));
      return unselect(id);
    }

    setCheckedItemsToLocalStorage([...new Set([...checkedItems, id])]);
    select(id);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    quantityMutate(id, quantity);
  };

  const handleDelete = (id: number) => {
    deleteMutate(id);
  };

  const handleConfirm = () => {
    navigate({
      totalAmount,
      products: data.filter(({ product }) => checkedItems.includes(product.id)),
    });
  };

  return (
    <ContentContainer>
      <Spacing size={2.25} />
      <CartHeading productCount={data.length} />
      <Spacing size={2.25} />
      {data.length !== 0 ? (
        <>
          <CartList
            cartProducts={data}
            checkedItems={checkedItems}
            onSelectAll={handleSelectAll}
            onSelect={handleSelect}
            quantityRange={{min:1, max:99}}
            onChangeQuantity={handleQuantityChange}
            onDelete={handleDelete}
          />
          <CartOrderAmount
            orderAmount={orderAmount}
            deliveryFee={deliveryFee}
            totalAmount={totalAmount}
          />
          <Spacing size={7} />
        </>
      ) : (
        <EmptyCartContainer>
          <EmptyCartText>장바구니에 담은 상품이 없습니다.</EmptyCartText>
        </EmptyCartContainer>
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

const ContentContainer = styled.section`
  width: 100%;
  padding-inline: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
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
