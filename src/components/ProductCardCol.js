import React from "react";
import { StyleSheet, Text, Image, View, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getBookCoverSource } from "../network/NetworkManager";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import * as NavigationHelper from "../navigation/NavigationHelper";
import * as ScreenNames from "../Constants/ScreenNames";

const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

const ProductCardCol = (props) => {
  const navigation = useNavigation();

  const imgUri = getBookCoverSource(props.item.cover);

  const cardWidth = {
    width: (Dimensions.get("screen").width / (isPortrait() ? 2 : 3)) * 0.9,
  };

  const imgWidth = {
    width: (Dimensions.get("screen").width / (isPortrait() ? 2 : 3)) * 0.8,
  };

  return (
    // <TouchableOpacity onPress={() => NavigationHelper.push(navigation, ScreenNames.PRODUCT, props.item)}>
    <View style={[styles.cardStyle, cardWidth]}>
      <Image style={[styles.imgStyle, imgWidth]} source={{ uri: imgUri }} />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.titleStyle}>
          {props.item.title}
        </Text>
        <Text numberOfLines={1} style={styles.subTitleStyle}>
          {props.item.author}
        </Text>
      </View>
    </View>
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listContainerStyle: {
    justifyContent: "space-around",
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
    width: "80%",
    marginBottom: 10,
  },
  titleStyle: {
    backgroundColor: "white",
    fontFamily: "Montserrat-SemiBold",
    color: "grey",
    fontSize: 16,
  },
  subTitleStyle: {
    backgroundColor: "white",
    fontFamily: "Montserrat-Light",
    color: "grey",
    fontSize: 14,
  },
  imgStyle: {
    margin: 10,
    flex: 1,
    resizeMode: "contain",
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  viewStyle: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default ProductCardCol;
