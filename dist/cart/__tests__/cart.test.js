import { setQuantityInCart, fullyRemoveItemFromCart, getItemIndexById, getTotalPrice, getTotalNumberItems } from "../cart";
import { getCartItem, getCartItems } from "../__fixtures__/cart.fixtures"; // CORE

describe("addToCart", () => {
  it("should do nothing if quantity of the item to add is <= 0", () => {});
});
describe("setQuantityInCart", () => {
  it("should set quantity on the specified item", () => {
    const cartItem1 = getCartItem(1);
    const cartItem2 = getCartItem(2);
    const cart = [cartItem1, cartItem2];
    const targetId = 1;
    const quantity = 5000;
    const nextCart = setQuantityInCart(cart, targetId, quantity);
    expect(nextCart[0]).toEqual({ ...cartItem1,
      quantity
    });
    expect(nextCart[1]).toEqual(cartItem2);
  });
  it("should remove the item if quantity is = 0", () => {
    const cartItem1 = getCartItem(1);
    const cartItem2 = getCartItem(2);
    const cart = [cartItem1, cartItem2];
    const targetId = 1;
    const quantity = 0;
    const nextCart = setQuantityInCart(cart, targetId, quantity);
    const expectedCart = [cartItem2];
    expect(nextCart).toEqual(expectedCart);
  });
  it("should do nothing if quantity is < 0", () => {
    const cart = getCartItems();
    const cartItemId = 123;
    const quantity = -1;
    const nextCart = setQuantityInCart(cart, cartItemId, quantity);
    expect(nextCart).toEqual(cart);
  });
});
describe("fullyRemoveItemFromCart", () => {
  it("should remove the item with that id", () => {
    const cartItem1 = getCartItem(1);
    const cartItem2 = getCartItem(2);
    const cart = [cartItem1, cartItem2];
    const targetId = 2;
    const nextCart = fullyRemoveItemFromCart(cart, targetId);
    const expectedCart = [cartItem1];
    expect(nextCart).toEqual(expectedCart);
    const targetId2 = 1;
    const nextCart2 = fullyRemoveItemFromCart(nextCart, targetId2);
    const expectedCart2 = [];
    expect(nextCart2).toEqual(expectedCart2);
  });
  it("should do nothing if the id does not exist", () => {
    const cartItem1 = getCartItem(1);
    const cartItem2 = getCartItem(2);
    const cart = [cartItem1, cartItem2];
    const targetId = 1;
    const nextCart = fullyRemoveItemFromCart(cart, targetId);
    const expectedCart = [cartItem2];
    expect(nextCart).toEqual(expectedCart);
  });
}); // UTILS

test("getItemIndexById", () => {
  const id = 123;
  const items1 = [getCartItem(id), getCartItem(456), getCartItem(789)];
  const itemIndex1 = getItemIndexById(items1, id);
  expect(itemIndex1).toBe(0);
  const items2 = [getCartItem(456), getCartItem(id), getCartItem(789)];
  const itemIndex2 = getItemIndexById(items2, id);
  expect(itemIndex2).toBe(1);
  const items3 = [getCartItem(456), getCartItem(789), getCartItem(id)];
  const itemIndex3 = getItemIndexById(items3, id);
  expect(itemIndex3).toBe(2);
});
test("getTotalPrice", () => {
  const item1 = getCartItem(123);
  const item2 = getCartItem(456);
  const item3 = getCartItem(789);
  const items = [item1, item2, item3];
  const totalPrice = getTotalPrice(items);
  const expectedTotalPrice = item1.price * item1.quantity + item2.price * item2.quantity + item3.price * item3.quantity;
  expect(totalPrice).toBe(expectedTotalPrice);
});
test("getTotalNumberItems", () => {
  const item1 = getCartItem(123);
  const item2 = getCartItem(456);
  const item3 = getCartItem(789);
  const items = [item1, item2, item3];
  const totalCount = getTotalNumberItems(items);
  const expectedTotalCount = item1.quantity + item2.quantity + item3.quantity;
  expect(totalCount).toBe(expectedTotalCount);
});