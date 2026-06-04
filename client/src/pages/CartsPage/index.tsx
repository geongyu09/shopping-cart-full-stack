import Header from "@components/common/Header";
import Logo from "@components/common/Logo";
import CartsSection from "@components/feature/CartsSection";
import { Suspense } from "react";

export default function CartsPage() {
  return (
    <>
      <Header LeftComponent={<Logo />} />
      <Suspense fallback={<div>loading...</div>}>
        <CartsSection />
      </Suspense>
    </>
  );
}
