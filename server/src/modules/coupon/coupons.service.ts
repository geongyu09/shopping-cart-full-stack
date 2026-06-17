import { CouponRepository } from "./coupons.repository";

export class CouponService {
  constructor(private couponRepository: CouponRepository) {}

  calculateDiscountPrice(couponId: string, orderPrice: number) {
    const coupon = this.couponRepository.getCouponById(couponId);

    if (!coupon) {
      throw new Error("유효하지 않은 쿠폰입니다.");
    }

    if (coupon.isDisabled) {
      throw new Error("사용할 수 없는 쿠폰입니다.");
    }

    if (coupon.couponExpiration < Date.now()) {
      throw new Error("만료된 쿠폰입니다.");
    }

    if (orderPrice < coupon.option.minimumOrderPrice) {
      throw new Error("주문 금액이 쿠폰 최소 주문 금액보다 낮습니다.");
    }

    const discountValue =
      coupon.discount.type === "percentage"
        ? (orderPrice * coupon.discount.value) / 100
        : coupon.discount.value;

    return Math.min(discountValue, orderPrice);
  }
}
