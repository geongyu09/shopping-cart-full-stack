import fetcher from "../instance";

const CARTS_API = "/carts";

export const getCart = async () => {
  return fetcher.get(`${CARTS_API}`);
};
