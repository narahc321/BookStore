import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import EmptyPageWidget from "../components/EmptyPageWidget";
import Icon from "react-native-vector-icons/Ionicons";
import * as NavigationHelper from "../navigation/NavigationHelper";
import * as screenNames from "../Constants/ScreenNames";

const OrderPlaced = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon
          style={styles.icon}
          name="close"
          color={"#6200EE"}
          size={40}
          onPress={() => NavigationHelper.back(navigation)}
        ></Icon>
      </View>
      <View style={styles.emptyWidgetContainer}>
        <EmptyPageWidget
          iconName="checkmark"
          titleText="Order Placed!"
          subTitleText="Your order was placed successfully."
          buttonText="MY ORDERS"
          navigation={navigation}
          screenName={screenNames.ORDERS}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
  },
  emptyWidgetContainer: {
    flex: 6,
  },
  container: {
    flex: 1,
    margin: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  icon: {
    alignSelf: "flex-end",
  },
});

export default OrderPlaced;
