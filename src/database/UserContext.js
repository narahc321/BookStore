import React from "react";

export const UserContext = React.createContext(
  React.createContext({
    books: [],
    setBooks: () => {},
    cart: [],
    setCart: () => {},
    orders: [],
    setOrders: () => {},
  })
);
