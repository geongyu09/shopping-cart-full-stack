import type { Product } from "@/types/cartProduct";
import Button from "@components/common/Button";
import CartHeading from "@components/common/CartHeading";
import CartList from "@components/common/CartList";
import CartOrderAmount from "@components/common/CartOrderAmount";
import PositionBottom from "@components/common/PositionBottom";
import Spacing from "@components/common/Spacing";
import styled from "@emotion/styled";
import useCartQuery from "@hooks/useCartQuery";
import { useState } from "react";

export default function CartsSection() {
  const { data } = useCartQuery();

  const [checkedItems, setCheckedItems] = useState<Product["id"][]>([]);

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
    <ContentContainer>
      <Spacing size={2.25} />
      <CartHeading productCount={data.length || 0} />
      <Spacing size={2.25} />
      <CartList
        cartProducts={data}
        checkedItems={checkedItems}
        onSelectAll={handleSelectAll}
        onSelect={handleSelect}
        onPlus={() => {}}
        onMinus={() => {}}
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
