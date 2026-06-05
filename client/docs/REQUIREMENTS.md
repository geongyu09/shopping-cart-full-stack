# 폴더 구조

```
src/
├── pages/                        # 라우트 단위 페이지
│   ├── CartsPage/
│   │   └── index.tsx
│   └── OrderConfirmPage/
│       └── index.tsx
│
├── components/
│   ├── feature/                  # 도메인 o
│   │   ├── CartsSection/
│   │   │   ├── index.tsx
│   │   │   └── libs/             # 도메인 로직
│   │   │       ├── carts.ts
│   │   │       └── localStorage.ts
│   │   ├── GoBackButton/
│   │   │   └── index.tsx
│   │   └── OrderConfirmSection/
│   │       └── index.tsx
│   └── common/                   # 도메인 x
│       ├── entities/             # 도메인 데이터를 다루는 표현 컴포넌트
│       │   ├── CartHeading/
│       │   ├── CartItem/
│       │   ├── CartList/
│       │   │   ├── index.tsx
│       │   │   └── skeleton.tsx
│       │   ├── CartOrderAmount/
│       │   ├── OrderAmountContent/
│       │   └── OrderConfirmContent/
│       └── shared/               # 범용 UI 컴포넌트
│           ├── Button/
│           ├── CheckBox/
│           ├── Divider/
│           ├── ErrorBoundary/
│           ├── ErrorFallback/
│           ├── Header/
│           ├── Logo/
│           ├── PageLayout/
│           ├── PositionBottom/
│           ├── Skeleton/
│           └── Spacing/
│
├── apis/                         # API 요청 함수
│   ├── instance.ts
│   ├── apiError.ts
│   ├── carts/
│   │   ├── index.ts
│   │   └── [id]/
│   │       └── index.ts
│   └── products/
│       ├── index.ts
│       └── [id]/
│           └── index.ts
│
├── queries/                      # 데이터 패칭 추상화 (suspense query, mutation 등)
│   ├── instance.ts
│   ├── useSuspenseQuery.ts
│   ├── useMutation.ts
│   └── stores/
│       └── queryStore.ts
│
├── hooks/                        # 공용 훅
│   ├── useCartQuery.ts
│   ├── useCartItemDeleteMutation.ts
│   ├── useCartQuantityUpdateMutation.ts
│   ├── useCheckedItems.ts
│   ├── useGoBackNavigate.ts
│   └── useOrderConfirmNavigate.ts
│
├── utils/
│   └── localStorage.ts
│
├── types/
│   └── cartProduct.ts
│
├── constants/
│   └── routes.ts
│
├── styles/
│   ├── colorPalette.ts
│   └── globalStyle.css
│
├── mocks/                        # MSW 모킹
│   ├── browser.ts
│   └── handlers.ts
│
├── tests/                        # 통합 테스트
│   ├── cart.integration.test.tsx
│   └── setup/
│       ├── renderCartsApp.tsx
│       └── server.ts
│
├── assets/                       # 정적 리소스 (svg 등)
│
├── App.tsx
└── main.tsx
```

- feature -> common 단방향 의존성
- feature <-> feature?
- common <-> common?

# 라이브러리

- 스타일링: emotion
  - 동적인 스타일링이 쉬운 css-in-js방식.
  - styled-components는 지원 중단.
- 라우팅: react-router

# 기능 요구 사항

- [x] MSW 모킹
- [x] 장바구니 페이지
- [x] 주문 확인 페이지
- [x] api 유틸 구현
- [x] 공통 컴포넌트
  - [x] 버튼
  - [x] 헤더 wrapper/레이아웃
  - [x] 체크박스
  - [x] bottom 포지셔닝 컴포넌트

---

- [x] 장바구니 API를 호출하여 장바구니 상품 데이터를 불러온다.
- [x] 불러온 데이터를 기반으로 클라이언트 상태를 구성하고 관리한다.
  - [x] 상품의 선택 여부, 결제 금액, 배송비 등의 상태를 관리한다.
  - [x] 상품 선택 여부는 새로고침 시에도 유지되도록 한다.

- [x] 상품 선택에 따른 결제 금액, 배송비 등의 동적인 변경 사항을 처리한다.
  - [x] 진입 시, 전체 선택 되어 있는 것이 디폴트이다.
  - [x] 상품 선택/해제 시 결제 금액을 동적으로 변경한다.
  - [x] 결제 금액이 10만원 이상일 경우 배송비는 무료이다.

- [x] 장바구니 상품의 수량을 변경할 수 있다. (최대 99개)
- [x] 장바구니에 담긴 상품을 제거할 수 있다.
- [x] 상품명은 최대 100자이다.
