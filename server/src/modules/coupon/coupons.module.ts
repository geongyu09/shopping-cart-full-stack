import { InMemoryCouponRepository } from "./coupons.repository";
import { CouponsService } from "./coupons.service";

const couponRepository = new InMemoryCouponRepository();

export const couponService = new CouponsService(couponRepository);
