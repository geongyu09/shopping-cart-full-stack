import { CouponsService } from "@/modules/coupon/coupons.service";
import { ProductsService } from "@/modules/products/service/products.service";
import { OrderRepository } from "../repository/orders.repository";
import { CreateOrderProductSchema } from "../schema/orders.schema";
import { OrderInfo } from "../types";

export class OrdersService {
  constructor(
    private ordersRepository: OrderRepository,

    private couponsService: CouponsService,
    private productsService: ProductsService,
  ) {}

  getOrders() {
    return this.ordersRepository.getOrders();
  }

  createOrder({ orderProducts }: CreateOrderProductSchema) {
    const isIsland = false; // 처음에 생성할 때에는 섬 지역을 false로 설정

    const orderPrice = orderProducts.reduce((acc, { productId, quantity }) => {
      const product = this.productsService.getProductById(productId);
      return acc + product.price * quantity;
    }, 0);

    const products = orderProducts.map(({ productId, quantity }) => {
      const product = this.productsService.getProductById(productId);
      return {
        productId,
        price: product.price,
        quantity,
      };
    });

    const deliveryFee = this.calculateShippingFee(orderPrice, isIsland);

    const bestCoupons = this.couponsService
      .getBestCoupons({ deliveryFee, orderPrice, products }, 2)
      .map(({ couponId }) => couponId);

    const orderInfo: OrderInfo = {
      orderProducts,
      couponIds: bestCoupons,
      isIsland: false,
    };

    const createdOrder = this.ordersRepository.createOrder(orderInfo);

    const priceInfo = this.calculateTotalPrice();

    return {
      ...createdOrder,
      priceInfo,
    };
  }

  calculateTotalPrice() {
    const { orderProducts, isIsland } = this.ordersRepository.getOrders()[0]; // 현재는 사용자가 1명이라는 가정으로 구현
    const couponIds = this.ordersRepository
      .getOrders()
      .flatMap((order) => order.couponIds);

    const orderPrice = orderProducts.reduce((acc, { productId, quantity }) => {
      const product = this.productsService.getProductById(productId);
      return acc + product.price * quantity;
    }, 0);

    const products = orderProducts.map(({ productId, quantity }) => {
      const product = this.productsService.getProductById(productId);
      return {
        productId,
        price: product.price,
        quantity,
      };
    });

    const deliveryFee = this.calculateShippingFee(orderPrice, isIsland);

    const discountPrice = couponIds.reduce(
      (acc, couponId) =>
        acc +
        this.couponsService.calculateDiscountPrice(couponId, {
          orderPrice,
          deliveryFee,
          products,
        }),
      0,
    );

    const totalPrice = orderPrice - discountPrice + deliveryFee;

    return {
      orderPrice,
      deliveryFee,
      discountPrice,
      totalPrice,
    };
  }

  private calculateShippingFee(orderAmount: number, isIsland: boolean): number {
    const DELIVERY_FEE = 3000;
    const IS_ISLAND_DELIVERY_FEE = 3000;

    const FREE_DELIVERY_THRESHOLD = 100000;

    if (orderAmount >= FREE_DELIVERY_THRESHOLD) return 0;

    if (isIsland) return DELIVERY_FEE + IS_ISLAND_DELIVERY_FEE;

    return DELIVERY_FEE;
  }
}
