import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  useRoute,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as NavigationHelper from "../navigation/NavigationHelper";
import * as ScreenNames from "../Constants/ScreenNames";
import { useNavigation } from "@react-navigation/native";

const DrawerItem = (props) => {
  const navigation = useNavigation();
  var itemColor = "#9599B3";
  if (props.currentScreen === props.screenName) {
    itemColor = "#6200EE";
  }
  return (
    <TouchableOpacity
      style={[styles.itemContainer]}
      onPress={() => {
        NavigationHelper.navigate(navigation, props.screenName);
      }}
    >
      <Icon name={props.iconName} size={25} color={itemColor}></Icon>
      <Text style={[styles.itemText, { color: itemColor }]}>
        {props.screenName}
      </Text>
    </TouchableOpacity>
  );
};

const ProfileItem = () => {
  return (
    <TouchableOpacity style={styles.profileContainer} onPress={() => {}}>
      <View style={styles.infoContainer}>
        <Image
          style={styles.imgStyle}
          source={{ uri: "https://training.pyther.com/books/jane-profile.jpg" }}
        />
        <Text style={styles.profileName}>JANE DOE</Text>
      </View>
      <Text style={styles.editItemText}>Edit Profile</Text>
    </TouchableOpacity>
  );
};

const LogoutItem = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        NavigationHelper.logout(navigation);
      }}
    >
      <Text style={styles.itemText}>LOG OUT</Text>
    </TouchableOpacity>
  );
};

const CustomDrawer = (props) => {
  const route = useRoute();
  const currentScreen = getFocusedRouteNameFromRoute(route);
  return (
    <DrawerContentScrollView {...props}>
      <ProfileItem screenName={ScreenNames.PROFILE} />
      <DrawerItem
        iconName="home"
        screenName={ScreenNames.HOME}
        currentScreen={currentScreen}
      />
      <DrawerItem
        iconName="book"
        screenName={ScreenNames.BOOK_DETAILS}
        currentScreen={currentScreen}
      />
      <DrawerItem
        iconName="shopping-cart"
        screenName={ScreenNames.CART}
        currentScreen={currentScreen}
      />
      <DrawerItem
        iconName="shopping-bag"
        screenName={ScreenNames.ORDERS}
        currentScreen={currentScreen}
      />
      <LogoutItem />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#9599B3",
    paddingBottom: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 10,
  },
  editItemText: {
    flex: 1,
    marginHorizontal: 30,
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    color: "black",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 10,
    borderColor: "#9599B3",
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 20,
  },
  profileName: {
    marginHorizontal: 30,
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    color: "grey",
  },
  itemText: {
    marginHorizontal: 30,
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    color: "#9599B3",
  },
  imgStyle: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});

export default CustomDrawer;
