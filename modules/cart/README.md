# cart

Module that provides a basic shopping cart business logic.

### Data model

```js
// Item
{
  id: number,
  quantity: number,
  price: number,
  data: object | null
}
```

### Interface

`addToCart(items, item)`

Given an array of items and a item, returns a mutation of the list including the content from the second one. If the item already exists, the quantity is increased instead.

`removeFromCart(items, id)`

Given an array of items and an id, returns a mutation of the list excluding the item with the given id.

`changeQuantityInCart(items, id, quantity)`

Given an array of items, an id and a target quantity, returns a mutation of the list modifying the quantity of the item with the given id.

`getTotalPriceCart(items)`

Given an array of items, returns the total price of the cart.

`getTotalNumberItemsCart(items)`

Given an array of items, returns the total number of items in the cart.

### Helpers

`getItemIndexById(items, id)`

Given an array of items and an id to search for, returns the index of the item with the given id in the list. Returns -1 if not found.

`replaceItemAtIndexInCart(items, index, item)`

Given an array of items, an index on that list, and a item, returns a mutation of list replacing the value of the item at index.
