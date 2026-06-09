import type { QuantityRange } from "@/types/cartProduct";
import minus from "@assets/minus.svg";
import plus from "@assets/plus.svg";
import styled from "@emotion/styled";
import { COLOR_PALETTE } from "@styles/colorPalette";

interface CartItemProps {
  name: string;
  image: string;
  price: number;
  quantity: number;
  quantityRange: QuantityRange;
  onChangeQuantity: (quantity: number) => void;
}

export default function CartItem({
  name,
  image,
  price,
  quantity,
  quantityRange,
  onChangeQuantity,
}: CartItemProps) {
  return (
    <CartItemInfoContainer>
      <CartItemImg src={image} alt={name} />
      <CartItemInfoWrapper>
        <ProductInfoWrapper>
          <CartItemName>{name}</CartItemName>
          <CartItemPrice>{price.toLocaleString()}원</CartItemPrice>
        </ProductInfoWrapper>
        <QuantityWrapper>
          <QuantityButton
            src={minus}
            disabled={quantity <= quantityRange.min}
            onClick={() =>
              onChangeQuantity(Math.max(quantityRange.min, quantity - 1))
            }
          />
          <Quantity>{quantity}</Quantity>
          <QuantityButton
            src={plus}
            disabled={quantity >= quantityRange.max}
            onClick={() =>
              onChangeQuantity(Math.min(quantityRange.max, quantity + 1))
            }
          />
        </QuantityWrapper>
      </CartItemInfoWrapper>
    </CartItemInfoContainer>
  );
}

const CartItemInfoContainer = styled.div`
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

  :disabled {
    opacity: 0.2;
  }
`;

const Quantity = styled.span`
  font-weight: 500;
  font-size: 0.75rem;
  width: 1.5rem;
  text-align: center;
`;
