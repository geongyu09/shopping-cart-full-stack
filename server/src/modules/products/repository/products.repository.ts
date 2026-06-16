import type { Product } from "@/type";
import { ProductDB } from "@db/inMemoryDB";

export interface ProductRepository {
  getAllProducts(): Product[];
  addProduct(product: Omit<Product, "id">): Product;
  getProductByName(name: string): Product | undefined;
  getProductById(id: number): Product | undefined;
  deleteProduct(id: number): number;
}

export class InMemoryProductRepository {
  private productDB = ProductDB; // TODO: DB를 내부에서 관리하도록 변경

  private createId() {
    return this.productDB.size === 0
      ? 0
      : Math.max(...this.productDB.keys()) + 1;
  }

  getAllProducts() {
    // 상품 목록 조회
    const products = [...this.productDB.values()];

    return products;
  }

  addProduct(product: Omit<Product, "id">) {
    const id = this.createId();
    const newProducts: Product = {
      id,
      ...product,
    };

    this.productDB.set(id, newProducts);

    return newProducts;
  }

  getProductByName(name: string) {
    const product = [...this.productDB.values()].find(
      (product) => product.name === name,
    );

    return product;
  }

  getProductById(id: number) {
    const product = this.productDB.get(id);

    return product;
  }

  deleteProduct(id: number) {
    this.productDB.delete(id);

    return id;
  }
}
