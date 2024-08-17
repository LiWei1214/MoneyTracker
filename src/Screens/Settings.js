import React from "react";
import { View, Text, TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import styles from "../stylesheets/SettingStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { User, Appearance, DataPrivacy, Notification, Help } from "../Screens";
import { createStackNavigator } from "@react-navigation/stack";

export default function Settings({ navigation }){
    const Stack = createStackNavigator();

    const navigateToEditAccount = () => {
        navigation.navigate("Profile")
    };

    const navigateToEditAppearance = () => {
        navigation.navigate("Appearance")
    };

    const navigateToDataPrivacy = () => {
        navigation.navigate("Data")
    };

    const navigateToEditNotification = () => {
        navigation.navigate("Notification")
    };

    const navigateToHelp = () => {
        navigation.navigate("Help")
    };

    const settingItems = [
        {icon: "person-outline", text: "Account", action: navigateToEditAccount},
        {icon: "invert-colors", text: "Appearance", action: navigateToEditAppearance},
        {icon: "folder-open", text: "Data Privacy", action: navigateToDataPrivacy},
        {icon: "notifications-none", text: "Notifications", action: navigateToEditNotification},
        {icon: "help-outline", text: "Help", action: navigateToHelp}
    ];

    const renderSettingsItem = ({ icon, text, action}) => (
        <TouchableOpacity 
        onPress={action}
        style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 5}}
        >
            <MaterialIcons name={icon} size= {40} color="black"/>
            <Text style={{marginLeft: "5%", fontSize: 18, color: "#292929"}}>{text}</Text>
        </TouchableOpacity>
    );
    
    return (
        <View style={styles.SettingsContainer}>
            <View style={styles.titleContainer}>
                <Text style={{fontSize: 24, color: "black"}}>
                    Settings
                </Text>
            </View>
            <View style={styles.UserContainer}>
                <View style={styles.UserIcon}>
                    <TouchableHighlight style={[styles.profileImgContainer, { borderColor: 'green', borderWidth:2 }]}>
                        <Image source={require("../assets/ikun.jpg")} style={styles.profileImg}/>
                    </TouchableHighlight>
                </View>
                <View style={styles.UserInfo}>
                    <Text style={{fontSize: 26, color: "black"}}>
                        Ikun
                    </Text>
                    <Text style={{fontSize: 18, color: "black"}}>
                        Ji Ni Tai Mei
                    </Text>
                </View>
            </View>
            <View style={styles.SettingOptionsContainer}>
                {settingItems.map((item, index) => (
                    <React.Fragment key={index}>
                        {renderSettingsItem(item)}
                    </React.Fragment>
                ))}
            </View>
        </View>
    )
}