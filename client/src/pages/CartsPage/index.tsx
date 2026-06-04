import Header from "@components/common/Header";
import Logo from "@components/common/Logo";
import CartsSection from "@components/feature/CartsSection";

export default function CartsPage() {
  return (
    <>
      <Header LeftComponent={<Logo />} />
      <CartsSection />
    </>
  );
}
