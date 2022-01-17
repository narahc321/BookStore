import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { getBookCoverSource } from "../network/NetworkManager";
import { useIsFocused } from "@react-navigation/native";
import { UserContext } from "../database/UserContext";
import { useState, useContext } from "react";

const CountComponent = (props) => {
  if (props.noUpdates) {
    return (
      <Text style={styles.buttonTextCountInfo}>
        {props.itemCount} {props.itemCount == 1 ? "book" : "books"} ordered
      </Text>
    );
  }
  return (
    <View style={styles.buttons}>
      <TouchableOpacity style={styles.button} onPress={props.decreaseCount}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.buttonTextCount}>{props.itemCount}</Text>
      <TouchableOpacity style={styles.button} onPress={props.increaseCount}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

const CartCard = (props) => {
  const { cart, setCart } = useContext(UserContext);

  const imgUri = getBookCoverSource(props.item.cover);
  const [itemCount, setItemCount] = useState(
    props.item.itemCount ? props.item.itemCount : 0
  );
  const decreaseCount = () => {
    const curCount = cart[props.item.id] - 1;
    if (curCount <= 0) {
      delete cart[props.item.id];
    } else {
      cart[props.item.id] = curCount;
    }
    setItemCount(curCount);
    setCart(cart);
    props.childChanged();
  };

  const increaseCount = () => {
    const curCount = cart[props.item.id] + 1;
    cart[props.item.id] = curCount;
    setItemCount(curCount);
    setCart(cart);
    props.childChanged();
  };

  return (
    <View style={[styles.cardStyle]}>
      <View style={styles.imgContainerContainer}>
        <View style={styles.imgContainer}>
          <Image style={styles.imgStyle} source={{ uri: imgUri }} />
        </View>
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text numberOfLines={1} style={styles.subTitleStyle}>
            {props.item.title}
          </Text>
          <Text numberOfLines={1} style={styles.subTitleStyle}>
            {`By : ${props.item.author}`}
          </Text>
        </View>
        <View>
          <Text numberOfLines={1} style={styles.priceStyle}>
            {`$${props.item.price}`}
          </Text>
        </View>
        <View>
          <CountComponent
            increaseCount={increaseCount}
            decreaseCount={decreaseCount}
            itemCount={itemCount}
            noUpdates={props.noUpdates}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainerContainer: {
    flex: 1,
  },
  imgContainer: {
    borderWidth: 1,
    marginVertical: 20,
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    padding: 20,
    elevation: 3,
    borderRadius: 50,
    backgroundColor: "white",
    paddingHorizontal: 10,
    width: "100%",
    flexWrap: "wrap",
  },
  cardStyle: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "flex-end",
    marginHorizontal: 20,
    flexDirection: "row",
    width: "90%",
  },
  buttons: {
    flexDirection: "row",
    marginRight: 10,
    padding: 2,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#EEE9E9",
    borderRadius: 100,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    flex: 1,
    color: "grey",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 25,
    margin: 5,
  },
  buttonTextCountInfo: {
    color: "grey",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 15,
  },
  buttonTextCount: {
    color: "grey",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 15,
    marginHorizontal: 20,
  },
  textContainer: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "center",
    margin: 10,
    marginLeft: 15,
  },
  subTitleStyle: {
    backgroundColor: "white",
    fontFamily: "Montserrat-Light",
    color: "black",
    fontSize: 16,
    flex: 1,
  },
  priceStyle: {
    backgroundColor: "white",
    fontFamily: "Montserrat-Medium",
    color: "red",
    fontSize: 16,
    flex: 1,
    marginVertical: 10,
  },
  imgStyle: {
    resizeMode: "contain",
    aspectRatio: 1,
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    minHeight: 90,
    marginHorizontal: 10,
  },
  viewStyle: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default CartCard;
