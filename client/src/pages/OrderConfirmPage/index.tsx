import GoBackButton from "@components/common/GoBackButton";
import Header from "@components/common/Header";
import OrderConfirmSection from "@components/feature/OrderConfirmSection";

export default function OrderConfirmPage() {
  return (
    <>
      <Header LeftComponent={<GoBackButton />} />
      <OrderConfirmSection />
    </>
  );
}
