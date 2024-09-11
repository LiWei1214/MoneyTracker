import React, {useState} from "react";
import { View, Text } from 'react-native'
import { Switch } from "react-native-gesture-handler";

export default function Notification(){
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={{flex: 1}}>
            <View style={{display: "flex", flexDirection: "row", justifyContent:"space-between", marginHorizontal: "5%", marginVertical: "5%"}}>
                <Text style={{fontSize: 16}}>
                    Pop-up Notifications
                </Text>
                <Switch
                 trackColor={{false: '#767577', true: '#81b0ff'}}
                 thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                 ios_backgroundColor="#3e3e3e"
                 onValueChange={toggleSwitch}
                 value={isEnabled}
                />
            </View>
        </View>
    )
}