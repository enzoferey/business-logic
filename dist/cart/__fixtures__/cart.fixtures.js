export function getCartItem({
  id,
  ...propsToOverride
}) {
  return Object.freeze({
    id,
    price: Math.random() * 100,
    quantity: Math.floor(Math.random() * 100),
    data: null,
    ...propsToOverride
  });
}