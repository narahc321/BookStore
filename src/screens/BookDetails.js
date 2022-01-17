import React from "react";
import { StyleSheet, FlatList, Text, View, Dimensions } from "react-native";
import { fetchBooks } from "../network/NetworkManager";
import { useEffect, useState, useContext } from "react";
import ProductCardRow from "../components/ProductCardRow";
import { useIsFocused } from "@react-navigation/native";
import { UserContext } from "../database/UserContext";

const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

const BookDetails = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  const { books } = useContext(UserContext);
  const [booksList, setBooksList] = useState(books);

  const dimensionChangeHandler = () => {
    setNumOfCols(isPortrait() ? 2 : 3);
  };

  const [numOfCols, setNumOfCols] = useState(isPortrait() ? 2 : 3);

  useEffect(() => {
    var event = Dimensions.addEventListener("change", dimensionChangeHandler);
    return () => {
      event.remove();
    };
  }, [dimensionChangeHandler]);

  useEffect(() => {
    setBooksList(books);
  }, [isFocused]);

  return (
    <View style={styles.viewStyle}>
      <FlatList
        contentContainerStyle={[styles.listContainerStyle]}
        data={booksList}
        horizontal={false}
        renderItem={({ item }) => <ProductCardRow item={item} />}
        keyExtractor={(item) => item.id}
        key={numOfCols}
        numColumns={1}
      />
    </View>
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

export default BookDetails;
