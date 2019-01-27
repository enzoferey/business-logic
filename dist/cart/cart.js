export function addToCart(items, item) {
  if (item.quantity <= 0) {
    return items;
  }

  const itemIndex = getItemIndexById(items, item.id);

  if (itemIndex >= 0) {
    // Increment quantity
    const cart = [...items];
    cart[itemIndex].quantity += item.quantity;
    return cart;
  } else {
    return addNewItemToCart(items, item);
  }
}
export function getItemIndexById(items, id) {
  return items.findIndex(item => item.id === id);
}
export function addNewItemToCart(items, item) {
  const {
    id,
    price,
    quantity,
    ...data
  } = item;
  const cartItem = {
    id,
    price,
    quantity,
    data
  };
  return [...items, cartItem];
}
export function removeFromCart(items, item, quantity) {
  if (quantity > 0) {
    const itemIndex = getItemIndexById(items, item.id); // Decrement quantity

    const cart = [...items];
    cart[itemIndex].quantity -= quantity;
    return cart;
  } else {
    return fullyRemoveItemFromCart(items, item.id);
  }
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
  const cart = [...items];
  cart[itemIndex].quantity = quantity;
  return cart;
}
export function getTotalPrice(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
export function getTotalNumberItems(items) {
  return items.reduce((count, item) => count + item.quantity, 0);
}