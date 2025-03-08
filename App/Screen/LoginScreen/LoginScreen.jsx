import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../Utils/FirebaseConfig"; // Import the Firebase auth instance
import Colors from "./../../Utils/Colors";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 

const db = getFirestore(); // Initialize Firestore

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  // Handle Sign-In
  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed In:", userCredential.user);
    } catch (error) {
      console.error("Sign In Error:", error.message);
    }
  };

  // Handle Sign-Up
  const handleSignUp = async () => {
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User Signed Up:", user);

      // Add a new document to the "users" collection
      await addDoc(collection(db, "users"), {
        email: user.email,           // User's email
        createdAt: new Date().toISOString(), // Timestamp for user creation
        uid: user.uid,               // User's unique ID
      });

      console.log("User data saved to Firestore");
    } catch (error) {
      console.error("Sign Up Error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./../../../assets/images/logo1.png")}
        style={styles.logoImage}
      />
      <Image
        source={require("./../../../assets/images/ev-car-charging.png")}
        style={styles.bgImage}
      />

      <View>
        <Text style={styles.heading}>
          Your Ultimate EV Charging Station Finder
        </Text>
        <Text style={styles.desc}>
          Find EV charging stations near you, plan your trip, and much more
        </Text>

        {/* Input Fields */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        {/* Toggle Between Sign-In and Sign-Up */}
        <TouchableOpacity
          onPress={isSignUp ? handleSignUp : handleSignIn}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsSignUp(!isSignUp)}
          style={styles.link}
        >
          <Text style={styles.linkText}>
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  logoImage: {
    width: 200,
    height: 50,
    resizeMode: "contain",
  },
  bgImage: {
    height: 200,
    width: "100%",
    marginTop: 20,
    resizeMode: "cover",
  },
  heading: {
    fontSize: 25,
    fontFamily: "outfit-bold",
    textAlign: "center",
    marginTop: 30,
  },
  desc: {
    fontSize: 15,
    fontFamily: "outfit",
    textAlign: "center",
    marginTop: 10,
    color: Colors.GRAY,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    padding: 12,
    borderRadius: 5,
    marginVertical: 10,
    width: 300,
    fontFamily: "outfit",
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "outfit",
    color: Colors.WHITE,
    fontSize: 15,
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: Colors.PRIMARY,
    fontFamily: "outfit",
    textAlign: "center",
  },
});
