import useCartQuantityUpdateMutation from "@hooks/useCartQuantityUpdateMutation";
import useCartItemDeleteMutation from "@hooks/useCartItemDeleteMutation";
import type { Product } from "@/types/cartProduct";
import Button from "@components/common/Button";
import CartHeading from "@components/common/CartHeading";
import CartList from "@components/common/CartList";
import CartOrderAmount from "@components/common/CartOrderAmount";
import PositionBottom from "@components/common/PositionBottom";
import Spacing from "@components/common/Spacing";
import styled from "@emotion/styled";
import useCartQuery from "@hooks/useCartQuery";
import useCheckedItems from "@hooks/useCheckedItems";
import useOrderConfirmNavigate from "@/hooks/useOrderConfirmNavigate";
import {
  getCheckedItemsFromLocalStorage,
  removeCheckedItemsFromLocalStorage,
  setCheckedItemsToLocalStorage,
} from "./libs/localstorage";

export default function CartsSection() {
  const { data } = useCartQuery();
  const { mutate: quantityMutate } = useCartQuantityUpdateMutation();
  const { mutate: deleteMutate } = useCartItemDeleteMutation();
  const { navigate } = useOrderConfirmNavigate();

  const initialCheckedItems =
    getCheckedItemsFromLocalStorage().length === 0
      ? (data ?? []).map(({ product }) => product.id)
      : getCheckedItemsFromLocalStorage();

  const { checkedItems, select, unselect, unselectAll } =
    useCheckedItems<Product["id"]>(initialCheckedItems);

  if (!data) {
    return null;
  }

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

    setCheckedItemsToLocalStorage([
      ...new Set([...checkedItems, ...data.map(({ product }) => product.id)]),
    ]);
    data.forEach(({ product }) => {
      select(product.id);
    });
  };

  const handleSelect = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItemsToLocalStorage(checkedItems.filter((item) => item !== id));
      return unselect(id);
    }

    setCheckedItemsToLocalStorage([...new Set([...checkedItems, id])]);
    select(id);
  };

  const handleQuantityChange = (id: number, type: "plus" | "minus") => {
    const target = data.find((d) => d.product.id === id);
    if (!target) return;
    const nextQuantity = target.quantity + (type === "plus" ? 1 : -1);
    quantityMutate(id, nextQuantity);
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
            onPlus={(id) => handleQuantityChange(id, "plus")}
            onMinus={(id) => handleQuantityChange(id, "minus")}
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
