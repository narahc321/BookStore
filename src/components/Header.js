import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as NavigationHelper from "../navigation/NavigationHelper";
import * as ScreenNames from "../Constants/ScreenNames";

export const Title = (props) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{props.children}</Text>
    </View>
  );
};

export const Left = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.hamContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Icon
          style={styles.icon}
          name="md-menu-sharp"
          color={"white"}
          size={30}
        ></Icon>
      </TouchableOpacity>
    </View>
  );
};

export const Right = () => {
  const navigation = useNavigation();

  const searchOnPressHandler = () => {
    NavigationHelper.push(navigation, ScreenNames.SEARCH, {});
  };

  return (
    <View style={styles.iconsContainer}>
      <TouchableOpacity
        onPress={() =>
          NavigationHelper.navigate(navigation, ScreenNames.ORDERS)
        }
      >
        <Icon style={styles.icon} name="notifications" size={25}></Icon>
      </TouchableOpacity>
      <Icon style={styles.icon} name="share-social" size={25}></Icon>
      <TouchableOpacity onPress={searchOnPressHandler}>
        <Icon style={styles.icon} name="search" size={25}></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  hamContainer: {
    marginLeft: 20,
  },
  titleText: {
    fontFamily: "Montserrat-Bold",
    color: "white",
    fontSize: 20,
  },
  iconsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  titleContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  icon: {
    paddingRight: 15,
    color: "#EEE9E9",
  },
});
