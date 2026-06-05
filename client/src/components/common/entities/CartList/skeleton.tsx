import Divider from "@components/common/shared/Divider";
import Skeleton from "@components/common/shared/Skeleton";
import Spacing from "@components/common/shared/Spacing";
import styled from "@emotion/styled";

interface CartListSkeletonProps {
  count?: number;
}

export default function CartListSkeleton({ count = 3 }: CartListSkeletonProps) {
  return (
    <CartListSkeletonContainer data-testid="cart-list-skeleton">
      <SelectAllWrapper>
        <Skeleton width="1.25rem" height="1.25rem" borderRadius="0.25rem" />
        <Skeleton width="4rem" height="0.9375rem" />
      </SelectAllWrapper>
      <Spacing size={1.25} />
      <CartItemSkeletonList>
        {Array.from({ length: count }).map((_, index) => (
          <CartItemSkeleton key={index}>
            <Divider />
            <Spacing size={0.75} />
            <ActionButtonWrapper>
              <Skeleton
                width="1.25rem"
                height="1.25rem"
                borderRadius="0.25rem"
              />
              <Skeleton
                width="2.75rem"
                height="1.5rem"
                borderRadius="0.25rem"
              />
            </ActionButtonWrapper>
            <Spacing size={0.75} />
            <CartItemInfoContainer>
              <Skeleton width="7rem" height="7rem" borderRadius="0.5rem" />
              <CartItemInfoWrapper>
                <ProductInfoWrapper>
                  <Skeleton width="60%" height="0.9375rem" />
                  <Skeleton width="40%" height="1.5rem" />
                </ProductInfoWrapper>
                <QuantityWrapper>
                  <Skeleton
                    width="1.5rem"
                    height="1.5rem"
                    borderRadius="0.5rem"
                  />
                  <Skeleton width="1.5rem" height="0.9375rem" />
                  <Skeleton
                    width="1.5rem"
                    height="1.5rem"
                    borderRadius="0.5rem"
                  />
                </QuantityWrapper>
              </CartItemInfoWrapper>
            </CartItemInfoContainer>
          </CartItemSkeleton>
        ))}
      </CartItemSkeletonList>
    </CartListSkeletonContainer>
  );
}

const CartListSkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectAllWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const CartItemSkeletonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const CartItemSkeleton = styled.div``;

const ActionButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartItemInfoContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const CartItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const QuantityWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
