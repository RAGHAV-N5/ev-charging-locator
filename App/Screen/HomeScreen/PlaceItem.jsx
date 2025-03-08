import { View, Text, Image, Pressable, ToastAndroid, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../../Utils/Colors';
import GlobalApi from '../../Utils/GlobalApi';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore } from 'firebase/firestore';
import { app } from '../../Utils/FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export default function PlaceItem({ place }) {
  const PLACE_PHOTO_BASE_URL = 'https://maps.googleapis.com/maps/api/place/photo';

  let photoUrl = null;

  if (place.photos && place.photos.length > 0) {
    const photoReference = place.photos[0].photo_reference;
    const photoWidth = 400; // Adjust width as needed
    photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${photoWidth}&photoreference=${photoReference}&key=${GlobalApi.API_KEY}`;
    console.log(photoUrl); // Log the URL for debugging
  }

  const db = getFirestore(app);
  const onSetFav = async (place) => {
    try {
      await setDoc(doc(db, 'ev-fav-place', place.place_id.toString()), {
        place,
      });
      ToastAndroid.show('Fav Added!', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error adding document:', error);
      ToastAndroid.show('Error adding to favorites', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.favButton} onPress={() => onSetFav(place)}>
        <Ionicons name="heart-outline" size={24} color="black" />
      </Pressable>
      <Image
        source={
          photoUrl
            ? { uri: photoUrl }
            : require('./../../../assets/images/ev-car-charging.png') // Fallback image
        }
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.placeName}>{place.name}</Text>
        <Text style={styles.placeVicinity}>{place.vicinity}</Text>

        <View style={styles.ratingContainer}>
          <View style={styles.ratingBox}>
            <Text style={styles.ratingLabel}>Rating:</Text>
            <Text style={styles.ratingValue}>{place.rating}</Text>
          </View>
          <View style={styles.locationIconContainer}>
            <FontAwesome name="location-arrow" size={20} color="white" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    margin: 10,
    elevation: 3, // Adding shadow effect for elevation
  },
  favButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  infoContainer: {
    padding: 15,
  },
  placeName: {
    fontSize: 18,
    fontFamily: 'outfit-medium',
    marginBottom: 5,
  },
  placeVicinity: {
    color: Colors.GRAY,
    fontFamily: 'outfit',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GRAY, // background for the rating box
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ratingLabel: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: Colors.DARK_GRAY,
  },
  ratingValue: {
    fontFamily: 'outfit',
    fontSize: 16,
    marginLeft: 5,
    color: Colors.BLACK,
  },
  locationIconContainer: {
    padding: 12,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 6,
    paddingHorizontal: 14,
  },
});
