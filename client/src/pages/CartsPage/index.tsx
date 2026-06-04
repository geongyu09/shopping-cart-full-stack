import CartsSection from "@/components/feature/CartsSection";
import Header from "@components/common/Header";
import Logo from "@components/common/Logo";

export default function CartsPage() {
  return (
    <>
      <Header LeftComponent={<Logo />} />
      <CartsSection />
    </>
  );
}
