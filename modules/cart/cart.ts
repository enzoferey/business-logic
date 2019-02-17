export interface IProduct {
  id: number;
  price: number;
  quantity: number;
  data?: object | null;
}

export function addToCart(items: IProduct[], item: IProduct): IProduct[] {
  const validItem = item.quantity <= 0;
  if (validItem) {
    return items;
  }

  const itemIndex = getItemIndexById(items, item.id);
  const itemAlreadyExists = itemIndex >= 0;

  if (itemAlreadyExists) {
    // Increment quantity
    const currentQuantity = items[itemIndex].quantity;
    const targetQuantity = currentQuantity + item.quantity;
    return changeQuantityInCart(items, item.id, targetQuantity);
  }

  // Add new item
  return [...items, item];
}

export function removeFromCart(items: IProduct[], id: number): IProduct[] {
  return items.filter(item => item.id !== id);
}

export function changeQuantityInCart(
  items: IProduct[],
  id: number,
  quantity: number
): IProduct[] {
  if (quantity < 0) {
    return items;
  } else if (quantity === 0) {
    return removeFromCart(items, id);
  }

  const index = getItemIndexById(items, id);
  if (index < 0) {
    return items;
  }

  const currentItem = items[index];
  const newItem = {
    ...currentItem,
    quantity,
  };

  return replaceItemAtIndexInCart(items, index, newItem);
}

export function getTotalPriceCart(items: IProduct[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getTotalNumberItemsCart(items: IProduct[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

export function replaceItemAtIndexInCart(
  items: IProduct[],
  index: number,
  newItem: IProduct
): IProduct[] {
  const cart = [...items];
  cart[index] = newItem;

  return cart;
}

export function getItemIndexById(items: IProduct[], id: number): number {
  return items.findIndex(item => item.id === id);
}
