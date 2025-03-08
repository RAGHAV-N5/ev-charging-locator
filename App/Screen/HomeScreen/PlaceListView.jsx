import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useRef } from 'react';
import PlaceItem from './PlaceItem';
import { SelectMarkerContext } from '../../Context/SelectMarkerContext';
import { getFirestore } from 'firebase/firestore';
import { app } from '../../Utils/FirebaseConfig';

export default function PlaceListView({ placeList }) {
  const flatListRef = useRef(null);

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  const getItemLayout = (_, index) => ({
    length: 100,  // Adjust the item height (you can customize this)
    offset: 100 * index,  // Adjust the offset to the item's height
    index,
  });
  
  const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);

  useEffect(() => {
    selectedMarker && scrollToIndex(selectedMarker);
  }, [selectedMarker]);

  if (placeList.length === 0) {
    return (
      <View>
        <Text>No places available</Text>
      </View>
    );
  }

  const db = getFirestore(app);

  return (
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
  <FlatList
    data={placeList}
    horizontal
    showsHorizontalScrollIndicator={false}
    pagingEnabled
    getItemLayout={getItemLayout}
    ref={flatListRef}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => <PlaceItem place={item} />}
  />
</View>
  );
}

const styles = StyleSheet.create({
  flatList: {
    height: 400,  // Set a fixed height (you can adjust this value)
  },
});
