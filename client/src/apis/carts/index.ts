import fetcher from "../instance";

const CARTS_API = "/carts";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface Cart {
  product: Product;
  quantity: number;
}

interface GetCartResponse {
  status: "success" | "error";
  message: string;
  data: Cart[];
}

export const getCart = async () => {
  const { data } = await fetcher.get<GetCartResponse>(`${CARTS_API}`);
  return data;
};
