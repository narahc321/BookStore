import Welcome from "../screens/Welcome";
import SignIn from "../screens/SignIn";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import BookDetails from "../screens/BookDetails";
import Cart from "../screens/Cart";
import Orders from "../screens/Orders";
import * as ScreenConstants from "../Constants/ScreenNames";
import { StackActions, CommonActions } from "@react-navigation/native";

const ScreensMap = new Map();
ScreensMap.set(ScreenConstants.WELCOME, Welcome);
ScreensMap.set(ScreenConstants.HOME, Home);
ScreensMap.set(ScreenConstants.SIGN_IN, SignIn);
ScreensMap.set(ScreenConstants.PROFILE, Profile);
ScreensMap.set(ScreenConstants.CART, Cart);
ScreensMap.set(ScreenConstants.ORDERS, Orders);
ScreensMap.set(ScreenConstants.BOOK_DETAILS, BookDetails);

export const replaceScreenWith = (navigation, screenName, params) => {
  navigation.dispatch(StackActions.replace(screenName, params));
};

export const push = (navigation, screenName, params = {}) => {
  navigation.push(screenName, params);
};

export const navigate = (navigation, screenName, params = {}) => {
  navigation.navigate(screenName, params);
};

export const back = (navigation) => {
  navigation.goBack();
};

export const getActiveRouteName = (route) => {
  if (route.state) {
    return getActiveRouteName(route.state.routes[route.state.index]);
  }
  return route.name;
};

export const logout = (navigation) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{ name: ScreenConstants.WELCOME }],
    })
  );
};
