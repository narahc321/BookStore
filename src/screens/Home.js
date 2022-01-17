import React from "react";
import { StyleSheet, FlatList, Text, View, Dimensions } from "react-native";
import { useEffect, useState, useContext } from "react";
import ProductCardCol from "../components/ProductCardCol";
import { UserContext } from "../database/UserContext";

const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

const Home = ({ navigation, route }) => {
  const { books } = useContext(UserContext);

  const [booksList] = useState(books);

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

  return (
    <View style={styles.viewStyle}>
      <FlatList
        columnWrapperStyle={{
          justifyContent: "space-around",
        }}
        contentContainerStyle={[styles.listContainerStyle]}
        data={booksList}
        horizontal={false}
        renderItem={({ item }) => <ProductCardCol item={item} />}
        keyExtractor={(item) => item.id}
        key={numOfCols}
        numColumns={numOfCols}
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

export default Home;
