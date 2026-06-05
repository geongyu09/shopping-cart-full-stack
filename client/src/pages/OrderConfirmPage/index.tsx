import GoBackButton from "@components/common/shared/GoBackButton";
import Header from "@components/common/shared/Header";
import OrderConfirmSection from "@components/feature/OrderConfirmSection";

export default function OrderConfirmPage() {
  return (
    <>
      <Header LeftComponent={<GoBackButton />} />
      <OrderConfirmSection />
    </>
  );
}
