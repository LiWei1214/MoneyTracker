import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, TouchableOpacity, Modal } from 'react-native'
import styles from "../stylesheets/ProfileStyles"
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import io, { connect, Socket } from "socket.io-client";
import { Picker } from "@react-native-picker/picker";


var accountSocket = io('http://10.0.2.2:5000/account_details', {
    transports: ['websocket'],
  });

export default function User({navigation}){

    const [displayNameModalVisible, setDisplayNameModalVisible] = useState(false);
    const [genderModalVisible, setGenderModalVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('Not Set')

    const genderArray = [
        "Male",
        "Female"
    ]

    useEffect(() => {
        accountSocket.emit('client_get_account_info', emailG)

        accountSocket.on('server_send', data => {
          let result = JSON.parse(data);
          setUsername(result.username)
          setEmail(result.email)
        });
    
        return () => {
          accountSocket.off('server_send');
        };
      }, []);

    userDisplayName = displayName;

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
                        {email}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.UserDetailButton}>
                    <Text>
                        Username
                    </Text>
                    <Text>
                        {username}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.UserDetailButton} onPress={() => setDisplayNameModalVisible(true)}>
                    <Text>
                        Display Name
                    </Text>
                    <Text>
                        {userDisplayName}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.UserDetailButton} onPress={() => setGenderModalVisible(true)}>
                    <Text>
                        Gender
                    </Text>
                    <Text>
                        {gender}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.UserDetailButton}>
                    <Text>
                        Phone Number
                    </Text>
                    <Text>
                        {phone}
                    </Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={displayNameModalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.optionsModalContent}>
                        <Text style={{alignSelf: 'flex-start', marginBottom: "10%", fontSize: 16, fontWeight: "bold"}}>
                            Display Name
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Change your display name"
                            value={displayName}
                            onChangeText={setDisplayName}
                        />
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={() => {
                                setDisplayNameModalVisible(false);}
                            }
                        >
                            <Text style={styles.optionText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={genderModalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.optionsModalContent}>
                        <Text>
                            Select Gender
                        </Text>
                        <Picker
                            selectedValue={gender}
                            onValueChange={(itemValue) => setGender(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Gender" value="" />
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                            <Picker.Item label="Other" value="other" />
                        </Picker>   
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={() => {
                                setGenderModalVisible(false);}
                            }
                        >
                            <Text style={styles.optionText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.ProfileFooter}>
                <Button title="Sign Out" onPress={() => navigation.navigate("LoginSignUp")}/>
                <Button title="Delete Account" onPress={() => navigation.navigate("LoginSignUp")}/>
            </View>
        </View>
    )
}