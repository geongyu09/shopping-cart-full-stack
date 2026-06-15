import { CartItem } from "@/type";
import { CartDB } from "@db/inMemoryDB";

export interface CartRepository {
  getCarts(): CartItem[];
  deleteCart(productId: number): number;
  getCartItemByProductId(productId: number): CartItem | undefined;
  updateCartQuantity(productId: number, quantity: number): CartItem | undefined;
}

export class InMemoryCartRepository {
  private cartDB = CartDB; // TODO: DB를 내부에서 관리하도록 변경

  getCarts() {
    const carts = [...this.cartDB.values()];

    return carts;
  }

  deleteCart(productId: number) {
    this.cartDB.delete(productId);

    return productId;
  }

  getCartItemByProductId(productId: number) {
    return this.cartDB.get(productId);
  }

  updateCartQuantity(productId: number, quantity: number) {
    const cartItem = this.cartDB.get(productId);

    if (!cartItem) return undefined;

    cartItem.quantity = quantity;
    return cartItem;
  }
}
