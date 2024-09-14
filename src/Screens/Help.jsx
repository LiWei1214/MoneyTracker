import React from "react";
import { View, Text, Button } from 'react-native'

export default function Help(){
    return (
        <View style={{flex: 1}}>
            <View style={{marginTop: "5%", marginHorizontal: "5%"}}>
                <Text>
                    If there is issue found, please contact with the number below.
                </Text>
                <Text style={{alignSelf: "center", padding: "2%", margin: "2%", borderWidth: 1, borderRadius: 5, fontSize: 24}}>
                    012-3456789
                </Text>
            </View>
            <View style={{marginTop: "5%", marginHorizontal: "5%"}}>
                <Text>
                    You may choose to report issues using the button below.
                </Text>
                <View style={{ width: 100, alignSelf: "center"}}>
                    <Button title="Report"/>
                </View>
            </View>
        </View>
    )
}