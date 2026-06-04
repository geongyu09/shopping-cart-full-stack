import useCartQuantityMutation from "@/hooks/useCartQuantityMutation";
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

export default function CartsSection() {
  const { data } = useCartQuery();
  const { mutate: quantityMutate } = useCartQuantityMutation();

  const { checkedItems, select, unselect, unselectAll } =
    useCheckedItems<Product["id"]>();

  if (!data) {
    return null;
  }

  const orderAmount = data.reduce((acc, { product, quantity }) => {
    return (
      acc + (checkedItems.includes(product.id) ? product.price * quantity : 0)
    );
  }, 0);

  const handleSelectAll = () => {
    if (checkedItems.length === data.length) {
      return unselectAll();
    }
    data.forEach(({ product }) => select(product.id));
  };

  const handleSelect = (id: number) => {
    if (checkedItems.includes(id)) {
      return unselect(id);
    }
    select(id);
  };

  const handleQuantityChange = (id: number, type: "plus" | "minus") => {
    const target = data.find((d) => d.product.id === id);
    if (!target) return;
    const nextQuantity = target.quantity + (type === "plus" ? 1 : -1);
    quantityMutate(id, nextQuantity);
  };

  return (
    <ContentContainer>
      <Spacing size={2.25} />
      <CartHeading productCount={data.length || 0} />
      <Spacing size={2.25} />
      <CartList
        cartProducts={data}
        checkedItems={checkedItems}
        onSelectAll={handleSelectAll}
        onSelect={handleSelect}
        onPlus={(id) => handleQuantityChange(id, "plus")}
        onMinus={(id) => handleQuantityChange(id, "minus")}
        onDelete={() => {}}
      />
      <CartOrderAmount orderAmount={orderAmount} />
      <PositionBottom>
        <Button fullWidth disabled={checkedItems.length === 0}>
          주문 확인
        </Button>
      </PositionBottom>
    </ContentContainer>
  );
}

const ContentContainer = styled.section`
  width: 100%;
  padding-inline: 1.5rem;
`;
