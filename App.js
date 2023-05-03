import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Menu from "./pages/Menu"
import Recipy from "./pages/Recipy";
import RecipyMaker from './pages/RecipyMaker';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Menu'>
        <Stack.Screen name="Menu" component={Menu}/>
        <Stack.Screen name="Recipy" component={Recipy}/>
        <Stack.Screen name="RecipyMaker" component={RecipyMaker}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
