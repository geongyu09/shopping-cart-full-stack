import Header from "@components/common/Header";
import Logo from "@components/common/Logo";
import PositionBottom from "@components/common/PositionBottom";
import Spacing from "@components/common/Spacing";
import CartHeadingSection from "@components/feature/CartHeadingSection";
import CartListSection from "@components/feature/CartListSection";
import CartOrderAmountSection from "@components/feature/CartOrderAmountSection";
import OrderConfirmButton from "@components/feature/OrderConfirmButton";
import styled from "@emotion/styled";

export default function CartsPage() {
  return (
    <>
      <Header LeftComponent={<Logo />} />
      <ContentContainer>
        <Spacing size={2.25} />
        <CartHeadingSection />
        <Spacing size={2.25} />
        <CartListSection />
        <Spacing size={3.25} />
        <CartOrderAmountSection />
      </ContentContainer>
      <Spacing size={7} />
      <PositionBottom>
        <OrderConfirmButton />
      </PositionBottom>
    </>
  );
}

const ContentContainer = styled.div`
  width: 100%;
  padding-inline: 1.5rem;
`;
