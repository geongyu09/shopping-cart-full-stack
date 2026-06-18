import { CouponRepository } from "./coupons.repository";
import { CouponDB } from "./types";

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
