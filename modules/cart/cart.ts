export interface IProduct {
  id: number;
  price: number;
  quantity: number;
  data?: object | null;
}

export function addToCart(items: IProduct[], item: IProduct): IProduct[] {
  const notValidItem = item.quantity <= 0;
  if (notValidItem) {
    return items;
  }

  const itemIndex = getCartItemIndexById(items, item.id);
  const itemAlreadyExists = itemIndex >= 0;

  if (itemAlreadyExists) {
    // Increment quantity
    const currentQuantity = items[itemIndex].quantity;
    const targetQuantity = currentQuantity + item.quantity;
    return changeQuantityInCart(items, item.id, targetQuantity);
  } else {
    // Add new item
    return [...items, item];
  }
}

export function removeFromCart(
  items: IProduct[],
  id: IProduct["id"],
): IProduct[] {
  return items.filter((item) => item.id !== id);
}

export function changeQuantityInCart(
  items: IProduct[],
  id: IProduct["id"],
  quantity: IProduct["quantity"],
): IProduct[] {
  if (quantity < 0) {
    return items;
  } else if (quantity === 0) {
    return removeFromCart(items, id);
  }

  const itemIndex = getCartItemIndexById(items, id);
  const itemDoesNotExist = itemIndex < 0;

  if (itemDoesNotExist) {
    return items;
  }

  // Change quantity
  const currentItem = items[itemIndex];
  const newItem = {
    ...currentItem,
    quantity,
  };

  return replaceCartItemAtIndex(items, itemIndex, newItem);
}

export function getTotalPriceCart(items: IProduct[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getTotalNumberItemsCart(items: IProduct[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

export function getCartItemIndexById(
  items: IProduct[],
  id: IProduct["id"],
): number {
  return items.findIndex((item) => item.id === id);
}

export function replaceCartItemAtIndex(
  items: IProduct[],
  index: number,
  item: IProduct,
): IProduct[] {
  const cart = [...items];
  cart[index] = item;

  return cart;
}
