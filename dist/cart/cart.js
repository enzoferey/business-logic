export function addToCart(items, item) {
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
  } // Add new item


  return [...items, item];
}
export function removeFromCart(items, id) {
  return items.filter(item => item.id !== id);
}
export function changeQuantityInCart(items, id, quantity) {
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
  const newItem = { ...currentItem,
    quantity
  };
  return replaceItemAtIndexInCart(items, index, newItem);
}
export function getTotalPriceCart(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
export function getTotalNumberItemsCart(items) {
  return items.reduce((count, item) => count + item.quantity, 0);
}
export function getItemIndexById(items, id) {
  return items.findIndex(item => item.id === id);
}
export function replaceItemAtIndexInCart(items, index, item) {
  const cart = [...items];
  cart[index] = item;
  return cart;
}