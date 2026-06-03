import CartList from "@/components/feature/CartList";
import Header from "@components/common/Header";
import Logo from "@components/common/Logo";
import PositionBottom from "@components/common/PositionBottom";
import Spacing from "@components/common/Spacing";
import CartHeading from "@components/feature/CartHeading";
import OrderConfirmButton from "@components/feature/OrderConfirmButton";
import styled from "@emotion/styled";

export default function CartsPage() {
  return (
    <>
      <Header LeftComponent={<Logo />} />
      <ContentContainer>
        <Spacing size={2.25} />
        <CartHeading />
        <Spacing size={2.25} />
        <CartList />
      </ContentContainer>
      <Spacing size={7} />
      <PositionBottom>
        <OrderConfirmButton />
      </PositionBottom>
    </>
  );
}

const ContentContainer = styled.section`
  width: 100%;
  padding-inline: 1.5rem;
`;
