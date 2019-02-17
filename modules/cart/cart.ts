export interface IProduct {
  id: number;
  price: number;
  quantity: number;
  data?: object | null;
}

export function addToCart(items: IProduct[], item: IProduct): IProduct[] {
  if (item.quantity <= 0) {
    return items;
  }

  const itemIndex = getItemIndexById(items, item.id);

  if (itemIndex >= 0) {
    // Increment quantity
    const currentQuantity = items[itemIndex].quantity;
    const targetQuantity = currentQuantity + item.quantity;
    return replaceQuantityInCart(items, itemIndex, targetQuantity);
  } else {
    return [...items, item];
  }
}

export function getItemIndexById(items: IProduct[], id: number): number {
  return items.findIndex(item => item.id === id);
}

export function removeFromCart(items: IProduct[], item: IProduct) {
  if (item.quantity <= 0) {
    return items;
  }

  const itemIndex = getItemIndexById(items, item.id);

  if (itemIndex < 0) {
    return items;
  }

  // Decrement quantity
  const currentQuantity = items[itemIndex].quantity;
  const targetQuantity = currentQuantity - item.quantity;

  if (targetQuantity <= 0) {
    return fullyRemoveItemFromCart(items, item.id);
  }

  return replaceQuantityInCart(items, itemIndex, targetQuantity);
}

export function fullyRemoveItemFromCart(
  items: IProduct[],
  id: number
): IProduct[] {
  return items.filter(item => item.id !== id);
}

export function setQuantityInCart(
  items: IProduct[],
  id: number,
  quantity: number
): IProduct[] {
  if (quantity < 0) {
    return items;
  } else if (quantity === 0) {
    return fullyRemoveItemFromCart(items, id);
  }

  const itemIndex = getItemIndexById(items, id);

  return replaceQuantityInCart(items, itemIndex, quantity);
}

export function replaceQuantityInCart(
  items: IProduct[],
  index: number,
  quantity: number
): IProduct[] {
  const currentItem = items[index];
  const newItem = {
    ...currentItem,
    quantity,
  };

  const cart = [...items];
  cart[index] = newItem;

  return cart;
}

export function getTotalPriceCart(items: IProduct[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getTotalNumberItemsCart(items: IProduct[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}
