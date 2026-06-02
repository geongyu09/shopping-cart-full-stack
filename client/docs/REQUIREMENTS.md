# 폴더 구조

```
src/
├── pages/
│   ├── pageA/
│   │   ├── pageA.tsx
│   │   └── pageA.test.ts
│   └── pageB/
│       ├── pageB.tsx
│       └── pageB.test.ts
│
├── components/
│   ├── feature/                  # 도메인 o
│   │   └── componentA/
│   │       ├── index.tsx
│   │       ├── type.ts
│   │       ├── hooks/
│   │       │   ├── hookA.ts
│   │       │   ├── hookB.ts
│   │       │   └── ...
│   │       ├── components/
│   │       │   └── ...
│   │       └── libs/             # 일단 보류
│   │           └── ...
│   └── common/                   # 도메인 x
│       └── ...
│
├── utils/                        # 일단 보류
│   └── ...
│
├── hooks/
│   └── hookA.ts
│
└── apis/
    ├── instance.ts
    ├── types.ts
    ├── endpoint1/
    │   ├── apis.ts
    │   └── types.ts
    └── endpoint1/
        ├── [productId]/
        │   ├── api.ts
        │   └── types.ts
        ├── api.ts
        └── types.ts
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

- [ ] MSW 모킹
- [ ] 장바구니 페이지
- [ ] 주문 확인 페이지
- [ ] api 유틸 구현
- [ ] 공통 컴포넌트
  - [ ] 버튼
  - [ ] 헤더 wrapper/레이아웃
  - [ ] 체크박스
  - [ ] bottom 포지셔닝 컴포넌트
  - [ ]

---

- [ ] 장바구니 API를 호출하여 장바구니 상품 데이터를 불러온다.
- [ ] 불러온 데이터를 기반으로 클라이언트 상태를 구성하고 관리한다.
  - [ ] 상품의 선택 여부, 결제 금액, 배송비 등의 상태를 관리한다.
  - [ ] 상품 선택 여부는 새로고침 시에도 유지되도록 한다.

- [ ] 상품 선택에 따른 결제 금액, 배송비 등의 동적인 변경 사항을 처리한다.
  - [ ] 진입 시, 전체 선택 되어 있는 것이 디폴트이다.
  - [ ] 상품 선택/해제 시 결제 금액을 동적으로 변경한다.
  - [ ] 결제 금액이 10만원 이상일 경우 배송비는 무료이다.

- [ ] 장바구니 상품의 수량을 변경할 수 있다. (최대 99개)
- [ ] 장바구니에 담긴 상품을 제거할 수 있다.
- [ ] 상품명은 최대 100자이다.
