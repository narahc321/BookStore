import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as NavigationHelper from "../navigation/NavigationHelper";
import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/Ionicons";

const ButtonView = (props) => {
  if (props.buttonText) {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          NavigationHelper.navigate(props.navigation, props.screenName);
        }}
      >
        <Text style={styles.buttonText}>{props.buttonText}</Text>
        <View style={styles.buttonIconView}>
          <Icon
            style={styles.buttonIccon}
            name="arrow-forward"
            color={"#6200EE"}
            size={20}
          ></Icon>
        </View>
      </TouchableOpacity>
    );
  }
  return <View />;
};

const EmptyPageWidget = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainerContainer}>
        <View style={styles.iconContainer}>
          <Icon
            style={styles.icon}
            name={props.iconName}
            color={"#6200EE"}
            size={75}
          ></Icon>
        </View>
      </View>
      <View style={styles.textContainerView}>
        <Text style={styles.titleTextStyle}>{props.titleText}</Text>
        <Text style={styles.subTitleTextStyle}>{props.subTitleText}</Text>
      </View>
      <View style={styles.buttonContainerView}>
        <ButtonView
          buttonText={props.buttonText}
          navigation={props.navigation}
          screenName={props.screenName}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontFamily: "Montserrat-Medium",
  },
  buttonIconView: {
    backgroundColor: "white",
    borderRadius: 100,
    marginLeft: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6200EE",
    padding: 10,
    borderRadius: 25,
  },
  titleTextStyle: {
    fontSize: 30,
    fontFamily: "Montserrat-Medium",
    color: "grey",
  },
  subTitleTextStyle: {
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    color: "grey",
  },
  container: {
    margin: 20,
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
    flexDirection: "column",
  },
  buttonContainerView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  textContainerView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  icon: {
    borderColor: "#6200EE",
    flex: 1,
  },
  iconContainerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconContainer: {
    backgroundColor: "white",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: 125,
    aspectRatio: 1,
    padding: 20,
  },
});

export default EmptyPageWidget;
