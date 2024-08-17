import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import './gesture-handler'
import { createStackNavigator } from "@react-navigation/stack";
import  BottomTabNav from "./src/navigation/BottomTabNav";
import { User, Appearance, DataPrivacy, Notification, Help } from "./src/Screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomTabNav">
        <Stack.Screen name="BottomTabNav" component={BottomTabNav} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={User} options={{tabBarButtom: () => null}}/>
        <Stack.Screen name="Appearance" component={Appearance} options={{tabBarButtom: () => null}}/>
        <Stack.Screen name="Data" component={DataPrivacy} options={{tabBarButtom: () => null}}/>
        <Stack.Screen name="Notification" component={Notification} options={{tabBarButtom: () => null}}/>
        <Stack.Screen name="Help" component={Help} options={{tabBarButtom: () => null}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}