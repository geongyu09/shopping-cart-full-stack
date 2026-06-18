import { CartItem } from "../types";

export interface CartRepository {
  getCarts(): CartItem[];
  deleteCart(productId: string): string;
  getCartItemByProductId(productId: string): CartItem | undefined;
  updateCartQuantity(productId: string, quantity: number): CartItem | undefined;
}

export class InMemoryCartRepository {
  private cartDB = new Map<string, CartItem>();

  getCarts() {
    const carts = [...this.cartDB.values()];

    return carts;
  }

  deleteCart(productId: string) {
    this.cartDB.delete(productId);

    return productId;
  }

  getCartItemByProductId(productId: string) {
    return this.cartDB.get(productId);
  }

  updateCartQuantity(productId: string, quantity: number) {
    const cartItem = this.cartDB.get(productId);

    if (!cartItem) return undefined;

    cartItem.quantity = quantity;
    return cartItem;
  }

  addCartItem(productId: string, cartItem: CartItem) {
    this.cartDB.set(productId, cartItem);
  }

  clear() {
    this.cartDB.clear();
  }
}
