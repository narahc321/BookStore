import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getBookCoverSource } from "../network/NetworkManager";
import { useIsFocused } from "@react-navigation/native";
import { UserContext } from "../database/UserContext";

const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

const ProductCardRow = (props) => {
  const [portrait, setPortrait] = useState(isPortrait());

  const dimensionChangeHandler = () => {
    setPortrait(isPortrait());
  };

  useEffect(() => {
    var event = Dimensions.addEventListener("change", dimensionChangeHandler);
    return () => {
      event.remove();
    };
  }, [dimensionChangeHandler]);

  const { cart, setCart } = useContext(UserContext);
  const imgUri = getBookCoverSource(props.item.cover);
  const [addedToCart, setAddedToCart] = useState(
    cart.hasOwnProperty(props.item.id)
  );

  const isFocused = useIsFocused();

  useEffect(() => {
    setAddedToCart(cart.hasOwnProperty(props.item.id));
  }, [isFocused]);

  const addToCard = (item) => {
    Alert.alert(
      "",
      "Are you sure you want to add this item in cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            setAddedToCart(true);
            cart[props.item.id] = 1;
            setCart(cart);
          },
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={[styles.cardStyle]}>
      <Image style={[styles.imgStyle]} source={{ uri: imgUri }} />
      <View style={[styles.textContainer, { flex: portrait ? 2 : 4 }]}>
        <Text numberOfLines={1} style={styles.titleStyle}>
          {props.item.title}
        </Text>
        <Text numberOfLines={1} style={styles.subTitleStyle}>
          {`By : ${props.item.author}`}
        </Text>
        <Text numberOfLines={1} style={styles.subTitleStyle}>
          {`Year : ${props.item.year}`}
        </Text>
        <Text numberOfLines={1} style={styles.subTitleStyle}>
          {`Buy : $${props.item.price}`}
        </Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>More</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={addedToCart}
            style={styles.button}
            onPress={() => addToCard(props.item)}
            {...props}
          >
            <Text style={styles.buttonText}>
              {addedToCart ? "ADDED TO CART" : "+ ADD CART"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
    padding: 2,
  },
  button: {
    backgroundColor: "#6200EE",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontFamily: "Montserrat-SemiBold",
    padding: 3,
  },
  textContainer: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-around",
    margin: 10,
  },
  titleStyle: {
    backgroundColor: "white",
    fontFamily: "Montserrat-SemiBold",
    color: "grey",
    fontSize: 16,
    flex: 2,
  },
  subTitleStyle: {
    backgroundColor: "white",
    fontFamily: "Montserrat-Light",
    color: "grey",
    fontSize: 14,
    flex: 1,
  },
  imgStyle: {
    margin: 10,
    flex: 1,
    resizeMode: "contain",
    height: undefined,
    aspectRatio: 1,
  },
  viewStyle: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default ProductCardRow;
