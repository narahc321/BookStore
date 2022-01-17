import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Dimensions,
  TextInput,
} from "react-native";
import { fetchBooks } from "../network/NetworkManager";
import { useEffect, useState, useContext } from "react";
import ProductCardRow from "../components/ProductCardRow";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import * as NavigationHelper from "../navigation/NavigationHelper";
import EmptyPageWidget from "../components/EmptyPageWidget";
import { UserContext } from "../database/UserContext";

const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

const ResultWidget = (props) => {
  const [numOfCols, setNumOfCols] = useState(isPortrait() ? 2 : 3);

  if (props.booksList && props.booksList.length === 0) {
    return (
      <EmptyPageWidget
        iconName="search"
        titleText="Start Typing!!"
        subTitleText="Type product/author/publisher name"
      />
    );
  }
  return (
    <View style={styles.viewStyle}>
      <FlatList
        contentContainerStyle={[styles.listContainerStyle]}
        data={props.booksList}
        horizontal={false}
        renderItem={({ item }) => <ProductCardRow item={item} />}
        keyExtractor={(item) => item.id}
        key={numOfCols}
        numColumns={1}
      />
    </View>
  );
};

const Search = ({ navigation, route }) => {
  const { books } = useContext(UserContext);
  const booksList = books;
  const [searchResultList, setSearchResultList] = useState([]);
  const [stringFocus, setStringFocus] = useState(false);
  const [searchString, setSearchString] = useState("");

  const isFocused = useIsFocused();

  useEffect(() => {
    setSearch("");
  }, [isFocused]);

  const setSearch = (text) => {
    if (text.length === 0) {
      setSearchResultList([]);
    } else {
      setSearchResultList(
        booksList.filter(
          (book) =>
            book.author.includes(text) ||
            book.title.includes(text) ||
            book.publisher.includes(text)
        )
      );
    }

    setSearchString(text);
  };

  const dimensionChangeHandler = () => {
    setNumOfCols(isPortrait() ? 2 : 3);
  };

  useEffect(() => {
    var event = Dimensions.addEventListener("change", dimensionChangeHandler);
    return () => {
      event.remove();
    };
  }, [dimensionChangeHandler]);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon
          style={styles.icon}
          name="arrow-back"
          color={"#6200EE"}
          size={40}
          onPress={() => NavigationHelper.back(navigation)}
        ></Icon>
        <TextInput
          style={[
            styles.formInput,
            { borderBottomColor: stringFocus ? "black" : "#D3D3D3" },
          ]}
          placeholderTextColor={"#DCDADE"}
          placeholder="Search here....."
          onFocus={() => setStringFocus(true)}
          onBlur={() => setStringFocus(false)}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <View style={styles.emptyWidgetContainer}>
        <ResultWidget booksList={searchResultList} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formInput: {
    textAlign: "left",
    color: "grey",
    width: "90%",
    borderBottomWidth: 1,
    minWidth: 200,
    borderRadius: 0,
    borderBottomColor: "#D3D3D3",
    fontFamily: "Montserrat-Medium",
    marginBottom: 10,
    padding: 0,
    fontSize: 18,
    justifyContent: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyWidgetContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  icon: {
    alignSelf: "flex-start",
  },
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
    marginBottom: 10,
  },
  imgStyle: {
    margin: 25,
    flex: 1,
    resizeMode: "contain",
  },
  viewStyle: {
    flex: 1,
    backgroundColor: "#EEE9E9",
  },
});

export default Search;
