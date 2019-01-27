import { IProduct } from "../cart";

interface IgetCartItem {
  id: number;
  quantity?: number;
}

export function getCartItem({
  id,
  ...propsToOverride
}: IgetCartItem): IProduct {
  return Object.freeze({
    id,
    price: Math.random() * 100,
    quantity: Math.floor(Math.random() * 100),
    data: null,
    ...propsToOverride,
  });
}
