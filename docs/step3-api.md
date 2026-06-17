# API 명세서

## 1. 공통 규칙

### 1-1. Base URL

```
http://localhost:3000
```

### 1-2. 요청 형식

- 요청 body는 JSON 형식으로 전달한다.
- 요청 body가 필요한 API는 `Content-Type: application/json`을 사용한다.

### 1-3. 응답 형식

- 응답 body는 JSON 형식으로 전달한다.
- 성공 응답은 `{ "status": "success", "message": "...", "data": ... }` 형식으로 반환한다.
- 삭제 성공 응답은 body를 반환하지 않는다.
- 에러 응답은 공통 에러 응답 형식으로 반환한다.

### 1-4. 주요 식별자

| 이름      | 설명      |
| --------- | --------- |
| `order`   | 주문 정보 |
| `coupons` | 쿠폰 정보 |

### 1-5. 상태 코드

| 상태 코드                   | 설명                 |
| --------------------------- | -------------------- |
| `200 OK`                    | 조회, 수정 성공      |
| `201 Created`               | 생성 성공            |
| `204 No Content`            | 삭제 성공            |
| `400 Bad Request`           | 잘못된 요청          |
| `404 Not Found`             | 존재하지 않는 리소스 |
| `500 Internal Server Error` | 서버 내부 오류       |

### 1-6. 에러 응답

```json
{
  "status": "error",
  "message": "유효하지 않은 쿠폰입니다."
}
```

## 2. 주문 정보 API

### 2-1. 주문 정보 조회

```http
GET /order
```

#### Request

없음

#### Response

`200 OK`

```json
{
  "status": "success",
  "message": "주문 정보를 정상적으로 조회하였습니다.",
  "data": {
    "orderId": "order-20260612-0001",
    "orderProducts": [
      {
        "productId": "prod-1001",
        "productName": "상품A",
        "productPrice": 16000,
        "imgUrl": "./asset/imageA.png",
        "quantity": 2
      },
      {
        "productId": "prod-1002",
        "productName": "상품B",
        "productPrice": 11000,
        "imgUrl": "./asset/imageB.png",
        "quantity": 1
      }
    ],
    "isIsland": false,
    "couponIds": ["coupon-5000", "coupon-night10"],
    "priceInfo": {
      "orderPrice": 58000,
      "discountPrice": 10800,
      "DeliveryFee": 3000,
      "totalPrice": 50200
    }
  }
}
```

#### Error

없음

---

### 2-2. 주문 정보 추가

```http
POST /order
```

#### Request

```json
{
  "orderProducts": [
    {
      "productId": "prod-1001",
      "quantity": 2
    },
    {
      "productId": "prod-1002",
      "quantity": 1
    }
  ]
}
```

- 그 외 속성값들은 모두 내부적으로 초기화

| 이름            | 필수 여부 | 설명                                                         |
| --------------- | --------- | ------------------------------------------------------------ |
| `orderProducts` | 필수      | 빈 배열인 경우                                               |
| `productId`     | 필수      | productId가 유효하지 않거나 존재하지 않은 상품인 경우        |
| `quantity`      | 필수      | quantity가 유효하지 않거나 수량이 1 이상 99 이하가 아닌 경우 |

#### Response

`201 Created`

```json
{
  "status": "success",
  "message": "주문 정보를 정상적으로 추가하였습니다.",
  "data": {
    "orderId": "order-20260612-0001"
  }
}
```

#### Error

Request 필드 안에 필수 필드가 정의되지 않았거나, 필드 값이 유효하지 않을 때 `400 Bad Request`를 응답한다.

```json
{
  "status": "error",
  "message": "유효하지 않은 상품 이름입니다."
}
```

productId에 해당하는 상품이 존재하지 않는 경우 `404 Not Found`를 응답한다.

```json
{
  "status": "error",
  "message": "존재하지 않는 상품 이름입니다."
}
```

---

### 2-3. 주문 정보 수정

```http
PATCH /order
```

#### Request

```json
{
  "couponIds": ["coupon-5000", "coupon-night10"],
  "isIsland": true
}
```

| 이름        | 필수 여부 | 설명                                             |
| ----------- | --------- | ------------------------------------------------ |
| `couponIds` | 선택      | couponIds가 유효하지 않거나 2개 이하가 아닌 경우 |
| `couponIds` | 선택      | couponIds가 존재하지 않는 경우                   |
| `isIsland`  | 선택      | isIsland가 유효하지 않은 경우                    |

#### Response

`200 OK`

```json
{
  "status": "success",
  "message": "주문 정보를 정상적으로 수정하였습니다.",
  "data": {
    "priceInfo": {
      "orderPrice": 58000,
      "discountPrice": 10800,
      "DeliveryFee": 6000,
      "totalPrice": 53200
    }
  }
}
```

#### Error

Request 필드 안에 필수 필드가 정의되지 않았거나, 필드 값이 유효하지 않을 때 `400 Bad Request`를 응답한다.

```json
{
  "status": "error",
  "message": "유효하지 않은 쿠폰입니다."
}
```

couponIds에 해당하는 쿠폰이 존재하지 않는 경우 `404 Not Found`를 응답한다.

```json
{
  "status": "error",
  "message": "존재하지 않는 쿠폰입니다."
}
```

### 2-4. 할인율 계산

```http
POST /order/discount-price
```

#### Request

```json
{
  "couponIds": ["coupon-5000", "coupon-night10"]
}
```

| 이름        | 필수 여부 | 설명                           |
| ----------- | --------- | ------------------------------ |
| `couponIds` | 선택      | couponIds가 유효하지 않은 경우 |
| `couponIds` | 선택      | couponIds가 존재하지 않는 경우 |

#### Response

`200 OK`

```json
{
  "status": "success",
  "message": "할인 금액을 정상적으로 계산하였습니다.",
  "data": {
    "discountPrice": 6000
  }
}
```

#### Error

Request 필드 안에 필수 필드가 정의되지 않았거나, 필드 값이 유효하지 않을 때 `400 Bad Request`를 응답한다.

```json
{
  "status": "error",
  "message": "유효하지 않은 쿠폰입니다."
}
```

couponIds에 해당하는 쿠폰이 존재하지 않는 경우 `404 Not Found`를 응답한다.

```json
{
  "status": "error",
  "message": "존재하지 않는 쿠폰입니다."
}
```

## 3. 쿠폰 정보 API

### 3-1. 쿠폰 목록 조회

```http
GET /coupons
```

#### Request

없음

#### Response

`200 OK`

```json
{
  "status": "success",
  "message": "쿠폰 목록을 정상적으로 조회하였습니다.",
  "data": {
    "couponList": [
      {
        "couponId": "FIXED5000",
        "couponName": "5,000원 할인 쿠폰",
        "isDisabled": false,
        "couponExpiration": 1796050799000,
        "option": "최소 주문 금액: 100,000원"
      },
      {
        "couponId": "BOGO",
        "couponName": "2개 구매 시 1개 무료 쿠폰",
        "isDisabled": true,
        "couponExpiration": 1782831599000
      },
      {
        "couponId": "FREESHIPPING",
        "couponName": "5만원 이상 구매 시 무료 배송 쿠폰",
        "isDisabled": true,
        "couponExpiration": 1788188399000,
        "option": "최소 주문 금액: 50,000원"
      },
      {
        "couponId": "MIRACLESALE",
        "couponName": "미라클모닝 30% 할인 쿠폰",
        "isDisabled": false,
        "couponExpiration": 1785509999000,
        "option": "사용 가능 시간: 오전 4시부터 7시까지"
      }
    ]
  }
}
```

- couponDB에는 isDisabled 속성이 없지만, BE에서 계산해서 같이 내려준다.

#### Error

없음
