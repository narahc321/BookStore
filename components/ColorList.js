import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const colorsAvailable = [
  'pink',
  'orange',
  'lightskyblue',
  'lightgreen',
  'lightgrey',
  'black',
];
const ColorOption = props => {
  const width = 50;
  const height = width;
  const borderRadius = Dimensions.get('window').width / 2;
  const colorStyle = {
    backgroundColor: props.colorName,
    width,
    height,
    border: 10,
    borderRadius,
  };

  return <View style={colorStyle}></View>;
};

const ColorSelector = props => {
  return (
    <View style={[styles.colorSelector]}>
      <Text style={[styles.textStyle]}>ADD ROW</Text>
      <View style={[styles.colorOptions]}>
        {colorsAvailable.map((color, index) => (
          <TouchableOpacity
            onPress={() => {
              props.onColorSelected(color);
            }}
            key={index}>
            <ColorOption style={[styles.flexOne]} colorName={color} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const ColorCell = props => {
  const width_proportion = '20%';
  const height_proportion = '40%';
  const barColor = {
    backgroundColor: props.item.color,
  };
  return (
    <View style={[styles.colorCell]}>
      <View style={[styles.barStyle, barColor]} />
      <TouchableOpacity
        onPress={() => props.onDeleteCell(props.item.key)}
        style={[styles.deleteButton]}
      />
    </View>
  );
};

const ColorList = () => {
  const [colorsList, setColorsList] = useState([]);
  const addColorHandler = colorName => {
    setColorsList(prevColorsList => {
      return [
        ...prevColorsList,
        {key: Math.random().toString(), color: colorName},
      ];
    });
  };

  const deleteCellHandler = cellKey => {
    setColorsList(prevColorsList => {
      return prevColorsList.filter(item => item.key !== cellKey);
    });
  };

  return (
    <SafeAreaView style={[styles.flexOne]}>
      <Text style={[styles.headerStyle]}>Color List</Text>
      <FlatList
        contentContainerStyle={[styles.listContainerStyle]}
        data={colorsList}
        renderItem={({item}) => (
          <ColorCell item={item} onDeleteCell={deleteCellHandler} />
        )}
        keyExtractor={item => item.key}
      />
      <ColorSelector onColorSelected={addColorHandler} />
    </SafeAreaView>
  );
};

export default ColorList;

const styles = StyleSheet.create({
  barStyle: {
    height: 25,
    borderRadius: 5,
    alignSelf: 'flex-start',
    flex: 1,
  },
  deleteButton: {
    height: 25,
    width: '5%',
    backgroundColor: 'red',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  colorCell: {
    marginVertical: 10,
    overflow: 'hidden',
    flexWrap: 'wrap',
    width: '100%',
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  listContainerStyle: {
    alignItems: 'flex-start',
    margin: 10,
    flexDirection: 'column',
  },
  headerStyle: {
    marginTop: 10,
    fontSize: 20,
    marginLeft: 10,
    color: 'grey',
  },
  textStyle: {
    flex: 1,
    fontSize: 20,
    marginLeft: 10,
    color: 'grey',
  },
  flexOne: {
    flex: 1,
  },
  colorOptions: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-around',
  },
  colorSelector: {
    backgroundColor: 'white',
    flexDirection: 'column',
    height: 100,
    alignContent: 'space-around',
  },
});
