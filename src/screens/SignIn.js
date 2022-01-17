import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from "react-native";
import * as NavigationHelper from "../navigation/NavigationHelper";
import * as ScreenNames from "../Constants/ScreenNames";
import * as Constants from "../Constants/ScreenNames";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-simple-toast";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

const SignIn = ({ navigation, route }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [isSignIn, setIsSignIn] = useState(
    route.params.screenType === Constants.SIGN_IN
  );

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

  const onSignUp = () => {
    if (!validateEmail(email)) {
      Toast.show("please enter valid Email Id or click on Forgot password");
      return;
    }
    if (password.length < 5) {
      Toast.show(
        "password should be atleast 5 characters or click on Forgot password"
      );
      return;
    }

    if (email === "ADMIN@gmail.com" && password === "ADMIN") {
      NavigationHelper.replaceScreenWith(navigation, ScreenNames.APP_HOME);
    } else {
      Toast.show("Wrong Email or Password, Please click on Forgot password");
    }
  };

  const forgotPassword = () => {
    setEmail("ADMIN@gmail.com");
    setPassword("ADMIN");
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.containerView}>
          <View style={[styles.rowStyle, { marginBottom: portrait ? 70 : 10 }]}>
            <TouchableOpacity
              onPress={() => {
                setIsSignIn((prev) => !prev);
              }}
            >
              <Text
                style={
                  isSignIn ? styles.selectedButton : styles.unselectedButton
                }
              >
                SIGN IN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsSignIn((prev) => !prev);
              }}
            >
              <Text
                style={
                  isSignIn ? styles.unselectedButton : styles.selectedButton
                }
              >
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={[
              styles.formInput,
              { borderBottomColor: emailFocus ? "black" : "#D3D3D3" },
            ]}
            placeholderTextColor={"#DCDADE"}
            placeholder="Email"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <View
            style={[
              styles.formInput,
              { borderBottomColor: passwordFocus ? "black" : "#D3D3D3" },
            ]}
          >
            <View style={[styles.passwordField]}>
              <TextInput
                keyboardType="default"
                style={[styles.passwordInput]}
                secureTextEntry={!passwordVisibility}
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                placeholderTextColor={"#DCDADE"}
                value={password}
              />
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                  setPasswordVisibility((prev) => !prev);
                }}
              >
                <Ionicons
                  name={passwordVisibility ? "eye-outline" : "eye-off-outline"}
                  color={"black"}
                  size={16}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={onSignUp} style={styles.continueView}>
            <Text style={styles.continueButton}>CONTINUE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={forgotPassword} style={styles.forgotView}>
            <Text style={styles.forgotButton}>FORGOT PASSWORD</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  selectedButton: {
    backgroundColor: "#6200EE",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    fontFamily: "Montserrat-Medium",
  },
  unselectedButton: {
    backgroundColor: "white",
    color: "#9599B3",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    fontFamily: "Montserrat-Medium",
  },
  continueButton: {
    backgroundColor: "#6200EE",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    fontFamily: "Montserrat-Medium",
    textAlign: "center",
  },
  forgotButton: {
    backgroundColor: "white",
    color: "#6200EE",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    fontFamily: "Montserrat-Medium",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerView: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
    alignItems: "center",
  },
  termsField: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  welcomePageText: {
    color: "#233975",
    fontFamily: "Montserrat-Bold",
    fontSize: 38,
  },
  passwordField: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Montserrat-Medium",
    width: "100%",
    alignItems: "center",
  },
  formFieldName: {
    fontFamily: "Montserrat-Medium",
    paddingVertical: 5,
  },
  rowStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    color: "blue",
    marginBottom: 70,
  },
  formInput: {
    textAlign: "left",
    color: "black",
    backgroundColor: "white",
    borderColor: "grey",
    color: "black",
    width: "90%",
    borderWidth: 1,
    minWidth: 200,
    borderRadius: 0,
    borderColor: "white",
    borderBottomColor: "#D3D3D3",
    fontFamily: "Montserrat-Medium",
    marginBottom: 10,
    justifyContent: "center",
  },
  passwordInput: {
    flex: 1,
    fontFamily: "Montserrat-Medium",
    color: "black",
  },
  continueView: {
    margin: 40,
    width: "90%",
  },
});

export default SignIn;
