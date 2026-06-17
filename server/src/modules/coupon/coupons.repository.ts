import { CouponDB } from "./types";

export interface CouponRepository {
  getCoupons(): CouponDB[];
  getCouponById(couponId: string): CouponDB | null;
}
