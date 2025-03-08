import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { app } from '../../Utils/FirebaseConfig';
import { useAuth } from '../../Context/AuthContext'; // To access the authenticated user
import { getAuth } from 'firebase/auth'; // Firebase authentication

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null); // Store user data fetched from Firestore
  const [loading, setLoading] = useState(true); // Track loading state
  const [editing, setEditing] = useState(false); // Toggle edit mode
  const [newName, setNewName] = useState(''); // Store new name if editing
  const { user } = useAuth(); // Get the current user from AuthContext
  const db = getFirestore(app); // Initialize Firestore
  const auth = getAuth(app); // Firebase authentication

  // Fetch user data when user is available
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const userRef = doc(db, 'users', user.uid); // Reference to user's Firestore document
          const docSnap = await getDoc(userRef); // Fetch user document

          if (docSnap.exists()) {
            setUserData(docSnap.data()); // Set user data if document exists
          } else {
            // If user doesn't exist, create a new user document
            const defaultData = {
              uid: user.uid,
              name: user.displayName || 'Unnamed', // Use displayName if available
              email: user.email,
              profilePic: user.photoURL || 'https://via.placeholder.com/100', // Use placeholder if no profile pic
            };
            await setDoc(userRef, defaultData); // Save default user data in Firestore
            setUserData(defaultData); // Set default data locally
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false); // Stop loading
        }
      };
      fetchUserData();
    } else {
      setLoading(false); // Stop loading if no user is logged in
    }
  }, [user]);

  // Handle saving updated name to Firestore
  const handleSave = async () => {
    try {
      const userRef = doc(db, 'users', user.uid); // Reference to user's Firestore document
      await setDoc(userRef, { name: newName }, { merge: true }); // Update the user's name in Firestore (merge to avoid overwriting other fields)
      setUserData((prevData) => ({ ...prevData, name: newName })); // Update local state with new name
      setEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>No user data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image
        source={{ uri: userData.profilePic || 'https://via.placeholder.com/100' }} // Use placeholder if no profile pic
        style={styles.profilePic}
      />

      {/* Name */}
      {editing ? (
        <TextInput
          style={styles.input}
          value={newName}
          onChangeText={setNewName} // Update new name on text change
          placeholder="Enter new name"
        />
      ) : (
        <Text style={styles.name}>{userData.name}</Text>
      )}

      {/* Email */}
      <Text style={styles.email}>{userData.email}</Text>

      {/* Edit Profile Button or Save Changes Button */}
      {editing ? (
        <Button title="Save Changes" onPress={handleSave} />
      ) : (
        <Button title="Edit Profile" onPress={() => setEditing(true)} />
      )}

      {/* Logout Button */}
      <Button title="Log Out" onPress={() => console.log('Log Out')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    width: '80%',
    borderRadius: 5,
  },
});
