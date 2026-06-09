import { http, HttpResponse } from "msw";

// 상품 (Products)

const products = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    name: "무선 헤드폰",
    price: 129000,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    name: "러닝화",
    price: 89000,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    name: "스마트 워치",
    price: 215000,
  },
];

const carts = [
  {
    product: {
      id: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      name: "무선 헤드폰",
      price: 129000,
    },
    quantity: 1,
  },
  {
    product: {
      id: 2,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      name: "러닝화",
      price: 89000,
    },
    quantity: 2,
  },
];

export const handlers = [
  // 상품 목록 조회
  http.get("/api/products", () => {
    return HttpResponse.json(
      {
        status: "success",
        message: "상품 목록을 정상적으로 조회하였습니다.",
        data: products,
      },
      { status: 200 },
    );
  }),

  // 상품 추가
  http.post("/api/products", () => {
    return HttpResponse.json(
      {
        status: "success",
        message: "상품을 정상적으로 등록하였습니다.",
        data: {
          id: 4,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
          name: "새 상품",
          price: 10000,
        },
      },
      { status: 201 },
    );
  }),

  // 상품 삭제
  http.delete("/api/products/:id", () => {
    return HttpResponse.json(
      {
        status: "success",
        message: "상품을 정상적으로 삭제하였습니다.",
        data: {
          id: 1,
        },
      },
      { status: 200 },
    );
  }),

  // 장바구니에 담긴 상품 목록 조회
  http.get("/api/carts", () => {
    return HttpResponse.json(
      {
        status: "success",
        message: "장바구니를 정상적으로 조회하였습니다.",
        data: carts,
      },
      { status: 200 },
    );
  }),

  // 장바구니 상품 수량 변경
  http.patch("/api/carts/:id", () => {
    return HttpResponse.json(
      {
        status: "success",
        message: "장바구니 상품 수량을 정상적으로 변경하였습니다.",
        data: {
          product: {
            id: 1,
            image:
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
            name: "무선 헤드폰",
            price: 129000,
          },
          quantity: 3,
        },
      },
      { status: 200 },
    );
  }),

  // 장바구니에 담긴 상품 제거
  http.delete("/api/carts/:id", () => {
    return HttpResponse.json(
      {
        status: "success",
        message: "장바구니에서 상품을 정상적으로 제거하였습니다.",
        data: {
          id: 1,
        },
      },
      { status: 200 },
    );
  }),
];
