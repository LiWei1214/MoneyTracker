import React from "react";
import { View, Text, Image, Button, TouchableOpacity } from 'react-native'
import styles from "../stylesheets/ProfileStyles"
import { TouchableHighlight } from "react-native-gesture-handler";

export default function User(){
    return (
        <View style={styles.UserContainer}>
            <View style={styles.IconContainer}>
                <View style={styles.UserIcon}>
                    <TouchableHighlight style={[styles.profileImgContainer, { borderColor: 'green', borderWidth:2 }]}>
                        <Image source={require("../assets/ikun.jpg")} style={styles.profileImg}/>
                    </TouchableHighlight>
                </View>
                <View style={styles.UploadButton}>
                    <TouchableHighlight onPress={() => null}>
                        <Text style={{color: "blue"}}>
                            Upload
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
            <View style={styles.UserInfo}>
                <TouchableOpacity style={styles.UserDetailButton}>
                    <Text>
                        Email
                    </Text>
                    <Text>
                        user@gmail.com
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.UserDetailButton}>
                    <Text>
                        Username
                    </Text>
                    <Text>
                        Ikun
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.UserDetailButton}>
                    <Text>
                        Display Name
                    </Text>
                    <Text>
                        Ikun
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.UserDetailButton}>
                    <Text>
                        Gender
                    </Text>
                    <Text>
                        Hidden
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.UserDetailButton}>
                    <Text>
                        Phone Number
                    </Text>
                    <Text>
                        Not set
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.ProfileFooter}>
                <Button title="Sign Out"/>
                <Button title="Delete Account"/>
            </View>
        </View>
    )
}