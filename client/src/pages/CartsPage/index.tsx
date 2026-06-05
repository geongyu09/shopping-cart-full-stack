import ErrorBoundary from "@components/common/shared/ErrorBoundary";
import Header from "@components/common/shared/Header";
import Logo from "@components/common/shared/Logo";
import CartsSection from "@components/feature/CartsSection";
import { Suspense } from "react";

export default function CartsPage() {
  return (
    <>
      <Header LeftComponent={<Logo />} />
      <ErrorBoundary>
        <Suspense fallback={<div>loading...</div>}>
          <CartsSection />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
