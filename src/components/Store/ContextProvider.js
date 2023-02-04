import React, { useState } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const CartProvider = (props) => {
  const [cartState, setCartState] = useState(defaultCartState);

  const addItemToCart = (item) => {
    const existingCartItemIndex = cartState.items.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    const existingCartItem = cartState.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + item.amount,
      };
      updatedItems = [...cartState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = cartState.items.concat(item);
    }

    setCartState({
      items: updatedItems,
      totalAmount: cartState.totalAmount + item.price * item.amount,
    });
  };

  const removeItemFromCart = (id) => {
    const existingCartItemIndex = cartState.items.findIndex(
      (cartItem) => cartItem.id === id
    );
    const existingItem = cartState.items[existingCartItemIndex];
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = cartState.items.filter((item) => item.id !== id);
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...cartState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    setCartState({
      items: updatedItems,
      totalAmount: cartState.totalAmount - existingItem.price,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
