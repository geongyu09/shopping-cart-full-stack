import { CouponRepository } from "../repository/coupons.repository";
import { CouponDB } from "../types";

export interface DiscountContextItem {
  productId: string;
  price: number;
  quantity: number;
}

export interface DiscountContext {
  orderPrice: number;
  deliveryFee: number;
  products: DiscountContextItem[];
}

export class CouponsService {
  constructor(private couponRepository: CouponRepository) {}

  getCouponById(couponId: string) {
    return this.couponRepository.getCouponById(couponId);
  }

  getCouponList() {
    return this.couponRepository.getCoupons().map((coupon) => {
      const option = this.buildCouponOption(coupon);

      return {
        couponId: coupon.couponId,
        couponName: coupon.couponName,
        // couponDB에는 없지만 BE에서 계산해 내려주는 값
        isDisabled: this.isDisabled(coupon),
        couponExpiration: coupon.couponExpiration,
        ...(option ? { option } : {}),
      };
    });
  }

  private isDisabled(coupon: CouponDB): boolean {
    return coupon.isDisabled || coupon.couponExpiration < Date.now();
  }

  private buildCouponOption(coupon: CouponDB): string | undefined {
    const { minimumOrderPrice, duration } = coupon.discountInfo;

    if (minimumOrderPrice > 0) {
      return `최소 주문 금액: ${minimumOrderPrice.toLocaleString("ko-KR")}원`;
    }

    if (duration.startDate !== 0 || duration.endDate !== 24) {
      return `사용 가능 시간: 오전 ${duration.startDate}시부터 ${duration.endDate}시까지`;
    }

    return undefined;
  }

  calculateDiscountPrice(couponId: string, context: DiscountContext): number {
    const coupon = this.couponRepository.getCouponById(couponId);

    if (!coupon) {
      throw new Error("유효하지 않은 쿠폰입니다.");
    }

    if (!this.isUsable(coupon, context.orderPrice)) {
      throw new Error("사용할 수 없는 쿠폰입니다.");
    }

    return this.computeDiscount(coupon, context);
  }

  getBestCoupons(context: DiscountContext, count?: number) {
    return this.getSortedCouponsByDiscountPrice(context).slice(0, count);
  }

  private getSortedCouponsByDiscountPrice(context: DiscountContext) {
    const coupons = this.couponRepository.getCoupons();

    return coupons
      .filter((coupon) => this.isUsable(coupon, context.orderPrice))
      .sort(
        (a, b) =>
          this.computeDiscount(b, context) - this.computeDiscount(a, context),
      );
  }

  private isUsable(coupon: CouponDB, orderPrice: number): boolean {
    if (coupon.isDisabled) return false;
    if (coupon.couponExpiration < Date.now()) return false;
    if (orderPrice < coupon.discountInfo.minimumOrderPrice) return false;
    return true;
  }

  private computeDiscount(coupon: CouponDB, context: DiscountContext): number {
    const { orderPrice, deliveryFee, products } = context;
    const info = coupon.discountInfo;

    let discount: number;

    switch (info.type) {
      case "percentage":
        discount = (orderPrice * info.value) / 100;
        break;
      case "fixed":
        discount = info.value;
        break;
      case "freeShipping":
        discount = deliveryFee;
        break;
      case "bogo": {
        const sortedPrices = products
          .flatMap((item) => Array(item.quantity).fill(item.price) as number[])
          .sort((a, b) => b - a);
        discount =
          sortedPrices.length > info.requireAmount ? sortedPrices[0] : 0;
        break;
      }
      default:
        discount = 0;
    }

    return Math.min(discount, orderPrice);
  }
}
