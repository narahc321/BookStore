import React from "react";
import { StyleSheet, FlatList, Text, View, Dimensions } from "react-native";
import { useEffect, useState, useContext } from "react";
import CartCard from "../components/CartCard";
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import * as NavigationHelper from "../navigation/NavigationHelper";
import { UserContext } from "../database/UserContext";
import Toast from "react-native-simple-toast";
import EmptyPageWidget from "../components/EmptyPageWidget";
import * as ScreenNames from "../Constants/ScreenNames";

const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

const getBooks = (books, cart) => {
  const itemsList = books.filter((book) => book.id in cart);
  for (var i = 0; i < itemsList.length; i++) {
    itemsList[i]["itemCount"] = cart[itemsList[i].id];
  }
  return itemsList;
};

const calculatePrice = (list) => {
  var total = 0;

  for (var i = 0; i < list.length; i++) {
    total += list[i].price * list[i].itemCount;
  }
  return total;
};

const Cart = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  const { books, cart, setCart, orders, setOrders } = useContext(UserContext);

  const [booksList, setBooksList] = useState(getBooks(books, cart));

  const [totalPrice, setTotalPrice] = useState(calculatePrice(booksList));

  const dimensionChangeHandler = () => {
    setNumOfCols(isPortrait() ? 2 : 3);
  };

  const [numOfCols, setNumOfCols] = useState(isPortrait() ? 2 : 3);

  useEffect(() => {
    var event = Dimensions.addEventListener("change", dimensionChangeHandler);
    return () => {
      event.remove();
    };
  }, [dimensionChangeHandler]);

  const onChildChanged = () => {
    const itemsList = getBooks(books, cart);
    setBooksList(itemsList);
    setTotalPrice(calculatePrice(itemsList));
  };

  const placeOrder = () => {
    const orderingProducts = JSON.parse(JSON.stringify(booksList));
    const orderid = new Date().getTime();

    for (var i = 0; i < orderingProducts.length; i++) {
      orderingProducts[i]["orderid"] = orderid + orderingProducts[i]["id"];
    }
    setOrders([...orderingProducts, ...orders]);
    setCart([]);
    NavigationHelper.push(navigation, ScreenNames.ORDER_PACED);
  };

  useEffect(() => {
    const itemsList = getBooks(books, cart);
    setBooksList(itemsList);
    setTotalPrice(calculatePrice(itemsList));
  }, [isFocused]);

  if (booksList.length === 0) {
    return (
      <EmptyPageWidget
        iconName="cart-outline"
        titleText="Empty Cart!"
        subTitleText="Search and order your Favorite books now!."
        buttonText="SEARCH"
        navigation={navigation}
        screenName={ScreenNames.SEARCH}
      />
    );
  }
  return (
    <View style={styles.viewStyle}>
      <FlatList
        contentContainerStyle={[styles.listContainerStyle]}
        data={booksList}
        horizontal={false}
        renderItem={({ item }) => (
          <CartCard item={item} childChanged={onChildChanged} />
        )}
        keyExtractor={(item) => item.id}
        key={numOfCols}
        numColumns={1}
      />
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.promoContainer}
          onPress={() => {
            Toast.show("Invalid Promo Code");
          }}
        >
          <View style={styles.promoLeftContainer}>
            <Icon
              style={styles.icon}
              name="pricetag"
              color={"#6200EE"}
              size={25}
            ></Icon>
            <Text style={styles.promoText}>Add Promo Code</Text>
          </View>
          <Icon
            style={styles.icon}
            name="arrow-forward-circle"
            color={"#6200EE"}
            size={25}
          ></Icon>
        </TouchableOpacity>
        <View style={styles.cartDetailsContainer}>
          <View style={styles.PriceDetailsContainer}>
            <Text style={styles.cartDetailsText}>TOTAL</Text>
            <Text style={styles.cartDetailsPrice}>${totalPrice}.00</Text>
            <Text style={styles.cartDetailsText}>Free Domestic Shipping</Text>
          </View>
          <TouchableOpacity style={styles.placeOrder} onPress={placeOrder}>
            <Text style={styles.placeOrderText}>PLACE ORDER</Text>
            <View style={styles.placeOrderIconView}>
              <Icon
                style={styles.icon}
                name="arrow-forward"
                color={"#6200EE"}
                size={20}
              ></Icon>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartDetailsText: {
    fontFamily: "Montserrat-Medium",
    color: "#9599B3",
    fontSize: 14,
  },
  placeOrderText: {
    color: "white",
    fontFamily: "Montserrat-Medium",
  },
  listContainerStyle: {
    justifyContent: "space-around",
  },
  cartDetailsPrice: {
    fontFamily: "Montserrat-Bold",
    color: "grey",
    fontSize: 18,
  },
  placeOrderIconView: {
    backgroundColor: "white",
    borderRadius: 100,
    marginLeft: 10,
  },
  promoLeftContainer: {
    flexDirection: "row",
  },
  placeOrder: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6200EE",
    padding: 10,
    borderRadius: 25,
  },
  promoText: {
    color: "#6200EE",
    fontSize: 16,
    marginHorizontal: 10,
    fontFamily: "Montserrat-Medium",
  },
  promoContainer: {
    margin: 20,
    marginBottom: 0,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  cartDetailsContainer: {
    margin: 20,
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  cardStyle: {
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    marginVertical: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 10,
  },
  imgStyle: {
    margin: 25,
    flex: 1,
    resizeMode: "contain",
  },
  viewStyle: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Cart;
