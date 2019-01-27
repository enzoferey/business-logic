export function addToCart(items, item) {
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
    return addNewItemToCart(items, item);
  }
}
export function getItemIndexById(items, id) {
  return items.findIndex(item => item.id === id);
}
export function addNewItemToCart(items, item) {
  if (item.quantity <= 0) {
    return items;
  } else {
    const itemIndex = getItemIndexById(items, item.id);

    if (itemIndex >= 0) {
      return addToCart(items, item);
    }
  }

  return [...items, item];
}
export function removeFromCart(items, item) {
  if (item.quantity <= 0) {
    return items;
  }

  const itemIndex = getItemIndexById(items, item.id);

  if (itemIndex < 0) {
    return items;
  } // Decrement quantity


  const currentQuantity = items[itemIndex].quantity;
  const targetQuantity = currentQuantity - item.quantity;

  if (targetQuantity <= 0) {
    return fullyRemoveItemFromCart(items, item.id);
  }

  return replaceQuantityInCart(items, itemIndex, targetQuantity);
}
export function fullyRemoveItemFromCart(items, id) {
  return items.filter(item => item.id !== id);
}
export function setQuantityInCart(items, id, quantity) {
  if (quantity < 0) {
    return items;
  } else if (quantity === 0) {
    return fullyRemoveItemFromCart(items, id);
  }

  const itemIndex = getItemIndexById(items, id);
  return replaceQuantityInCart(items, itemIndex, quantity);
}
export function replaceQuantityInCart(items, index, quantity) {
  const currentItem = items[index];
  const newItem = { ...currentItem,
    quantity
  };
  const cart = [...items];
  cart[index] = newItem;
  return cart;
}
export function getTotalPriceCart(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
export function getTotalNumberItemsCart(items) {
  return items.reduce((count, item) => count + item.quantity, 0);
}