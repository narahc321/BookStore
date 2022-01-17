import React, { useEffect, useState } from "react";
// import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as NavigationHelper from "../navigation/NavigationHelper";
import * as ScreenNames from "../Constants/ScreenNames";
import { useIsFocused } from "@react-navigation/native";
import BookStore from "../assets/img/BookStore.jpg";

const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

const Welcome = ({ navigation, route }) => {
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

  return (
    <View
      style={[styles.container, { flexDirection: portrait ? "column" : "row" }]}
    >
      <Image
        style={[styles.imgStyle, { width: portrait ? "100%" : "50%" }]}
        source={require("../assets/img/BookStore.jpg")}
      />
      <View style={styles.completeTextContainer}>
        <View style={styles.welcomeTextView}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.welcomeText}>To</Text>
          <Text style={styles.welcomeText}>To Book Store</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonsView}>
            <View style={styles.buttonEmpty} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                NavigationHelper.replaceScreenWith(
                  navigation,
                  ScreenNames.SIGN_IN,
                  {
                    [ScreenNames.SCREEN_TYPE]: ScreenNames.SIGN_IN,
                  }
                );
              }}
            >
              <Text style={styles.buttonText}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsView}>
            <View style={styles.buttonEmpty} />
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                NavigationHelper.replaceScreenWith(
                  navigation,
                  ScreenNames.SIGN_IN,
                  {
                    [ScreenNames.SCREEN_TYPE]: ScreenNames.SIGN_UP,
                  }
                );
              }}
            >
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgStyle: {
    resizeMode: "stretch",
    margin: 0,
  },
  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    flex: 2,
    alignItems: "center",
    backgroundColor: "#9599B3",
    paddingVertical: 30,
  },
  button2: {
    flex: 2,
    alignItems: "center",
    backgroundColor: "#6200EE",
    paddingVertical: 30,
  },
  buttonText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
    color: "white",
  },
  buttonEmpty: {
    flex: 1,
    alignItems: "flex-end",
    backgroundColor: "white",
  },
  welcomeTextView: {
    alignItems: "center",
    marginVertical: 40,
    justifyContent: "center",
  },
  welcomeText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 26,
    color: "#6200EE",
    marginBottom: 5,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  flex_one: {
    flex: 1,
  },
  flex_two: { flex: 2 },
  completeTextContainer: {
    flex: 2,
    justifyContent: "space-between",
  },
});

export default Welcome;
