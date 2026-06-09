import ErrorBoundary from "@components/common/shared/ErrorBoundary";
import ErrorFallback from "@components/common/shared/ErrorFallback";
import Header from "@components/common/shared/Header";
import Logo from "@components/common/shared/Logo";
import PageLayout from "@components/common/shared/PageLayout";
import Spacing from "@components/common/shared/Spacing";
import CartsSection from "@components/feature/CartsSection";
import styled from "@emotion/styled";
import { Suspense } from "react";

export default function CartsPage() {
  return (
    <PageLayout>
      <Header LeftComponent={<Logo />} />
      <ContentArea>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense fallback={<CartsSection.Skeleton />}>
            <CartsSection />
            <Spacing size={7} />
          </Suspense>
        </ErrorBoundary>
      </ContentArea>
    </PageLayout>
  );
}

const ContentArea = styled.div`
  width: 100%;
  padding-inline: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
`;
