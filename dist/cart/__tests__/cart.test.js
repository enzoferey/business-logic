import { addToCart, changeQuantityInCart, getItemIndexById, getTotalNumberItemsCart, getTotalPriceCart, removeFromCart, replaceItemAtIndexInCart } from "../cart";
import { getCartItem } from "../__fixtures__/cart.fixtures";
describe("-- interface --", () => {
  describe("addToCart", () => {
    it("should increase the quantity of the item if it already exists", () => {
      const cartItem1 = getCartItem({
        id: 1
      });
      const cartItem2 = getCartItem({
        id: 2
      });
      const cart = [cartItem1, cartItem2];
      const quantityToAdd = 10;
      const newItem = getCartItem({
        id: 1,
        quantity: quantityToAdd
      });
      const nextCart = addToCart(cart, newItem);
      expect(nextCart.length).toBe(cart.length);
      expect(nextCart[0]).toEqual({ ...cart[0],
        quantity: cart[0].quantity + quantityToAdd
      });
      expect(nextCart[1]).toEqual(cart[1]);
    });
    it("should add a new item if it does not already exist", () => {
      const cartItem1 = getCartItem({
        id: 1
      });
      const cartItem2 = getCartItem({
        id: 2
      });
      const cart = [cartItem1, cartItem2];
      const newItem = getCartItem({
        id: 3,
        quantity: 10
      });
      const nextCart = addToCart(cart, newItem);
      const expectedCart = [cartItem1, cartItem2, newItem];
      expect(nextCart).toEqual(expectedCart);
    });
    it("should do nothing if quantity of the item to add is <= 0", () => {
      const cartItem1 = getCartItem({
        id: 1
      });
      const cartItem2 = getCartItem({
        id: 2
      });
      const cart = [cartItem1, cartItem2];
      const newItem = getCartItem({
        id: 1,
        quantity: -1
      });
      const nextCart = addToCart(cart, newItem);
      expect(nextCart).toEqual(cart);
    });
  });
  describe("changeQuantityInCart", () => {
    it("should set quantity on the specified item", () => {
      const cartItem1 = getCartItem({
        id: 1
      });
      const cartItem2 = getCartItem({
        id: 2
      });
      const cart = [cartItem1, cartItem2];
      const targetId = 1;
      const quantity = 5000;
      const nextCart = changeQuantityInCart(cart, targetId, quantity);
      expect(nextCart.length).toBe(cart.length);
      expect(nextCart[0]).toEqual({ ...cartItem1,
        quantity
      });
      expect(nextCart[1]).toEqual(cartItem2);
    });
    it("should remove the item if quantity is = 0", () => {
      const cartItem1 = getCartItem({
        id: 1
      });
      const cartItem2 = getCartItem({
        id: 2
      });
      const cart = [cartItem1, cartItem2];
      const targetId = 1;
      const quantity = 0;
      const nextCart = changeQuantityInCart(cart, targetId, quantity);
      const expectedCart = [cartItem2];
      expect(nextCart).toEqual(expectedCart);
    });
    it("should do nothing if quantity is < 0", () => {
      const cartItem1 = getCartItem({
        id: 1
      });
      const cartItem2 = getCartItem({
        id: 2
      });
      const cart = [cartItem1, cartItem2];
      const cartItemId = 123;
      const quantity = -1;
      const nextCart = changeQuantityInCart(cart, cartItemId, quantity);
      const expectedCart = cart;
      expect(nextCart).toEqual(expectedCart);
    });
    it("should do nothing if id does not exist", () => {
      const cartItem1 = getCartItem({
        id: 1
      });
      const cartItem2 = getCartItem({
        id: 2
      });
      const cart = [cartItem1, cartItem2];
      const cartItemId = 123;
      const quantity = 10;
      const nextCart = changeQuantityInCart(cart, cartItemId, quantity);
      const expectedCart = cart;
      expect(nextCart).toEqual(expectedCart);
    });
  });
  describe("removeFromCart", () => {
    it("should remove the item with that id", () => {
      const cartItem1 = getCartItem({
        id: 1
      });
      const cartItem2 = getCartItem({
        id: 2
      });
      const cart = [cartItem1, cartItem2];
      let targetId = 2;
      let nextCart = removeFromCart(cart, targetId);
      let expectedCart = [cartItem1];
      expect(nextCart).toEqual(expectedCart);
      targetId = 1;
      nextCart = removeFromCart(nextCart, targetId);
      expectedCart = [];
      expect(nextCart).toEqual(expectedCart);
    });
    it("should do nothing if the id does not exist", () => {
      const cartItem1 = getCartItem({
        id: 1
      });
      const cartItem2 = getCartItem({
        id: 2
      });
      const cart = [cartItem1, cartItem2];
      const targetId = 1;
      const nextCart = removeFromCart(cart, targetId);
      const expectedCart = [cartItem2];
      expect(nextCart).toEqual(expectedCart);
    });
  });
  describe("getTotalPriceCart", () => {
    it("should return the total price of the cart", () => {
      const cartItem1 = getCartItem({
        id: 1
      });
      const cartItem2 = getCartItem({
        id: 2
      });
      const cart = [cartItem1, cartItem2];
      const totalPrice = getTotalPriceCart(cart);
      const expectedTotalPrice = cartItem1.price * cartItem1.quantity + cartItem2.price * cartItem2.quantity;
      expect(totalPrice).toBe(expectedTotalPrice);
    });
  });
  describe("getTotalNumberItemsCart", () => {
    it("should return the total number of items in the cart", () => {
      const cartItem1 = getCartItem({
        id: 1
      });
      const cartItem2 = getCartItem({
        id: 2
      });
      const cart = [cartItem1, cartItem2];
      const totalCount = getTotalNumberItemsCart(cart);
      const expectedTotalCount = cartItem1.quantity + cartItem2.quantity;
      expect(totalCount).toBe(expectedTotalCount);
    });
  });
});
describe("-- helpers --", () => {
  test("replaceItemAtIndexInCart", () => {
    const cartItem1 = getCartItem({
      id: 1
    });
    const cartItem2 = getCartItem({
      id: 2
    });
    const cart = [cartItem1, cartItem2];
    const targetIndex = 0;
    const newItem = getCartItem({
      id: 3
    });
    const nextCart = replaceItemAtIndexInCart(cart, targetIndex, newItem);
    expect(nextCart.length).toBe(cart.length);
    expect(nextCart[0]).toEqual(newItem);
    expect(nextCart[1]).toEqual(cart[1]);
  });
  test("getItemIndexById", () => {
    const cartItem1 = getCartItem({
      id: 1
    });
    const cartItem2 = getCartItem({
      id: 2
    });
    const cartItem3 = getCartItem({
      id: 3
    });
    const cart = [cartItem1, cartItem2, cartItem3];
    let targetId = 1;
    let itemIndex = getItemIndexById(cart, targetId);
    expect(itemIndex).toBe(0);
    targetId = 2;
    itemIndex = getItemIndexById(cart, targetId);
    expect(itemIndex).toBe(1);
    targetId = 3;
    itemIndex = getItemIndexById(cart, targetId);
    expect(itemIndex).toBe(2);
  });
});