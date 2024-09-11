import React from "react";
import { View, Text, Button } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";

export default function DataPrivacy(){
    return (
        <View style={{flex: 1, alignItems: "center"}}>
            <View style={{marginHorizontal: "5%", marginVertical:"5%"}}>
                <Button title="Delete All Data" color={"red"}/>
                <Text style={{marginTop: "5%", fontSize: 16}}>
                    This will delete all the data that is stored on your local device.
                </Text>
                <Text style={{marginTop: "2%"}}>
                    The data includes:
                </Text>
                <Text style={{color: "#7d0800"}}>
                    Transaction records
                </Text>
            </View>
        </View>
    )
}