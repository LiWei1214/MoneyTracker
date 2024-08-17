import React from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native'
import BgSVG from "../assets/stacked-waves-haikei.svg";
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg';
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "../stylesheets/HomeStyles";

export default function Home(){
    return (
        <SafeAreaView>
            <View>
                <View style={styles.BgContainer}>
                    <BgSVG width={"100%"} height={"100%"} />
                </View>
                <View style={styles.UserGreeting}>
                    <Text style={{ color: "white", fontSize: 24 }}>
                        Welcome Back, User
                    </Text>
                </View>
                <View style={styles.FloatyBox}>
                    <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
                        <Defs>
                            <LinearGradient id="grad" x1="0%" y1="0%" x2="80%" y2="120%">
                                <Stop offset="0" stopColor={"#5651ad"} />
                                <Stop offset="1" stopColor={"#1e1978"} />
                            </LinearGradient>
                        </Defs>
                        <Rect width="100%" height="100%" fill="url(#grad)" overflow="hidden" rx={10}/>
                    </Svg>
                    <View style={{height: "30%"}}>
                        <Text style={{ marginLeft: "7%", marginTop: "5%", fontSize: 20, color: "white" }}>Balance</Text>
                    </View>
                    <View style={{height: "50%"}}>
                        <Text style={{ marginLeft: "7%", fontSize: 28, color: "white" }}>RM 1000.00</Text>
                    </View>
                    <View style={{height: "20%", display: "flex", flexDirection: "row"}}>
                        <View style={{width: "80%"}}>
                            <Text style={{ marginLeft: "9%", fontSize: 20, color: "white" }}>
                                **** **** **** ****
                            </Text>
                        </View>
                        <View style={{width: "20%", marginLeft: "3%"}}>
                            <FontAwesome name="credit-card" size={24} color="white" />
                        </View>
                    </View>
                </View>
                <View style={styles.TransactionContainer}>
                    <View style={styles.TransactionContent}>
                        <Text style={{ color: "black", position: "absolute", marginLeft: "2%", marginTop: "5%", fontSize: 24 }}>
                            Transaction
                        </Text>
                        <View style={{display: "flex", flexDirection: "row", gap: 100, marginTop: "5%"}}>
                            <Text style={{marginTop: "13%", marginLeft: "5%", }}>
                                1 August - 30 August  ↓
                            </Text>
                            <Text style={{marginTop: "13%", marginLeft: "5%"}}>
                                2024  ↓
                            </Text>
                        </View>
                        <View style={{display: "flex", flexDirection: "row", marginLeft: "5%", marginTop: "5%", alignItems: "center"}}>
                            <Text style={{width: "20%"}}>
                                Icon
                            </Text>
                            <View style={{width: "50%"}}>
                                <Text style={{color: "black", fontSize: 20}}>
                                    Eat
                                </Text>
                                <Text style={{color: "black"}}>
                                    sleep
                                </Text>
                            </View>
                            <Text style={{fontSize: 15, color: "black"}}>
                                - RM 50.00
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}