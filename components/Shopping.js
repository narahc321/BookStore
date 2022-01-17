import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  View,
  Dimensions,
} from 'react-native';

const shoppingData = [
  {
    img: '0001_fashion_image.jpg',
    title: 'V Neck Shirt - Green',
    price: 24.99,
  },
  {
    img: '0002_fashion_image.jpg',
    title: 'V Neck Polo Shirt',
    price: 24.99,
  },
  {
    img: '0003_fashion_image.jpg',
    title: 'V Neck Shirt - Maroon',
    price: 24.99,
  },
  {
    img: '0004_fashion_image.jpg',
    title: 'V Neck Shirt - Lime',
    price: 24.99,
  },
  {
    img: '0005_fashion_image.jpg',
    title: 'V Neck Shirt - Pink',
    price: 24.99,
  },
  {
    img: '0006_fashion_image.jpg',
    title: 'V Neck Shirt - Blue',
    price: 24.99,
  },
  {
    img: '0007_fashion_image.jpg',
    title: 'V Neck Shirt - Green',
    price: 24.99,
  },
  {
    img: '0008_fashion_image.jpg',
    title: 'V Neck Shirt - White',
    price: 24.99,
  },
  {
    img: '0009_fashion_image.jpg',
    title: 'Round Neck - Pink',
    price: 24.99,
  },
  {
    img: '0010_fashion_image.jpg',
    title: 'Round Neck - Green',
    price: 24.99,
  },
  {
    img: '0011_fashion_image.jpg',
    title: 'Round Neck - Orange',
    price: 24.99,
  },
  {
    img: '0012_fashion_image.jpg',
    title: 'Round Neck - Green',
    price: 24.99,
  },
  {
    img: '0013_fashion_image.jpg',
    title: 'Round Neck - Red',
    price: 24.99,
  },
  {
    img: '0014_fashion_image.jpg',
    title: 'Round Neck - grey',
    price: 24.99,
  },
  {
    img: '0015_fashion_image.jpg',
    title: 'Round Neck - Yellow',
    price: 24.99,
  },
  {
    img: '0016_fashion_image.jpg',
    title: 'Round Neck Stripes',
    price: 24.99,
  },
];

const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

const ProductCard = props => {
  const imgUri = 'https://training.pyther.com/fashion-images/' + props.item.img;
  const dyStyle = {
    width: (Dimensions.get('screen').width / (isPortrait() ? 2 : 3)) * 0.6,
  };

  return (
    <View style={[styles.cardStyle]}>
      <Image style={[styles.imgStyle, dyStyle]} source={{uri: imgUri}} />
      <View style={styles.textContainer}>
        <Text>{props.item.title}</Text>
        <Text>${props.item.price}</Text>
      </View>
    </View>
  );
};

const Shopping = () => {
  const dimensionChangeHandler = () => {
    setNumOfCols(isPortrait() ? 2 : 3);
  };

  const [numOfCols, setNumOfCols] = useState(isPortrait() ? 2 : 3);

  useEffect(() => {
    var event = Dimensions.addEventListener('change', dimensionChangeHandler);
    return () => {
      event.remove();
    };
  }, [dimensionChangeHandler]);

  return (
    <View style={styles.viewStyle}>
      <FlatList
        columnWrapperStyle={{
          justifyContent: 'space-around',
        }}
        contentContainerStyle={[styles.listContainerStyle]}
        data={shoppingData}
        horizontal={false}
        renderItem={({item}) => <ProductCard item={item} />}
        keyExtractor={item => item.img}
        key={numOfCols}
        numColumns={numOfCols}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainerStyle: {
    justifyContent: 'space-around',
  },
  cardStyle: {
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    marginVertical: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
  },
  imgStyle: {
    margin: 25,
    flex: 1,
    aspectRatio: 0.66,
    resizeMode: 'contain',
  },
  viewStyle: {
    flex: 1,
    backgroundColor: '#ECECEC',
  },
});

export default Shopping;
