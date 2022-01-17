import React from "react";
import { StyleSheet, FlatList, Text, View, Dimensions } from "react-native";
import { useEffect, useState, useContext } from "react";
import CartCard from "../components/CartCard";
import { useIsFocused } from "@react-navigation/native";
import { UserContext } from "../database/UserContext";
import EmptyPageWidget from "../components/EmptyPageWidget";
import * as ScreenNames from "../Constants/ScreenNames"

const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

const Orders = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const { orders } = useContext(UserContext);
  const [ordersList, setOrdersList] = useState(orders);

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

  useEffect(() => {
    setOrdersList(orders);
  }, [isFocused]);

  if (ordersList.length === 0) {
    return (
      <EmptyPageWidget
        iconName="sad-outline"
        titleText="No Orders Yet!"
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
        data={ordersList}
        horizontal={false}
        renderItem={({ item }) => (
          <CartCard item={item} childChanged={() => {}} noUpdates />
        )}
        keyExtractor={(item) => item.orderid}
        key={numOfCols}
        numColumns={1}
      />
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

export default Orders;
