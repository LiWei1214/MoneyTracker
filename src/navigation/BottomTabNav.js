import React from "react";
import { View, Text, Stylesheet } from 'react-native';
import { Home, Transaction, Balance, Settings } from '../Screens';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Entypo from "react-native-vector-icons/Entypo";

const Tab = createMaterialTopTabNavigator();
const screenOptions = {
  tabBarPosition: "bottom",
  headerShown: false,
  tabBarStyle:{
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 70,
    background: "#090a27",
  },
  tabBarLabelStyle:{
    fontSize: 12, color: "black"
  }
}

const BottomTabNav = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Entypo name="home" size={24} color={focused ? "#004080" : "#7e8987"} />
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Record"
                component={Transaction}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Entypo name="archive" size={24} color={focused ? "#004080" : "#7e8987"} />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Balance"
                component={Balance}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Entypo name="credit-card" size={24} color={focused ? "#004080" : "#7e8987"} />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Entypo name="cog" size={24} color={focused ? "#004080" : "#7e8987"} />
                            </View>
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNav;