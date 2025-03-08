import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen  from '../Screen/HomeScreen/HomeScreen';
import ProfileScreen from '../Screen/ProfileScreen/ProfileScreen'; 
import FavoriteScreen from '../Screen/FavoriteScreen/FavoriteScreen';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const Tab = createBottomTabNavigator() ;
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false, 
    }}>
         <Tab.Screen name='home'
            component={HomeScreen}
            options={{
                tabBarLabel: 'Search', 
                tabBarIcon:({color,size})=>{
                    return <FontAwesome5 name="search" size={20} color={color} />
                }

            }}
         />
         <Tab.Screen name='favorite'
            component={FavoriteScreen}
            options={{
                tabBarLabel: 'Favorite', 
                tabBarIcon:({color,size})=>{
                    return <FontAwesome5 name="heart" size={20} color={color} />
                }

            }}
         />
         <Tab.Screen name='profile'
            component={ProfileScreen}
            options={{
                tabBarLabel: 'Profile', 
                tabBarIcon:({color,size})=>{
                    return <FontAwesome5 name="user-circle" size={20} color={color} />
                }

            }}
         />
         
    </Tab.Navigator>
  )
}