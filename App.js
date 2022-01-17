/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import "react-native-gesture-handler";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Navigator from "./src/navigation/Navigator";
import { fetchBooks } from "./src/network/NetworkManager";
import { UserContext } from "./src/database/UserContext";
import { useEffect, useState } from "react";

const App = () => {

  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState({ 16: 1, 10: 3, 8: 5 });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchBooks().then((books) => {
      setBooks(books);
    });
  }, []);

  const value = {
    books,
    setBooks,
    cart,
    setCart,
    orders,
    setOrders,
  };

  return (
    <UserContext.Provider value={value}>
      <SafeAreaView style={styles.flex_one}>
        <Navigator />
      </SafeAreaView>
    </UserContext.Provider>
  );
};

const styles = StyleSheet.create({
  flex_one: {
    flex: 1,
  },
});

export default App;
