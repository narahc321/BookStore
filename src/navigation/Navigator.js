/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import * as ScreenNames from "../Constants/ScreenNames";

import { LogBox } from "react-native";
import Welcome from "../screens/Welcome";
import BookDetails from "../screens/BookDetails";
import Home from "../screens/Home";
import SignIn from "../screens/SignIn";
import Profile from "../screens/Profile";
import Cart from "../screens/Cart";
import Orders from "../screens/Orders";
import Product from "../screens/Product";
import Search from "../screens/Search";
import OrderPlaced from "../screens/OrderPlaced";
import CustomDrawer from "../components/CustomDrawer"
import * as Header from "../components/Header";

LogBox.ignoreLogs(["Reanimated 2"]);

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerScreens = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: "left",
        headerStyle: {
          backgroundColor: "#6200EE",
        },
        headerTitle: (props) => <Header.Title {...props} />,
        headerRight: () => <Header.Right />,
        headerLeft: () => <Header.Left />,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name={ScreenNames.HOME} component={Home} />
      <Drawer.Screen name={ScreenNames.PROFILE} component={Profile} />
      <Drawer.Screen name={ScreenNames.BOOK_DETAILS} component={BookDetails} />
      <Drawer.Screen name={ScreenNames.CART} component={Cart} />
      <Drawer.Screen name={ScreenNames.ORDERS} component={Orders} />
    </Drawer.Navigator>
  );
};

const StackScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ScreenNames.WELCOME} component={Welcome} />
      <Stack.Screen name={ScreenNames.SIGN_IN} component={SignIn} />
      <Stack.Screen name={ScreenNames.APP_HOME} component={DrawerScreens} />
      <Stack.Screen name={ScreenNames.SEARCH} component={Search} />
      <Stack.Screen name={ScreenNames.PRODUCT} component={Product} />
      <Stack.Screen name={ScreenNames.ORDER_PACED} component={OrderPlaced} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreens />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  rowStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    color: "blue",
  },
  topButtons: {
    color: "blue",
    fontSize: 18,
  },
  loginInput: {
    textAlign: "left",
    backgroundColor: "white",
    borderColor: "grey",
    borderWidth: 1,
    minWidth: 200,
    marginBottom: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 40,
  },
  formInput: {
    textAlign: "left",
    backgroundColor: "white",
    borderColor: "grey",
    borderWidth: 1,
    minWidth: 200,
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 40,
  },
  screenStyles: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  headerStyle: {
    marginTop: 10,
    fontSize: 20,
    marginLeft: 10,
    color: "grey",
  },
});

export default Navigator;
