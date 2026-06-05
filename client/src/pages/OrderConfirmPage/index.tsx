import GoBackButton from "@components/feature/GoBackButton";
import Header from "@components/common/shared/Header";
import PageLayout from "@components/common/shared/PageLayout";
import OrderConfirmSection from "@components/feature/OrderConfirmSection";

export default function OrderConfirmPage() {
  return (
    <PageLayout>
      <Header LeftComponent={<GoBackButton />} />
      <OrderConfirmSection />
    </PageLayout>
  );
}
