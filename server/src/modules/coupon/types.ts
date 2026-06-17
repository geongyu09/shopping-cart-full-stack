export interface CouponDB {
  couponId: string;
  couponName: string;
  isDisabled: boolean;
  couponExpiration: number;
  discount: {
    type: "percentage" | "fixed";
    value: number;
  };
  option: {
    minimumOrderPrice: number;
    duration: {
      startDate: string;
      endDate: string;
    };
  };
}
