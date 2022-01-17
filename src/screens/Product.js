import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { getBookCoverSource } from "../network/NetworkManager";

const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

const Product = ({ navigation, route }) => {

  const imgUri = getBookCoverSource(route.params.cover);
  return (
    <View style={styles.flex_one}>
      <Image style={[styles.imgStyle]} source={{ uri: imgUri }} />
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Title </Text>
          <Text style={styles.value}>: ${route.params.title}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Author </Text>
          <Text style={styles.value}>: ${route.params.title}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Publisher </Text>
          <Text style={styles.value}>: ${route.params.title}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Year </Text>
          <Text style={styles.value}>: ${route.params.title}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Year </Text>
          <Text style={styles.value}>: ${route.params.title}</Text>
        </View>
        <Text>`Author : ${route.params.author}</Text>
        <Text>` : ${route.params.publisher}</Text>
        <Text>` : ${route.params.year}</Text>
        <Text>`Price : ${route.params.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    flex: 1,
  },
  value: {
    flex: 3,
  },
  infoContainer: {
    flexDirection: "row",
    flex: 1,
  },
  imgStyle: {
    margin: 10,
    flex: 1,
    resizeMode: "contain",
    aspectRatio: 1,
  },
  flex_one: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
  },
});

export default Product;
