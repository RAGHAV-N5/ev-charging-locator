import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
// import { useUser } from '@clerk/clerk-expo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image } from 'react-native';
export default function Header() {
  // const user = useUser() ;  
  return (
    <View style={styles.headerContainer}>
      {/* <Image source={{uri:user?.imageUrl}}
      style={{width:45, height:45, borderRadius:99} }/> */}
      <Image source={require('./../../../assets/images/logo1.png')}
      style={{width:100, height:40}}/>
      <FontAwesome name="filter" size={24} color="black" />
    </View>
  )
}   

const styles = StyleSheet.create({
    headerContainer: {
      marginTop:0,
      display:'flex', 
      flexDirection:'row', 
      justifyContent: 'space-between', 
      alignItems:'center', 
      backgroundColor:'#ffffff87'
    }
})