export function getCartItem(id, quantity) {
  return {
    id,
    price: Math.random() * 100,
    quantity: quantity || Math.floor(Math.random() * 100),
    data: {
      name: "My product"
    }
  };
}
export function getCartItems() {
  return [getCartItem(123), getCartItem(456), getCartItem(789)];
}